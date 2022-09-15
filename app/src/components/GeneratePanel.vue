<template>
  <div class="panel generate-panel">
    <div class="panel-header">Generate</div>
    <div class="panel-content">
      <button class="generate btn btn-main" @click="onGenerate">
        Generate
      </button>
      <textarea v-model="svg" disabled></textarea>
      <button
        type="button"
        class="preview btn btn-default"
        @click="onClickSvgPreview"
        :disabled="!svg"
      >
        Preview
      </button>
      <div
        class="svg-preview-modal-backdrop"
        v-if="showSvgPreviewModal"
        @click="showSvgPreviewModal = false"
      >
        <div class="svg-preview-modal" @click="(e) => e.stopPropagation()">
          <div class="svg-preview-modal-header">
            <div class="svg-preview-modal-header-title">SVG preview</div>
            <div
              class="svg-preview-modal-header-close"
              @click="showSvgPreviewModal = false"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M9 9L24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="square"
                />
                <path
                  d="M8.49512 23.4586L24.5049 9.54144"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="square"
                />
              </svg>
            </div>
          </div>
          <div
            class="svg-preview-modal-preview"
            ref="modal-preview"
            v-html="svg"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneratePanel",
  data() {
    return {
      showSvgPreviewModal: false,
    };
  },
  props: ["dimensions", "onGenerate", "svg"],
  methods: {
    onClickSvgPreview() {
      if (!this.svg) return;
      this.showSvgPreviewModal = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.btn.generate {
  background: #04e762;
}

.btn.preview {
  background: #04e762;
}

.panel-header {
  display: flex;
  align-items: center;
  background: #8a2be2;
  border-bottom: 2px solid #1a1a1a;
  height: 50px;
  font-size: 24px;
  color: #fff;
  padding: 0 10px;
}

.panel-content {
  width: 100%;
}
</style>
