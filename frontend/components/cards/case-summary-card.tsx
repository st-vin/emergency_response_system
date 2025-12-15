/**
 * CaseSummary Card Component
 * Fields: alert_id, location, emergency_type, reporter_notes
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type CaseSummaryCardProps = {
  alertId: number | string;
  location: string;
  emergencyType: string;
  reporterNotes?: string;
  onPress?: () => void;
};

export function CaseSummaryCard({
  alertId,
  location,
  emergencyType,
  reporterNotes,
  onPress,
}: CaseSummaryCardProps) {
  return (
    <Card onPress={onPress} elevation={onPress ? 'hover' : 'default'}>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Case Summary
      </ThemedText>
      <View style={styles.divider} />
      <View style={styles.detailRow}>
        <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Alert ID:</ThemedText>
        <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>{alertId}</ThemedText>
      </View>
      <View style={styles.detailRow}>
        <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Type:</ThemedText>
        <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>
          {emergencyType}
        </ThemedText>
      </View>
      <View style={styles.detailRow}>
        <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Location:</ThemedText>
        <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>{location}</ThemedText>
      </View>
      {reporterNotes && (
        <View style={styles.notesContainer}>
          <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
            Reporter Notes:
          </ThemedText>
          <ThemedText style={[styles.notesText, { fontSize: getResponsiveFontSize(14) }]}>
            {reporterNotes}
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
  notesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  notesText: {
    marginTop: 6,
    opacity: 0.8,
    lineHeight: 20,
  },
});
