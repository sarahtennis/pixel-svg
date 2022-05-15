<template>
  <div class="grid" :style="getGridStyle()">
    <grid-row
      v-for="(row, index) in grid"
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
  props: ["color"],
  data: function () {
    return {
      grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };
  },
  mounted() {},
  methods: {
    updateColorAtIndex: function (row, col) {
      this.$set(this.grid[row], col, this.color.rgba);
    },
    getGridStyle: function () {
      const gridTemplateRows = new Array(this.grid.length)
        .fill("auto")
        .join(" ");
      return {
        "grid-template-columns": "auto",
        "grid-template-rows": gridTemplateRows,
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
}
</style>