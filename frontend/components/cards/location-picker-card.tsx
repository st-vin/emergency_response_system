/**
 * LocationPicker Card Component
 * Fields: gps_location, manual_entry
 * Actions: get_current_location
 */
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type LocationPickerCardProps = {
  locationLat?: string;
  locationLng?: string;
  onLocationChange?: (lat: string, lng: string) => void;
  onGetCurrentLocation?: () => void;
  disabled?: boolean;
};

export function LocationPickerCard({
  locationLat = '',
  locationLng = '',
  onLocationChange,
  onGetCurrentLocation,
  disabled = false,
}: LocationPickerCardProps) {
  const [lat, setLat] = useState(locationLat);
  const [lng, setLng] = useState(locationLng);

  const handleLatChange = (value: string) => {
    setLat(value);
    onLocationChange?.(value, lng);
  };

  const handleLngChange = (value: string) => {
    setLng(value);
    onLocationChange?.(lat, value);
  };

  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Location
      </ThemedText>
      <View style={styles.buttonContainer}>
        {onGetCurrentLocation && (
          <TouchableOpacity
            style={[styles.locationButton, disabled && styles.buttonDisabled]}
            onPress={onGetCurrentLocation}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
              📍 Get Current Location
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
            Latitude
          </ThemedText>
          <TextInput
            style={[styles.input, { fontSize: getResponsiveFontSize(14) }]}
            placeholder="e.g., 40.7128"
            value={lat}
            onChangeText={handleLatChange}
            keyboardType="numeric"
            editable={!disabled}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
            Longitude
          </ThemedText>
          <TextInput
            style={[styles.input, { fontSize: getResponsiveFontSize(14) }]}
            placeholder="e.g., -74.0060"
            value={lng}
            onChangeText={handleLngChange}
            keyboardType="numeric"
            editable={!disabled}
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    opacity: 0.8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
