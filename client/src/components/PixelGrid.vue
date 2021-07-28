<template>
  <div class="pixel-grid" :style="getGridStyle()">
    <pixel-grid-row v-for="(row, index) in grid" :color="color" :rowIndex="index" :key="row + Math.random()" :row="row"></pixel-grid-row>
  </div>
</template>

<script>
import PixelGridRow from './PixelGridRow.vue';

export default {
  name: "PixelGrid",
  components :{
    PixelGridRow
  },
  props: ['dimensions', 'grid', 'color'],
  methods: {
    getGridStyle: function() {
      const gridTemplateRows = new Array(this.dimensions.x).fill('auto').join(' ');
      return {
        'grid-template-columns': 'auto',
        'grid-template-rows': gridTemplateRows
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel-grid {
  background: black;
  display: inline-grid;
  border-top: none;
  grid-row-gap: 1px;
  border: 1px solid black;
}
</style>
