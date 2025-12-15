/**
 * Base Card Component
 * Following design specification:
 * - No rounded corners (borderRadius: 0)
 * - Medium shadow depth
 * - 16px padding
 * - Max width: 420px
 * - Clickable with elevation states (default: 2, hover: 4, active: 6)
 */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { getDeviceType } from '@/utils/responsive';

export type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  elevation?: 'default' | 'hover' | 'active';
  maxWidth?: number;
};

export function Card({ 
  children, 
  onPress, 
  style, 
  disabled = false,
  elevation = 'default',
  maxWidth = 420,
}: CardProps) {
  const deviceType = getDeviceType();
  const isClickable = onPress && !disabled;
  
  // Elevation mapping from specification
  const elevationMap = {
    default: 2,
    hover: 4,
    active: 6,
  };

  const cardStyle = [
    styles.card,
    {
      elevation: elevationMap[elevation],
      maxWidth: deviceType === 'desktop' ? maxWidth : '100%',
      width: '100%',
    },
    style,
  ];

  if (isClickable) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16, // 16px padding from spec
    borderRadius: 0, // No rounded corners from spec
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2, // default elevation
      },
    }),
  },
});
