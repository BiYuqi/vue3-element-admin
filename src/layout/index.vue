<template>
  <div class="app-container">
    <side-bar />
    <main>
      <headers />
      <div class="app-content">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Headers from "./Header/index.vue";
import SideBar from "./SideBar/index.vue";

export default defineComponent({
  components: {
    Headers,
    SideBar
  }
});
</script>

<style lang="scss">
.app-container {
  position: relative;
  display: flex;
  min-height: 100vh;

  main {
    flex: 1;
  }
}

.app-content {
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 15px;
  position: relative;
  overflow: hidden;
}
</style>
