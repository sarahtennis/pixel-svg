<template>
  <div id="app" :style="{ 'user-select': isDragging ? 'none' : '' }">
    <div class="left-panel">
      <grid
        :grid="grid"
        :color="color"
        :updateColorAtIndex="updateColorAtIndex"
      ></grid>
    </div>
    <div class="right-panel" :style="{ width: widthOfPanel }">
      <div class="right-panel-resize-area" ref="splitter">
        <div class="right-panel-resize-bar"></div>
      </div>
      <div class="logo"><img src="./assets/logo.svg" alt="PixelSVG" /></div>
      <color-picker
        :color="color"
        :onColorChange="onColorChange"
      ></color-picker>
      <dimension-setter :dimensions="dimensions" :updateGridDimensionsAndRerender="updateGridDimensionsAndRerender"></dimension-setter>
      <div class="generate btn btn-main" @click="() => generateOpacitySvgPaths()">
        Generate
      </div>
      <textarea v-model="svg" disabled></textarea>
      <div class="svg-preview" ref="preview" @click="onClickSvgPreview"></div>
      <div class="svg-preview-modal-backdrop" v-if="showSvgPreviewModal" @click="showSvgPreviewModal = false">
        <div class="svg-preview-modal" @click="e => e.stopPropagation()">
          <div class="svg-preview-modal-header">
            <div class="svg-preview-modal-header-title">SVG preview</div>
            <div class="svg-preview-modal-header-close" @click="showSvgPreviewModal = false">x</div>
          </div>
          <div class="svg-preview-modal-preview" ref="modal-preview" v-html="svg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent } from "rxjs";
import { mergeMap, map, takeUntil, pluck } from "rxjs/operators";

import ColorPicker from "./components/ColorPicker.vue";
import Grid from "./components/Grid.vue";
import DimensionSetter from './components/DimensionSetter.vue';

export default {
  name: "App",
  data: function () {
    return {
      svg: "",
      showSvgPreviewModal: false,
      dimensions: {
        rows: 5,
        columns: 10,
      },
      grid: [],
      color: {
        rgba: {
          r: 255,
          g: 0,
          b: 255,
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
    DimensionSetter
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
    onClickSvgPreview() {
      if (!this.svg) return;
      this.showSvgPreviewModal = true;
    },
    updateGridDimensionsAndRerender(newDimensionsObject) {
      console.log(newDimensionsObject);
      this.dimensions = newDimensionsObject;
      this.rerenderGrid();
    },
    rerenderGrid() {
      const grid = new Array(this.dimensions.rows).fill(
        new Array(this.dimensions.columns).fill(null)
      );
      this.grid = grid;
    },
    updateColorAtIndex: function (row, col) {
      const newGrid = JSON.parse(JSON.stringify(this.grid));
      newGrid[row][col] = this.color;
      this.grid = newGrid;
    },
    onColorChange(e) {
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
      if (!this.dimensions || !this.dimensions.columns || !this.dimensions.rows) return '';

      const tallerThanWide = this.dimensions.columns < this.dimensions.rows;

      const opening = `<svg class="${tallerThanWide ? 'max-height' : 'max-width'}" xmlns="http://www.w3.org/2000/svg" width="${
        this.dimensions.columns
      }" height="${this.dimensions.rows}" viewBox="0 0 ${
        this.dimensions.columns + " " + this.dimensions.rows
      }">`;

      return opening;
    },
    getSvgClosing() {
      return '</svg>';
    },
    getColors() {
      if (!this.grid || !this.grid.length || !this.grid[0].length) return {
        uniqueColors: null,
        keyToColor: null
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
        keyToColor
      };
    },
    generateOpacitySvgPaths() {
      const {uniqueColors, keyToColor} = this.getColors();
      if (!uniqueColors || !keyToColor) return '';

      let outputPaths = "";
      Object.keys(uniqueColors).forEach((colorKey) => {
        if (!colorKey) return;
        const positions = uniqueColors[colorKey];
        let singlePath = `<path fill="${this.getOpacityFillString(keyToColor[colorKey])}"
                                fill-opacity="${this.getOpacityFillOpacityString(keyToColor[colorKey])}"
                                d="`;
        positions.forEach((position) => {
          const squarePath = `M ${position.y} ${
            position.x
          } h 1 v 1 h -1 L ${position.y} ${position.x} `;
          singlePath += squarePath;
        });
        singlePath += '"/>';
        outputPaths += singlePath;
      });

      this.svg = this.getSvgOpening() + outputPaths + this.getSvgClosing();
      this.$refs.preview.innerHTML = this.svg;
    },
    generateSvgPaths: function () {
      const {uniqueColors, keyToColor} = this.getColors();
      if (!uniqueColors || !keyToColor) return '';

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
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel {
  width: 100%;
  overflow: scroll;
}

.right-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 240px;
  min-width: 240px;
  background: green;
  flex-shrink: 0;

  .right-panel-resize-area {
    padding: 0 2px;
    position: absolute;
    z-index: 2;
    left: -2px;
    top: 0;

    &:hover {
      cursor: ew-resize;
    }

    .right-panel-resize-bar {
      height: 100vh;
      width: 2px;
      background: magenta;
    }
  }

  .logo {
    img {
      margin-left: 5px;
      margin-top: 5px;
      height: 50px;
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
    width: 90%;
    height: 100%;
    -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);

    .svg-preview-modal-header {
      height: 50px;
      background: #694369;
      display: flex;
      flex-shrink: 0;
      justify-content: space-between;
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
