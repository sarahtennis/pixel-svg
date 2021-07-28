<template>
  <div class="pixel-grid-square" :style="getSquareStyle()" @click="onClick()">

  </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
  name: "PixelGridSquare",
  props: ['square', 'position'],
  methods: {
    getSquareStyle: function() {
      return {
        "background-color": this.square
      }
    },
    onClick: function() {
      EventBus.$emit('squareClicked', this.position);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel-grid-square {
  height: 50px;
  width: 50px;
  border: 1px solid white;
}
</style>
