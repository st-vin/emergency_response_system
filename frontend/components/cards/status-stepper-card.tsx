/**
 * StatusStepper Card Component
 * Statuses: Accepted, En Route, Arrived, Completed
 */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Card } from '../card';
import { ThemedText } from '../themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type StatusType = 'Accepted' | 'En Route' | 'Arrived' | 'Completed';

const STATUS_OPTIONS: StatusType[] = ['Accepted', 'En Route', 'Arrived', 'Completed'];

export type StatusStepperCardProps = {
  currentStatus?: StatusType;
  onStatusChange?: (status: StatusType) => void;
  disabled?: boolean;
};

export function StatusStepperCard({
  currentStatus,
  onStatusChange,
  disabled = false,
}: StatusStepperCardProps) {
  return (
    <Card>
      <ThemedText type="subtitle" style={[styles.title, { fontSize: getResponsiveFontSize(16) }]}>
        Update Status
      </ThemedText>
      <View style={styles.divider} />
      <View style={styles.stepperContainer}>
        {STATUS_OPTIONS.map((status, index) => {
          const isSelected = currentStatus === status;
          const isCompleted = currentStatus && STATUS_OPTIONS.indexOf(currentStatus) > index;
          const canSelect = !currentStatus || STATUS_OPTIONS.indexOf(currentStatus) >= index - 1;

          return (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                isSelected && styles.statusButtonSelected,
                isCompleted && styles.statusButtonCompleted,
                (!canSelect || disabled) && styles.statusButtonDisabled,
              ]}
              onPress={() => canSelect && !disabled && onStatusChange?.(status)}
              disabled={!canSelect || disabled}
              activeOpacity={0.7}
            >
              <ThemedText
                style={[
                  styles.statusText,
                  { fontSize: getResponsiveFontSize(14) },
                  isSelected && styles.statusTextSelected,
                  isCompleted && styles.statusTextCompleted,
                ]}
              >
                {status}
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
    marginBottom: 8,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
  statusButtonSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  statusButtonCompleted: {
    backgroundColor: '#43A047',
    borderColor: '#43A047',
  },
  statusButtonDisabled: {
    opacity: 0.4,
  },
  statusText: {
    fontWeight: '600',
    color: '#11181C',
  },
  statusTextSelected: {
    color: '#FFFFFF',
  },
  statusTextCompleted: {
    color: '#FFFFFF',
  },
});
