<template>
  <headers />
  <main>
    <side-bar />
    <router-view />
  </main>
</template>
<script>
import { defineComponent } from "vue";
import Headers from "./Header";
import SideBar from "./SideBar";

export default defineComponent({
  components: {
    Headers,
    SideBar
  }
});
</script>
