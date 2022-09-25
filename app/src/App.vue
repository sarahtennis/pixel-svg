<template>
  <div id="app" :style="{ 'user-select': isDragging ? 'none' : '' }">
    <div class="logo-header">
      <div class="logo">
        <img src="./assets/logo.svg" alt="PixelSVG" />
      </div>
    </div>
    <div class="main-container">
      <div class="left-panel">
        <grid
          :grid="grid"
          :color="color"
          :updateColorAtIndex="updateColorAtIndex"
        ></grid>
        <panel-selector
          :onUpdatePanel="onUpdatePanel"
          :currentPanel="currentPanel"
        ></panel-selector>
      </div>
      <div class="right-panel" :style="{ width: widthOfPanel }">
        <div class="right-panel-resize-area" ref="splitter"></div>
        <keep-alive>
          <component
            v-if="currentPanel"
            :is="currentPanel"
            :color="color"
            :onColorChange="onColorChange"
            :dimensions="dimensions"
            :updateGridDimensionsAndRerender="updateGridDimensionsAndRerender"
            :onUpdatePanel="onUpdatePanel"
            :onGenerate="onGenerate"
            :svg="svg"
          >
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent } from "rxjs";
import { mergeMap, map, takeUntil, pluck } from "rxjs/operators";

import ColorPicker from "./components/ColorPicker.vue";
import Grid from "./components/Grid.vue";
import DimensionSetter from "./components/DimensionSetter.vue";
import DesignPanel from "./components/DesignPanel.vue";
import GridSettingsPanel from "./components/GridSettingsPanel.vue";
import PanelSelector from "./components/PanelSelector.vue";
import GeneratePanel from "./components/GeneratePanel.vue";

export default {
  name: "App",
  data: function () {
    return {
      svg: "",
      currentPanel: "GridSettingsPanel",
      dimensions: {
        rows: 10,
        columns: 10,
      },
      grid: [],
      color: {
        rgba: {
          r: 255,
          g: 116,
          b: 82,
          a: 1,
        },
      },
      widthOfPanel: "240px",
      isDragging: false,
    };
  },
  components: {
    Grid,
    ColorPicker,
    DimensionSetter,
    DesignPanel,
    GridSettingsPanel,
    PanelSelector,
    GeneratePanel,
  },
  mounted() {
    this.rerenderGrid();
    const splitter = this.$refs.splitter;
    const $splitterMousedown = fromEvent(splitter, "mousedown");
    const $documentMousemove = fromEvent(document, "mousemove");
    const $documentMouseup = fromEvent(document, "mouseup").pipe(
      map((e, index) => {
        this.isDragging = false;
        return e;
      })
    );
    const $splitterDrag = $splitterMousedown.pipe(
      mergeMap((mousedownEvent) => {
        this.isDragging = true;
        return $documentMousemove.pipe(
          map((mousemoveEvent) => {
            return { mousedownEvent, mousemoveEvent };
          }),
          takeUntil($documentMouseup)
        );
      })
    );
    $splitterDrag.subscribe(({ mousedownEvent, mousemoveEvent }) => {
      this.widthOfPanel = window.innerWidth - mousemoveEvent.clientX + "px";
    });
  },
  methods: {
    onUpdatePanel(panelName) {
      if (this.currentPanel === panelName) return;
      this.currentPanel = panelName;
    },
    updateGridDimensionsAndRerender(newDimensionsObject) {
      if (newDimensionsObject) {
        this.dimensions = newDimensionsObject;
      }
      this.rerenderGrid();
    },
    onGenerate() {
      this.generateOpacitySvgPaths();
    },
    rerenderGrid() {
      const grid = new Array(this.dimensions.rows).fill(
        new Array(this.dimensions.columns).fill(null)
      );
      this.grid = grid;
      this.svg = "";
    },
    updateColorAtIndex: function (row, col) {
      const newGrid = JSON.parse(JSON.stringify(this.grid));
      newGrid[row][col] = this.color;
      this.grid = newGrid;
    },
    onColorChange(e) {
      if (!e) this.color = null;
      this.color = e;
    },
    getFillString(color) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    },
    getOpacityFillString(color) {
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    },
    getOpacityFillOpacityString(color) {
      return color.a;
    },
    getSvgOpening() {
      if (!this.dimensions || !this.dimensions.columns || !this.dimensions.rows)
        return "";

      const opening = `<svg xmlns="http://www.w3.org/2000/svg" width="${
        this.dimensions.columns
      }" height="${this.dimensions.rows}" viewBox="0 0 ${
        this.dimensions.columns + " " + this.dimensions.rows
      }">`;

      return opening;
    },
    getSvgClosing() {
      return "</svg>";
    },
    getColors() {
      if (!this.grid || !this.grid.length || !this.grid[0].length)
        return {
          uniqueColors: null,
          keyToColor: null,
        };

      const uniqueColors = {};
      const keyToColor = {};
      this.grid.forEach((row, rowIndex) => {
        row.forEach((squ, squareIndex) => {
          const position = { x: rowIndex, y: squareIndex };
          if (!squ) return;
          const square = squ.rgba;
          const key = `r${square.r}g${square.g}b${square.b}a${square.a}`;
          if (!uniqueColors[key]) {
            uniqueColors[key] = [position];
            keyToColor[key] = square;
          } else {
            uniqueColors[key].push(position);
          }
        });
      });

      return {
        uniqueColors,
        keyToColor,
      };
    },
    generateOpacitySvgPaths() {
      const { uniqueColors, keyToColor } = this.getColors();
      if (!uniqueColors || !keyToColor) return "";

      let outputPaths = "";
      Object.keys(uniqueColors).forEach((colorKey) => {
        if (!colorKey) return;
        const positions = uniqueColors[colorKey];
        let singlePath = `<path fill="${this.getOpacityFillString(
          keyToColor[colorKey]
        )}" fill-opacity="${this.getOpacityFillOpacityString(
          keyToColor[colorKey]
        )}" d="`;
        positions.forEach((position) => {
          const squarePath = `M ${position.y} ${position.x} h 1 v 1 h -1 L ${position.y} ${position.x} `;
          singlePath += squarePath;
        });
        singlePath += '"/>';
        outputPaths += singlePath;
      });

      this.svg = this.getSvgOpening() + outputPaths + this.getSvgClosing();
    },
    generateSvgPaths: function () {
      const { uniqueColors, keyToColor } = this.getColors();
      if (!uniqueColors || !keyToColor) return "";

      let outputPaths = "";
      Object.keys(uniqueColors).forEach((colorKey) => {
        if (!colorKey) {
          return;
        }
        const positions = uniqueColors[colorKey];
        let singlePath = `<path fill="${this.getFillString(
          keyToColor[colorKey]
        )}" d="`;
        positions.forEach((position) => {
          const squarePath = `M ${position.y * 10} ${
            position.x * 10
          } h 10 v 10 h -10 L ${position.y * 10} ${position.x * 10} `;
          singlePath += squarePath;
        });
        singlePath += '"/>';
        outputPaths += singlePath;
      });
      this.svg = this.getSvgOpening() + outputPaths + this.getSvgClosing();
      this.$refs.preview.innerHTML = this.svg;
    },
  },
};
</script>

<style lang="scss">
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  color: #f5f7fa;
  overflow: hidden;
}

.group-label {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  background: #616e7c;
  color: #f5f7fa;
  margin-bottom: 5px;
  padding: 5px 20px;
  border-bottom: 2px solid #1a1a1a;

  &:not(.first) {
    border-top: 2px solid #1a1a1a;
  }
}

.main-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  background: #1f2933;
}

.btn-group {
  display: flex;
  width: 100%;
}

.btn-group-divider {
  height: 100%;
  width: 10px;
  background: transparent;
}

.btn {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border: 2px solid #1a1a1a;
  background: #fff;

  &:not(:disabled):active {
    // box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
    transform: translate(1px, 1px);
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    border: 2px solid lighten(#1a1a1a, 60%);
    color: lighten(#1a1a1a, 60%);
  }
}

.logo-header {
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 50px;
  background: #323f4b;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  .logo {
    height: 100%;

    img {
      height: 100%;
    }
  }
}

.left-panel {
  position: relative;
  width: 100%;
  overflow: scroll;
}

.right-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 500px;
  min-width: 240px;
  background: #323f4b;
  flex-shrink: 0;
  box-shadow: -2px 0 2px -1px rgba(0,0,0,.5);

  .right-panel-resize-area {
    position: absolute;
    left: 0;
    height: 100%;
    width: 0;

    &:hover {
      cursor: ew-resize;
    }

    &:before {
      content: "";
      position: absolute;
      height: 100%;
      width: 6px;
      left: -3px;
      top: 0;
    }
  }

  .svg-preview {
    width: 100%;

    svg {
      width: 100%;
      height: auto;
    }
  }
}

.svg-preview-modal-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px 0;

  .svg-preview-modal {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    overflow: hidden;
    width: 90%;
    height: 100%;
    -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);

    .svg-preview-modal-header {
      height: 50px;
      background: #694369;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 10px;
      flex-shrink: 0;
      justify-content: space-between;

      .svg-preview-modal-header-close {
        color: #fff;

        &:hover {
          color: #c0c0c0;
          cursor: pointer;
        }
      }
    }

    .svg-preview-modal-preview {
      display: flex;
      justify-content: center;
      background: white url("./assets/transparent.svg");
      background-size: 25px 25px;
      background-repeat: cover;
      width: 100%;
      height: 100%;
      padding: 10px;

      svg {
        height: auto;
        width: auto;
      }
    }
  }
}
</style>
