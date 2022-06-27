<template>
  <div class="panel-selector-container">
    <button type="button" @click="onUpdatePanel('DesignPanel')">Design</button>
    <button type="button" @click="onUpdatePanel('GridSettingsPanel')">Grid Settings</button>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
  name: "PanelSelector",
  props: ["onUpdatePanel"],
  methods: {},
  mounted() {
    console.log(this.color, this.onColorChange);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
