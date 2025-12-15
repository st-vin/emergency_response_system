/**
 * ResponderDetails Card Component
 * Fields: name, vehicle_type, contact, distance_km
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type ResponderDetailsCardProps = {
  name: string;
  vehicleType?: string;
  contact?: string;
  distanceKm?: number;
};

export function ResponderDetailsCard({
  name,
  vehicleType,
  contact,
  distanceKm,
}: ResponderDetailsCardProps) {
  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Responder Details
      </ThemedText>
      <View style={styles.divider} />
      <View style={styles.detailRow}>
        <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Name:</ThemedText>
        <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>{name}</ThemedText>
      </View>
      {vehicleType && (
        <View style={styles.detailRow}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
            Vehicle Type:
          </ThemedText>
          <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>
            {vehicleType}
          </ThemedText>
        </View>
      )}
      {contact && (
        <View style={styles.detailRow}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Contact:</ThemedText>
          <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>{contact}</ThemedText>
        </View>
      )}
      {distanceKm !== undefined && (
        <View style={styles.detailRow}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
            Distance:
          </ThemedText>
          <ThemedText style={[styles.value, styles.distanceValue, { fontSize: getResponsiveFontSize(14) }]}>
            {distanceKm.toFixed(1)} km
          </ThemedText>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontWeight: '600',
    opacity: 0.7,
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  distanceValue: {
    color: '#43A047',
    fontWeight: '700',
  },
});
