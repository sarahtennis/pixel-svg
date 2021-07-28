<template>
  <div class="pixel-grid-row">
    <pixel-grid-square v-for="(square, index) in row" :position="getPosition(index)" :square="square" :key="square + Math.random()"></pixel-grid-square>
  </div>
</template>

<script>
import PixelGridSquare from './PixelGridSquare.vue';
export default {
  components: { PixelGridSquare },
  name: "PixelGridRow",
  props: ['row', 'rowIndex'],
  methods: {
    getPosition(yIndex) {
      return {
        x: this.rowIndex,
        y: yIndex
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel-grid-row {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 1px;
}
</style>
