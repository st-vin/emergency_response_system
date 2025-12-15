/**
 * ETAStatus Card Component
 * Fields: eta_minutes, responder_status
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type ETAStatusCardProps = {
  etaMinutes: number | null;
  responderStatus?: string;
};

export function ETAStatusCard({ etaMinutes, responderStatus }: ETAStatusCardProps) {
  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Estimated Arrival Time
      </ThemedText>
      <View style={styles.divider} />
      <View style={styles.etaContainer}>
        <ThemedText style={[styles.etaValue, { fontSize: getResponsiveFontSize(32) }]}>
          {etaMinutes !== null ? `${etaMinutes} min` : 'Calculating...'}
        </ThemedText>
      </View>
      {responderStatus && (
        <View style={styles.statusContainer}>
          <ThemedText style={[styles.statusLabel, { fontSize: getResponsiveFontSize(14) }]}>
            Status:
          </ThemedText>
          <ThemedText style={[styles.statusValue, { fontSize: getResponsiveFontSize(14) }]}>
            {responderStatus}
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
  etaContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#E8F5E9',
    marginBottom: 12,
  },
  etaValue: {
    color: '#43A047',
    fontWeight: '700',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statusLabel: {
    fontWeight: '600',
    opacity: 0.7,
  },
  statusValue: {
    fontWeight: '600',
    color: '#1976D2',
  },
});
