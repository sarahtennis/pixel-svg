<template>
  <div class="grid">
    <grid-row
      v-for="(row, index) in grid"
      :key="'r' + index"
      :row="row"
      :rowKey="'r' + index"
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
  data: function () {
    return {
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
  },
};
</script>

<style>
</style>