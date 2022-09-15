<template>
  <div class="panel design-panel">
    <div class="panel-header">Design</div>
    <div class="panel-content">
      <color-picker
        :color="color"
        :onColorChange="onColorChange"
        :updateGridDimensionsAndRerender="updateGridDimensionsAndRerender"
      ></color-picker>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker.vue";

export default {
  name: "DesignPanel",
  components: {
    ColorPicker,
  },
  props: ["color", "onColorChange", 'updateGridDimensionsAndRerender'],
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.color-picker {
  .vc-sketch {
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    padding: 0;

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
