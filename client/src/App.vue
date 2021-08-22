<template>
  <div id="app">
    <div class="content-container">
      <div class="drawing-container">
        <div class="drawing-actions">
          <color-picker :color="color"></color-picker>
          <button @click="color = ''">Erase</button>
        </div>
        <pixel-grid :dimensions="dimensions" :grid="grid" :color="color" />
      </div>
      <div class="preview-container">
        <textarea v-model="svg"></textarea>
        <button class="generate-svg-btn" @click="generateSvgPaths()">
          Generate SVG
        </button>
        <div class="preview" ref="preview"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./components/ColorPicker.vue";
import PixelGrid from "./components/PixelGrid.vue";
import EventBus from "./event-bus";

export default {
  name: "App",
  components: {
    ColorPicker,
    PixelGrid,
  },
  data: function () {
    return {
      dimensions: {
        x: 10,
        y: 10,
      },
      color: "#ffff00",
      grid: [],
      svg: "",
    };
  },
  mounted: function () {
    EventBus.$on("squareClicked", (position) => {
      this.$set(this.grid[position.x], position.y, this.color);
    });
    EventBus.$on("colorChanged", (color) => {
      this.$set(this, "color", color);
    });
    this.$set(this, "grid", this.initGrid());
  },
  methods: {
    initGrid: function () {
      const output = [];
      for (let x = 0; x < this.dimensions.x; x++) {
        const row = [];
        for (let y = 0; y < this.dimensions.y; y++) {
          row.push("");
        }
        output.push(row);
      }
      return output;
    },
    // DEPRECATED
    generateSvg: function () {
      const opening = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" style="display: block;" width="${
        this.grid.length * 10
      }" height="${this.grid[0].length * 10}" viewBox="0 0 ${
        this.grid.length * 10 + " " + this.grid[0].length * 10
      }">`;
      let middle = "";
      const closing = "</svg>";

      let rowIndex = 0;
      while (rowIndex < this.grid.length) {
        for (let x = 0; x < this.grid[rowIndex].length; x++) {
          middle += `<rect y="${rowIndex * 10}" x="${x * 10}" fill="${
            this.grid[rowIndex][x]
          }" width="10" height="10" />`;
        }
        rowIndex++;
      }
      this.svg = opening + middle + closing;
    },
    generateSvgPaths: function () {
      const opening = `<svg xmlns="http://www.w3.org/2000/svg" width="${
        this.grid.length * 10
      }" height="${this.grid[0].length * 10}" viewBox="0 0 ${
        this.grid.length * 10 + " " + this.grid[0].length * 10
      }">`;
      const closing = "</svg>";
      const uniqueColors = {};
      this.grid.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
          const position = { x: rowIndex, y: squareIndex };
          if (!uniqueColors[square]) {
            uniqueColors[square] = [position];
          } else {
            uniqueColors[square].push(position);
          }
        });
      });
      let outputPaths = "";
      Object.keys(uniqueColors).forEach((colorKey) => {
        if (!colorKey) {
          return;
        }
        const positions = uniqueColors[colorKey];
        let singlePath = `<path fill="${colorKey}" d="`;
        positions.forEach((position) => {
          const squarePath = `M ${position.y * 10} ${
            position.x * 10
          } h 10 v 10 h -10 L ${position.y * 10} ${position.x * 10} `;
          singlePath += squarePath;
        });
        singlePath += '"/>';
        outputPaths += singlePath;
      });
      this.svg = opening + outputPaths + closing;
      this.$refs.preview.innerHTML = this.svg;
    },
  },
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
#app {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .content-container {
    display: flex;

    .drawing-container {
      .drawing-actions {
        height: 50px;
        display: flex;
      }
    }

    .preview-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;
      margin-top: 50px;
      margin-left: 10px;

      textarea {
        min-height: 200px;
      }

      .generate-svg-btn {
        height: 50px;
      }

      .preview {
        background: #c0c0c0;

        svg {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
