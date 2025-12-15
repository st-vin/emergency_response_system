/**
 * StatusTimeline Card Component
 * Steps: Alert Sent, Responder Assigned, Responder En Route, Arrived
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type StatusStep = 'Alert Sent' | 'Responder Assigned' | 'Responder En Route' | 'Arrived';

const STATUS_STEPS: StatusStep[] = [
  'Alert Sent',
  'Responder Assigned',
  'Responder En Route',
  'Arrived',
];

export type StatusTimelineCardProps = {
  currentStatus: StatusStep;
};

export function StatusTimelineCard({ currentStatus }: StatusTimelineCardProps) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);

  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Status Timeline
      </ThemedText>
      <View style={styles.divider} />
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <View key={step} style={styles.stepContainer}>
            <View style={[styles.stepIndicator, isCompleted && styles.stepIndicatorCompleted]}>
              {isCompleted && (
                <ThemedText style={[styles.checkmark, { fontSize: getResponsiveFontSize(12) }]}>
                  ✓
                </ThemedText>
              )}
            </View>
            <View style={styles.stepContent}>
              <ThemedText
                style={[
                  styles.stepText,
                  { fontSize: getResponsiveFontSize(14) },
                  isCompleted && styles.stepTextCompleted,
                  isCurrent && styles.stepTextCurrent,
                ]}
              >
                {step}
              </ThemedText>
              {isCurrent && (
                <ThemedText style={[styles.currentLabel, { fontSize: getResponsiveFontSize(12) }]}>
                  Current
                </ThemedText>
              )}
            </View>
          </View>
        );
      })}
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepIndicatorCompleted: {
    backgroundColor: '#43A047',
    borderColor: '#43A047',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontWeight: '500',
    opacity: 0.6,
  },
  stepTextCompleted: {
    opacity: 1,
    fontWeight: '600',
  },
  stepTextCurrent: {
    color: '#1976D2',
    fontWeight: '700',
  },
  currentLabel: {
    color: '#1976D2',
    marginTop: 2,
    fontWeight: '600',
  },
});
