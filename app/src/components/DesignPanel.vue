<template>
  <div class="panel design-panel">
   <color-picker
      :color="color"
      :onColorChange="onColorChange"
    ></color-picker>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
  name: "DesignPanel",
  components: {
    ColorPicker
  },
  props: ["color", "onColorChange"],
  methods: {
  },
  mounted() {},
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
