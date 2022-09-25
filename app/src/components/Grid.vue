<template>
  <div class="grid" :style="getGridStyle()" :class="{ 'cursor-eraser': !this.color }">
    <grid-row
      v-for="(row, index) in grid"
      :selectedColor="color"
      :key="'r' + index"
      :row="row"
      :rowKey="index"
      :updateColorAtIndex="updateColorAtIndex"
    ></grid-row>
  </div>
</template>

<script>
import GridRow from "./GridRow.vue";

export default {
  name: "Grid",
  components: {
    GridRow,
  },
  props: ["color", "grid", "updateColorAtIndex"],

  mounted() {},
  methods: {
    getGridStyle: function () {
      const gridTemplateRows = new Array(this.grid.length)
        .fill("auto")
        .join(" ");
      return {
        "grid-template-columns": "auto",
        "grid-template-rows": gridTemplateRows
      };
    },
  },
};
</script>

<style lang="scss">
.grid {
  background: black;
  display: inline-grid;
  border-top: none;
  grid-row-gap: 1px;
  border: 1px solid black;
  margin: 20px;
  cursor: url('../assets/pencil.svg') 0 24, default;

  &.cursor-eraser {
    cursor: url('../assets/eraser.svg') 0 24, default;
  }
}
</style>