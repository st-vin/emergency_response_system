import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design specification breakpoints
export const BREAKPOINTS = {
  mobile: { min: 0, max: 600 },
  tablet: { min: 601, max: 900 },
  desktop: { min: 901, max: Infinity },
};

// Font scale factors from specification
export const FONT_SCALES = {
  mobile: 1.0,
  tablet: 1.2,
  desktop: 1.4,
};

// Base dimensions for design (iPhone 12/13 standard)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive scaling functions
export const scale = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scaleFactor);
};

export const verticalScale = (size: number): number => {
  const scaleFactor = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scaleFactor);
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size + (scaleFactor - 1) * size * factor);
};

// Device type detection based on specification breakpoints
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (SCREEN_WIDTH >= BREAKPOINTS.desktop.min) {
    return 'desktop';
  } else if (SCREEN_WIDTH >= BREAKPOINTS.tablet.min) {
    return 'tablet';
  }
  return 'mobile';
};

export const isTablet = (): boolean => {
  return getDeviceType() === 'tablet';
};

export const isDesktop = (): boolean => {
  return getDeviceType() === 'desktop';
};

export const isMobile = (): boolean => {
  return getDeviceType() === 'mobile';
};

export const isSmallDevice = (): boolean => {
  return SCREEN_WIDTH < 375;
};

export const isLargeDevice = (): boolean => {
  return SCREEN_WIDTH >= 414;
};

// Responsive padding
export const getResponsivePadding = (): {
  horizontal: number;
  vertical: number;
  screen: number;
} => {
  if (isTablet()) {
    return {
      horizontal: scale(32),
      vertical: scale(24),
      screen: scale(40),
    };
  }
  if (isSmallDevice()) {
    return {
      horizontal: scale(16),
      vertical: scale(12),
      screen: scale(16),
    };
  }
  return {
    horizontal: scale(20),
    vertical: scale(16),
    screen: scale(20),
  };
};

// Responsive font sizes based on specification
export const getResponsiveFontSize = (baseSize: number): number => {
  const deviceType = getDeviceType();
  const scaleFactor = FONT_SCALES[deviceType];
  return Math.round(baseSize * scaleFactor);
};

// Typography sizes from specification
export const Typography = {
  title: 20,
  subtitle: 16,
  body: 14,
};

// Screen dimensions
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;
