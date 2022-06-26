<template>
  <div class="color-picker" ref="picker">
    <sketch :value="color" @input="onColorChange" :preset-colors="[]" />
  </div>
</template>

<script>
import { fromEvent } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { Sketch } from "vue-color";

export default {
  name: "ColorPicker",
  components: {
    Sketch,
  },
  props: ["color", "onColorChange"],
  methods: {},
  mounted() {
    // this.$refs.picker;
    // const dialog = this.$refs.picker;
    // const dialogHeader = this.$refs.header;
    // const $dialogMousedown = fromEvent(dialogHeader, "mousedown");
    // const $documentMousemove = fromEvent(document, "mousemove");
    // const $documentMouseup = fromEvent(document, "mouseup");
    // const $dialogDrag = $dialogMousedown.pipe(
    //   mergeMap((mousedownEvent) =>
    //     $documentMousemove.pipe(
    //       map((mousemoveEvent) => {
    //         return { mousedownEvent, mousemoveEvent };
    //       }),
    //       takeUntil($documentMouseup)
    //     )
    //   )
    // );
    // $dialogDrag.subscribe(({ mousedownEvent, mousemoveEvent }) => {
    //   const top = Math.min(
    //     Math.max(0, mousemoveEvent.clientY - mousedownEvent.offsetY),
    //     window.innerHeight - dialog.clientHeight
    //   );
    //   const left = Math.min(
    //     Math.max(0, mousemoveEvent.clientX - mousedownEvent.offsetX),
    //     window.innerWidth - dialog.clientWidth
    //   );
    //   dialog.style.top = top + "px";
    //   dialog.style.left = left + "px";
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.color-picker {
  .vc-sketch {
    border-radius: 0;
    box-shadow: none;
    width: calc(100% - 20px);

    .vc-sketch-field input,
    .vc-sketch-field span {
      font-size: 14px !important;
    }

    .vc-sketch-presets {
      margin: 0;
      padding: 0;
      border: none;
    }
  }
}
</style>
