<template>
  <div class="panel-selector-container">
    <button
      class="panel-selector-btn"
      :class="{ selected: getIsSelected('DesignPanel') }"
      type="button"
      @click="onUpdatePanel('DesignPanel')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
      >
        <path
          fill="currentColor"
          d="M7.44.03c-.03 0-.04.02-.06.03l-3.75 2.66c-.04.03-.1.11-.13.16l-.13.25c.72.23 1.27.78 1.5 1.5l.25-.13c.05-.03.12-.08.16-.13l2.66-3.75c.03-.05.04-.09 0-.13l-.44-.44c-.02-.02-.04-.03-.06-.03zm-4.78 3.97c-.74 0-1.31.61-1.31 1.34 0 .99-.55 1.85-1.34 2.31.39.22.86.34 1.34.34 1.47 0 2.66-1.18 2.66-2.66 0-.74-.61-1.34-1.34-1.34z"
        />
      </svg>
    </button>
    <button
      class="panel-selector-btn"
      :class="{ selected: getIsSelected('GridSettingsPanel') }"
      type="button"
      @click="onUpdatePanel('GridSettingsPanel')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="280px"
        height="279.416px"
        viewBox="340 140 280 279.416"
        enable-background="new 340 140 280 279.416"
        xml:space="preserve"
      >
        <path
          fill="currentColor"
          d="M620,305.666v-51.333l-31.5-5.25c-2.333-8.75-5.833-16.917-9.917-23.917L597.25,199.5l-36.167-36.75l-26.25,18.083  c-7.583-4.083-15.75-7.583-23.916-9.917L505.667,140h-51.334l-5.25,31.5c-8.75,2.333-16.333,5.833-23.916,9.916L399.5,163.333  L362.75,199.5l18.667,25.666c-4.083,7.584-7.583,15.75-9.917,24.5l-31.5,4.667v51.333l31.5,5.25  c2.333,8.75,5.833,16.334,9.917,23.917l-18.667,26.25l36.167,36.167l26.25-18.667c7.583,4.083,15.75,7.583,24.5,9.917l5.25,30.916  h51.333l5.25-31.5c8.167-2.333,16.333-5.833,23.917-9.916l26.25,18.666l36.166-36.166l-18.666-26.25  c4.083-7.584,7.583-15.167,9.916-23.917L620,305.666z M480,333.666c-29.75,0-53.667-23.916-53.667-53.666s24.5-53.667,53.667-53.667  S533.667,250.25,533.667,280S509.75,333.666,480,333.666z"
        />
      </svg>
    </button>
    <button
      class="panel-selector-btn"
      :class="{ selected: getIsSelected('GeneratePanel') }"
      type="button"
      @click="onUpdatePanel('GeneratePanel')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 600 600"
        enable-background="new 0 0 600 600"
        xml:space="preserve"
      >
        <path
          fill="currentColor"
          d="M449.2,197.8h-99.8V44.5c0-14-11.2-25.5-25-25.5h-49.9c-13.7,0-25,11.5-25,25.5v153.3h-99.8l149.7,204.4    L449.2,197.8z M561.6,274.5c-20.7,0-37.4,17.2-37.4,38.3v191.6H74.9V312.8c0-21.2-16.8-38.3-37.4-38.3C16.8,274.5,0,291.6,0,312.8    v229.9C0,563.8,16.8,581,37.4,581h524.1c20.7,0,37.4-17.2,37.4-38.3V312.8C599,291.6,582.2,274.5,561.6,274.5z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "PanelSelector",
  props: ["onUpdatePanel", "currentPanel"],
  methods: {
    getIsSelected(panelToCheck) {
      return panelToCheck === this.currentPanel;
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.panel-selector-container {
  position: absolute;
  width: 40px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 2px 1px rgba(0,0,0,.5);

  .panel-selector-btn {
    height: 40px;
    width: 40px;
    border: none;
    color: #9AA5B1;
    background: #616E7C;

    &:not(.selected):hover {
      // background: #ddcbff;
      cursor: pointer;
    }

    &.selected {
      position: relative;
      background: #323f4b;
      color: #79E2F2;
      border-bottom: none;
      z-index: 10;
    }

    svg {
      height: 20px;
      width: 20px;
    }
  }
}
</style>
