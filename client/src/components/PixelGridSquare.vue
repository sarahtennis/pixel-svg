<template>
  <div class="pixel-grid-square"
       :style="getSquareStyle()" 
       @mouseenter="onMouseEnter()"
       @mouseleave="onMouseLeave()"
       @click="onClick()">
    <div class="transparent" v-if="!square"></div>
    <div class="hovered" v-if="isHovered" :style="getHoverStyle()"></div>
  </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
  name: "PixelGridSquare",
  data: function() {
    return {
      isHovered: false
    }
  },
  props: ['square', 'position', 'color'],
  methods: {
    getSquareStyle: function() {
      if (this.square) {
        return {
          "background-color": this.square
        }
      } else {
        return {
          "background-color": "#fff"
        }
      }
    },
    getHoverStyle: function() {
      return {
        'background-color': this.color
      }
    },
    onClick: function() {
      EventBus.$emit('squareClicked', this.position);
    },
    onMouseEnter: function() {
      this.$set(this, 'isHovered', true);
    },
    onMouseLeave: function() {
      this.$set(this, 'isHovered', false);
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
  position: relative;

  .transparent {
    height: 100%;
    width: 100%;
    z-index: 1;
    position: absolute;
    background: url('../assets/Transparent.svg');
    background-size: 25px 25px;
  }

  .hovered {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
  }
}
</style>
