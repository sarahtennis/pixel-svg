<template>
  <div class="pixel-grid-row" :style="getStyles()">
    <pixel-grid-square v-for="(square, index) in row" :color="color" :position="getPosition(index)" :square="square" :key="square + Math.random()"></pixel-grid-square>
  </div>
</template>

<script>
import PixelGridSquare from './PixelGridSquare.vue';
export default {
  components: { PixelGridSquare },
  name: "PixelGridRow",
  props: ['row', 'rowIndex', 'color'],
  methods: {
    getPosition(yIndex) {
      return {
        x: this.rowIndex,
        y: yIndex
      }
    },
    getStyles() {
      const gridTemplateColumns = new Array(this.columnCount).fill('auto').join(' ');

      return {
        'grid-template-columns': gridTemplateColumns
      }
    }
  },
  computed: {
    columnCount: function() {
      return this.row.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel-grid-row {
  display: grid;
  grid-template-rows: auto;
  grid-column-gap: 1px;
}
</style>
