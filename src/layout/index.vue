<template>
  <headers />
  <main>
    <side-bar />
    <router-view />
  </main>
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
