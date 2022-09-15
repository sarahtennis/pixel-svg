<template>
  <div class="panel grid-settings-panel">
    <div class="panel-header">Grid Settings</div>
    <div class="panel-content">
      <dimension-setter
        :dimensions="dimensions"
        :updateGridDimensionsAndRerender="updateGridDimensionsAndRerender"
      ></dimension-setter>
    </div>
  </div>
</template>

<script>
import DimensionSetter from "./DimensionSetter.vue";

export default {
  name: "GridSettingsPanel",
  components: {
    DimensionSetter,
  },
  props: ["dimensions", "updateGridDimensionsAndRerender"],
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
