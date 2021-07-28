<template>
  <div class="pixel-grid" :style="getGridStyle()">
    <pixel-grid-row v-for="(row, index) in grid" :rowIndex="index" :key="row + Math.random()" :row="row"></pixel-grid-row>
  </div>
</template>

<script>
import PixelGridRow from './PixelGridRow.vue';

export default {
  name: "PixelGrid",
  components :{
    PixelGridRow
  },
  props: ['grid'],
  methods: {
    getGridStyle: function() {
      return {
        'grid-template-columns': 'auto',
        'grid-template-rows': 'auto auto auto'
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
