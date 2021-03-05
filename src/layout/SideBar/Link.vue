<template>
  <component :is="componentTag" v-bind="bindPropsForLink">
    <slot></slot>
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { isExternal } from "@/utils/validate";

export default defineComponent({
  name: "SidebarLink",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const componentTag = isExternal(props.to) ? "a" : "router-link";
    const bindPropsForLink = isExternal(props.to)
      ? {
          href: props.to,
          target: "_blank",
          rel: "noopener"
        }
      : {
          to: props.to
        };

    return {
      bindPropsForLink,
      componentTag
    };
  }
});
</script>
