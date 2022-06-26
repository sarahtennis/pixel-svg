<template>
  <div class="dimension-setter">
    <h2>Dimensions</h2>
		<h3>Current dimensions</h3>
		<div class="current-dimensions">
			<span>Rows: {{ dimensions.rows }}</span>
			<span>Columns: {{ dimensions.columns }}</span>
		</div>
    <form @submit="onSubmit">
			<input type="number" min="1" max="100" v-model="rows"></input>
			<input type="number" min="1" max="100" v-model="columns"></input>
			<button class="btn btn-main" type="submit">Generate new</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "DimensionSetter",
  props: ["dimensions", "updateGridDimensionsAndRerender"],
	data() {
		return {
			rows: 1,
			columns: 1
		}
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
				columns: Number(this.columns)
			});
		}
  },
};
</script>

<style lang="scss">
</style>