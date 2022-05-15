<template>
  <div class="square" @click="onClick()">
    <div class="square-color" :style="getStyle()"></div>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["color", "colIndex", "rowIndex", "updateColorAtIndex"],
  methods: {
    onClick: function () {
      this.updateColorAtIndex(this.rowIndex, this.colIndex);
    },
    getStyle: function () {
      if (!this.color) return;
      const { r, g, b, a } = this.color;
      return {
        background: `rgba(${r}, ${g}, ${b}, ${a})`,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.square {
  height: 50px;
  width: 50px;
  background: white url("../assets/transparent.svg");
  background-size: 25px 25px;
  border: 1px solid white;
}

.square-color {
  height: 100%;
  width: 100%;
}

.hovered {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 2;
}
</style>
