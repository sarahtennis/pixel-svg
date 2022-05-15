<template>
  <div class="grid-row" :style="getStyles()">
    <square
      v-for="(square, index) in row"
      :color="square"
      :colIndex="index"
      :rowIndex="rowKey"
      :key="'r' + rowKey + 'c' + index"
      :updateColorAtIndex="updateColorAtIndex"
    ></square>
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  name: "GridRow",
  components: {
    Square,
  },
  mounted() {
    console.log("this", this.row);
  },
  props: ["row", "rowKey", "updateColorAtIndex"],
  methods: {
    getStyles() {
      const gridTemplateColumns = new Array(this.row.length)
        .fill("auto")
        .join(" ");
      return {
        "grid-template-columns": gridTemplateColumns,
      };
    },
  },
};
</script>

<style lang="scss">
.grid-row {
  display: grid;
  grid-template-rows: auto;
  grid-column-gap: 1px;
}
</style>