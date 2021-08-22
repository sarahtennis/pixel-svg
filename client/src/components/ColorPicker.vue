<template>
  <input type="color" :value="color" @input="onColorChange($event)" />
</template>

<script>
import EventBus from "../event-bus";

export default {
  name: "ColorPicker",
  props: ["color"],
  methods: {
    onColorChange: function (e) {
      EventBus.$emit("colorChanged", e.target.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  height: 100%;
}
</style>
