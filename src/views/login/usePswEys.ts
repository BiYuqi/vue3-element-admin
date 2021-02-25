import { ref } from "vue";

type PswType = "text" | "password";
type IconName = "eye" | "eye-open";

export function usePswEys() {
  const pswType = ref<PswType>("password");
  const iconName = ref<IconName>("eye");
  const isOpen = ref<boolean>(false);

  const handleClickEye = () => {
    isOpen.value = !isOpen.value;
    pswType.value = isOpen.value ? "text" : "password";
    iconName.value = isOpen.value ? "eye-open" : "eye";
  };

  return {
    pswType,
    iconName,
    handleClickEye
  };
}
