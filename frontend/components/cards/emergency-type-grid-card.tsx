/**
 * EmergencyTypeGrid Card Component
 * Types: Fire, Medical, Crime, Traffic
 * Selection mode: single
 */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize, getDeviceType } from '@/utils/responsive';

export type EmergencyType = 'Fire' | 'Medical' | 'Crime' | 'Traffic';

export type EmergencyTypeGridCardProps = {
  selectedType?: EmergencyType | '';
  onTypeSelect: (type: EmergencyType) => void;
  disabled?: boolean;
};

const EMERGENCY_TYPES: EmergencyType[] = ['Fire', 'Medical', 'Crime', 'Traffic'];

const TYPE_ICONS: Record<EmergencyType, string> = {
  Fire: '🔥',
  Medical: '🚑',
  Crime: '🚨',
  Traffic: '🚗',
};

const TYPE_COLORS: Record<EmergencyType, string> = {
  Fire: '#D32F2F',
  Medical: '#1976D2',
  Crime: '#FBC02D',
  Traffic: '#43A047',
};

export function EmergencyTypeGridCard({
  selectedType = '',
  onTypeSelect,
  disabled = false,
}: EmergencyTypeGridCardProps) {
  const deviceType = getDeviceType();
  const isGridLayout = deviceType === 'desktop';

  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Emergency Type
      </ThemedText>
      <View style={[styles.grid, isGridLayout && styles.gridDesktop]}>
        {EMERGENCY_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                isSelected && { backgroundColor: TYPE_COLORS[type] },
                disabled && styles.buttonDisabled,
              ]}
              onPress={() => !disabled && onTypeSelect(type)}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.typeIcon, { fontSize: getResponsiveFontSize(24) }]}>
                {TYPE_ICONS[type]}
              </ThemedText>
              <ThemedText
                style={[
                  styles.typeText,
                  { fontSize: getResponsiveFontSize(14) },
                  isSelected && styles.typeTextSelected,
                ]}
              >
                {type}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridDesktop: {
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  typeIcon: {
    marginBottom: 6,
  },
  typeText: {
    fontWeight: '600',
    color: '#11181C',
  },
  typeTextSelected: {
    color: '#FFFFFF',
  },
});
