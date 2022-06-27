<template>
  <div class="color-picker" ref="picker">
    <sketch :value="getColorPickerColor" @input="onSketchColorChange" :preset-colors="[]" />
    <div class="btn-group">
      <button :class="{'is-erasing': !this.color}" type="button" @click="onChooseErase" class="btn btn-main">Erase</button>
      <div class="btn-group-divider"></div>
      <button type="button" class="btn btn-main" disabled>Fill</button>
    </div>
    <button type="button" class="btn btn-destroy" disabled>Clear</button>
  </div>
</template>

<script>
import { Sketch } from "vue-color";

export default {
  name: "ColorPicker",
  components: {
    Sketch,
  },
  props: ["color", "onColorChange"],
  data() {
    return {
      previousColor: {
        rgba: {
          r: 255,
          g: 0,
          b: 255,
          a: 1,
        }
      }
    }
  },
  computed: {
    getColorPickerColor: function() {
      return this.color ? this.color : this.previousColor
    }
  },
  methods: {
    onChooseErase() {
      if (this.color) {
        this.previousColor = this.color;
        this.onColorChange(null);
      } else {
        this.onColorChange(this.previousColor);
      }
    },
    onSketchColorChange(color) {
      this.onColorChange(color);
    }
  },
  mounted() {
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

  .btn.is-erasing { 
    border: 2px solid green;
    background: limegreen;

    &:hover {
      border: 2px solid green;
      background: rgb(42, 184, 42);
    }
  }

  .btn-destroy {
    margin-top: 0;
  }
}
</style>
