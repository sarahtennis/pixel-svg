<template>
  <div id="app">
    <div class="left-panel">
      <grid :color="color"></grid>
    </div>
    <div class="right-panel" :style="{ width: widthOfPanel }">
      <div class="right-panel-resize-area" ref="splitter"></div>
      <color-picker
        :color="color"
        :onColorChange="onColorChange"
      ></color-picker>
    </div>
  </div>
</template>

<script>
import { fromEvent } from "rxjs";
import { mergeMap, map, takeUntil } from "rxjs/operators";

import ColorPicker from "./components/ColorPicker.vue";
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  data: function () {
    return {
      color: { r: 25, g: 77, b: 51, a: 1 },
      widthOfPanel: "240px",
    };
  },
  components: {
    Grid,
    ColorPicker,
  },
  mounted() {
    const splitter = this.$refs.splitter;
    const $splitterMousedown = fromEvent(splitter, "mousedown");
    const $documentMousemove = fromEvent(document, "mousemove");
    const $documentMouseup = fromEvent(document, "mouseup");
    const $splitterDrag = $splitterMousedown.pipe(
      mergeMap((mousedownEvent) =>
        $documentMousemove.pipe(
          map((mousemoveEvent) => {
            return { mousedownEvent, mousemoveEvent };
          }),
          takeUntil($documentMouseup)
        )
      )
    );
    $splitterDrag.subscribe(({ mousedownEvent, mousemoveEvent }) => {
      this.widthOfPanel = window.innerWidth - mousemoveEvent.clientX + "px";
    });
  },
  methods: {
    onColorChange(e) {
      this.color = e;
    },
  },
};
</script>

<style lang="scss">
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel {
  width: 100%;
}

.right-panel {
  position: relative;
  display: flex;
  height: 100%;
  max-width: 500px;
  min-width: 240px;
  background: green;
  flex-shrink: 0;

  .right-panel-resize-area {
    height: 100%;
    width: 2px;
    position: absolute;
    left: -2px;
    top: 0;
    background: magenta;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;

    &:hover {
      cursor: ew-resize;
    }
  }
}
</style>
