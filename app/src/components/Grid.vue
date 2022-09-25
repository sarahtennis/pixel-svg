<template>
  <div
    class="grid"
    :style="getGridStyle()"
    :class="{ 'cursor-eraser': !this.color }"
  >
    <grid-row
      v-for="(row, index) in grid"
      :selectedColor="color"
      :key="'r' + index"
      :row="row"
      :rowKey="index"
      :updateColorAtIndex="updateColorAtIndex"
      :isDragging="isDragging"
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
  props: ["color", "grid", "updateColorAtIndex", "shiftGrid", "translateGrid"],
  data: () => {
    return {
      isDragging: false,
    };
  },
  mounted() {
    const onMouseEnter = () => {
      document.addEventListener("wheel", onWheel);
    };

    const onMouseLeave = () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("mousemove", onDrag);
      this.isDragging = false;
    };

    const onMouseDown = (e) => {
      if (e.button === 2) {
        this.isDragging = true;
        document.addEventListener("mousemove", onDrag);
      } else {
        this.isDragging = false;
      }
    };

    const onMouseUp = (e) => {
      this.isDragging = false;
      document.removeEventListener("mousemove", onDrag);
      return false;
    };

    const onDrag = (e) => {
      e.stopPropagation();
      this.translateGrid({
        x: e.movementX,
        y: e.movementY,
      });
    };

    const grid = document.querySelector(".grid");
    if (grid) {
      grid.addEventListener("mouseenter", onMouseEnter);
      grid.addEventListener("mouseleave", onMouseLeave);
      grid.addEventListener("mousedown", onMouseDown);
      grid.addEventListener("mouseup", onMouseUp);
    }

    const onWheel = (e) => {
      if (e.deltaY > 0) {
        this.shiftGrid(true);
      } else if (e.deltaY < 0) {
        this.shiftGrid(false);
      }
    };
  },
  methods: {
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
  position: absolute;
  background: black;
  display: inline-grid;
  border-top: none;
  grid-row-gap: 1px;
  border: 1px solid black;
  margin: 20px;
  cursor: url("../assets/pencil.svg") 0 24, default;

  &.cursor-eraser {
    cursor: url("../assets/eraser.svg") 0 24, default;
  }
}
</style>
