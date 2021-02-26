import { App } from "vue";
import { ThemeKey } from "@/global";

export interface ThemeValue {
  darkColor: string;
  darkTextColor: string;
  darkActiveColor: string;
}

// 暗色
const themeValue: ThemeValue = {
  // 背景
  darkColor: "#304156",
  // 文字
  darkTextColor: "#bfcbd9",
  // active
  darkActiveColor: "#409eff"
};

export function useTheme(app: App): void {
  app.provide(ThemeKey, themeValue);
}
