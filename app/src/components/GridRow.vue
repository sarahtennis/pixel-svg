<template>
  <div class="grid-row">
    <square v-for="(square, index) in row" :key="rowKey + 'c' + index"></square>
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  name: "GridRow",
  components: {
    Square,
  },
  props: ["row", "rowKey"],
};
</script>

<style lang="scss">
.grid-row {
  display: flex;
}
</style>