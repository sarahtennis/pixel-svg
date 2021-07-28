<template>
  <div id="app">
    <pixel-grid :grid="grid" :color="color"/>
    <button @click="generateSvg()">Generate SVG</button>
    <textarea v-model="svg"></textarea>
  </div>
</template>

<script>
import PixelGrid from './components/PixelGrid.vue';
import EventBus from './event-bus';

export default {
  name: "App",
  components: {
    PixelGrid,
  },
  data: function() {
    return {
      dimensions: {
        x: 10,
        y: 10
      },
      color: '#ffff00',
      grid: [
        ['#ff0000','#ccc','#000'],
        ['#ff0000','#ccc','#000'],
        ['#ff0000','#ccc','#000']
      ],
      svg: ''
    }
  },
  mounted: function() {
    EventBus.$on('squareClicked', (position) => {
      this.$set(this.grid[position.x], position.y, this.color);
    });
  },
  methods: {
    generateSvg: function() {
      const opening = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" style="display: block;" width="${this.grid.length * 10}" height="${this.grid[0].length * 10}" viewBox="0 0 ${(this.grid.length * 10) + ' ' + (this.grid[0].length * 10)}">`;
      let middle = '';
      const closing = '</svg>';
      
      let rowIndex = 0;
      while (rowIndex < this.grid.length) {
        for (let x = 0; x < this.grid[rowIndex].length; x++) {
          middle += `<rect y="${rowIndex * 10}" x="${x * 10}" fill="${this.grid[rowIndex][x]}" width="10" height="10" />`;
        }
        rowIndex ++;
      }
      this.svg = opening + middle + closing;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
