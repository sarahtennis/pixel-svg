<template>
  <div
    class="square"
    @click="onClick()"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="square-color" :style="getStyle()">
      <div
        class="square-hover"
        :style="getSquareHoverStyle()"
        v-if="isHovered"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: [
    "selectedColor",
    "color",
    "colIndex",
    "rowIndex",
    "updateColorAtIndex",
  ],
  data: function () {
    return {
      isHovered: false,
    };
  },
  methods: {
    onClick: function () {
      this.updateColorAtIndex(this.rowIndex, this.colIndex);
    },
    onMouseEnter() {
      this.isHovered = true;
    },
    onMouseLeave() {
      this.isHovered = false;
    },
    getSquareHoverStyle() {
      if (!this.selectedColor) return;
      const { r, g, b, a } = this.selectedColor.rgba;
      return {
        background: `rgba(${r}, ${g}, ${b}, ${a})`
      };
    },
    getStyle: function () {
      if (!this.color || this.isHovered) return;
      const { r, g, b, a } = this.color.rgba;
      return {
        background: `rgba(${r}, ${g}, ${b}, ${a})`,
      };
    },
  },
};
</script>

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
  position: relative;
}

.square-hover {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 2;
}
</style>
