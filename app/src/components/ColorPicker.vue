<template>
  <div class="color-picker" ref="picker">
    <sketch
      :value="getColorPickerColor"
      @input="onSketchColorChange"
      :preset-colors="[]"
    />
    <div class="btn-group">
      <button
        :class="{ 'is-erasing': !this.color, 'inactive': !!this.color }"
        type="button"
        @click="onChooseErase"
        class="btn design-btn"
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill="currentColor"
            d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z"
          />
        </svg>
      </button>
      <div class="btn-group-divider"></div>
      <button type="button" class="btn design-btn" disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M24 19.007c0-3.167-1.409-6.771-2.835-9.301l-.006-.01-.014-.026c-.732-1.392-1.914-3.052-3.619-4.757-2.976-2.976-5.476-3.912-6.785-3.913-.413 0-.708.094-.859.245l-.654.654c-1.898-.236-3.42.105-4.294.982-.876.875-1.164 2.159-.792 3.524.242.893.807 1.891 1.752 2.836.867.867 2.062 1.684 3.615 2.327.488-.839 1.654-1.019 2.359-.315.586.586.584 1.533-.002 2.119s-1.533.589-2.121 0c-.229-.229-.366-.515-.416-.812-1.646-.657-3.066-1.534-4.144-2.612-.728-.728-1.289-1.528-1.664-2.349l-2.835 2.832c-.445.447-.685 1.064-.686 1.82.001 1.635 1.122 3.915 3.714 6.506 2.764 2.764 5.58 4.243 7.431 4.243.649 0 1.181-.195 1.548-.562l8.086-8.079c.911.875-.777 3.541-.777 4.65 0 1.104.896 1.999 2 1.998 1.104 0 1.998-.895 1.998-2zm-18.912-12.974c-.236-.978-.05-1.845.554-2.444.526-.53 1.471-.791 2.656-.761l-3.21 3.205zm9.138 2.341l-.03-.029c-1.29-1.291-3.802-4.354-3.095-5.062.715-.715 3.488 1.521 5.062 3.095.862.863 2.088 2.248 2.938 3.459-1.718-1.073-3.493-1.469-4.875-1.463zm-3.875 12.348c-.547-.082-1.5-.547-1.9-.928l7.086-7.086c.351.37 1.264.931 1.753 1.075l-6.939 6.939z"
          />
        </svg>
      </button>
    </div>
    <button type="button" class="btn btn-destroy" @click="onClearAll">
      Clear all
    </button>
  </div>
</template>

<script>
import { Sketch } from "vue-color";

export default {
  name: "ColorPicker",
  components: {
    Sketch,
  },
  props: ["color", "onColorChange", "updateGridDimensionsAndRerender"],
  data() {
    return {
      previousColor: {
        rgba: {
          r: 255,
          g: 0,
          b: 255,
          a: 1,
        },
      },
    };
  },
  computed: {
    getColorPickerColor: function () {
      return this.color ? this.color : this.previousColor;
    },
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
    },
    onClearAll() {
      this.updateGridDimensionsAndRerender();
    },
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
    background: #616E7C;

    .vc-sketch-field {
      text-align: center;
    }

    .vc-sketch-field input,
    .vc-sketch-field span {
      font-size: 14px !important;
    }

    .vc-input__input:focus ~ .vc-input__label {
      font-weight: bold;
    }

    .vc-input__label {
      color: #FFFFFF;
    }

    .vc-sketch-presets {
      margin: 0;
      padding: 0;
      border: none;
    }

    .vc-sketch-controls {
      margin-left: 10px;
      margin-right: 10px;
    }

    .vc-saturation {
      margin: 10px;
    }
  }

  .design-btn.inactive {
    background: #9AA5B1;
    color: #E4E7EB;
  }

  .btn.is-erasing {
    background: #2176ff;
  }

  .btn-destroy {
    margin-top: 0;
    background: #FF5630;
    color: #fff;
  }
}
</style>
