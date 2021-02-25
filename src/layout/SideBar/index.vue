<template>
  <div class="app-sidebar" :class="{ hidden: store.state.app.sideBarIsOpen }">
    sidebar
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store
    };
  }
});
</script>
<style lang="scss">
.app-sidebar {
  width: 240px;
  background-color: $darkBg;
  transition: width 0.24s;

  &.hidden {
    width: 64px !important;
  }
}
</style>
