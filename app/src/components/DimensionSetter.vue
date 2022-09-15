<template>
  <div class="dimension-setter">
    <div class="group-label first">Current dimensions</div>
    <div class="dimension-setter-section">
      <div class="current-dimensions">
        <div class="current-dimension-row">
          <div class="input-label">Rows:</div>
          {{ dimensions.rows }}
        </div>
        <div class="current-dimension-row">
          <div class="input-label">Columns:</div>
          {{ dimensions.columns }}
        </div>
      </div>
    </div>
    <div class="group-label">Create new grid</div>
    <div class="dimension-setter-section">
      <form @submit="onSubmit">
        <input type="number" min="1" max="100" v-model="rows" />
        <input type="number" min="1" max="100" v-model="columns" />
        <button class="btn generate-new btn-main" type="submit">
          Generate new grid
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DimensionSetter",
  props: ["dimensions", "updateGridDimensionsAndRerender"],
  data() {
    return {
      rows: 1,
      columns: 1,
    };
  },
  mounted() {
    this.rows = this.dimensions.rows;
    this.columns = this.dimensions.columns;
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.updateGridDimensionsAndRerender({
        rows: Number(this.rows),
        columns: Number(this.columns),
      });
    },
  },
};
</script>

<style lang="scss">
.generate-new {
  background: #04e762;
}

.dimension-setter-section {
  padding: 0 20px;
}

// .dimension-setter-section:not(:last-of-type) {
//   margin-bottom: 10px;
// }

.current-dimension-row {
  display: flex;
  justify-content: space-between;
}
</style>
