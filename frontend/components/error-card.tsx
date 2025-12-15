/**
 * Error Card Component with Retry Button
 * Displays error message with retry functionality
 */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Card } from './card';
import { ThemedText } from './themed-text';
import { getResponsiveFontSize } from '@/utils/responsive';

export type ErrorCardProps = {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorCard({ message, onRetry, retryLabel = 'Retry' }: ErrorCardProps) {
  return (
    <Card>
      <View style={styles.errorContainer}>
        <ThemedText style={[styles.errorIcon, { fontSize: getResponsiveFontSize(24) }]}>⚠️</ThemedText>
        <ThemedText style={[styles.errorMessage, { fontSize: getResponsiveFontSize(14) }]}>
          {message}
        </ThemedText>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
            <ThemedText style={[styles.retryButtonText, { fontSize: getResponsiveFontSize(14) }]}>
              {retryLabel}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  errorIcon: {
    marginBottom: 8,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
    color: '#D32F2F',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#D32F2F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
