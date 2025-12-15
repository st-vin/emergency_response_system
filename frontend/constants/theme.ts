/**
 * Emergency Response System Theme Colors
 * Following the design specification with card-based UI
 */

import { Platform } from 'react-native';

// Design specification colors
export const DesignColors = {
  primary: '#D32F2F',
  secondary: '#1976D2',
  success: '#43A047',
  warning: '#FBC02D',
  surface: '#FFFFFF',
  background: '#F5F5F5',
};

const tintColorLight = DesignColors.secondary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: DesignColors.background,
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: DesignColors.primary,
    secondary: DesignColors.secondary,
    success: DesignColors.success,
    warning: DesignColors.warning,
    surface: DesignColors.surface,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: DesignColors.primary,
    secondary: DesignColors.secondary,
    success: DesignColors.success,
    warning: DesignColors.warning,
    surface: '#1E1E1E',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
