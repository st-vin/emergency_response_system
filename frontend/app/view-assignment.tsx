// Mobile User: View Assignment Details screen - Card-based layout
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/card';
import { ResponderDetailsCard } from '@/components/cards/responder-details-card';
import { StatusTimelineCard } from '@/components/cards/status-timeline-card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAssignmentByEmergency, getReport } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function ViewAssignmentScreen() {
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [emergencyId, setEmergencyId] = useState('');
  const [assignment, setAssignment] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleViewAssignment = async () => {
    if (!emergencyId) {
      Alert.alert('Error', 'Please enter an emergency ID');
      return;
    }

    setLoading(true);
    try {
      const assignmentData = await getAssignmentByEmergency(parseInt(emergencyId));
      setAssignment(assignmentData);

      // Also fetch the report details
      const reportData = await getReport(parseInt(emergencyId));
      setReport(reportData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch assignment details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Map assignment status to timeline status
  const getTimelineStatus = (): 'Alert Sent' | 'Responder Assigned' | 'Responder En Route' | 'Arrived' => {
    if (!assignment) return 'Alert Sent';
    if (assignment.etaMinutes && assignment.etaMinutes > 0) return 'Responder En Route';
    return 'Responder Assigned';
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + padding.vertical, padding.vertical),
            paddingBottom: insets.bottom + padding.vertical,
            paddingHorizontal: padding.screen,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText type="title" style={[styles.title, { fontSize: getResponsiveFontSize(20) }]}>
          View Assignment Details
        </ThemedText>

        <Card>
          <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
            Emergency ID
          </ThemedText>
          <TextInput
            style={[styles.input, { fontSize: getResponsiveFontSize(14) }]}
            placeholder="Enter emergency ID"
            value={emergencyId}
            onChangeText={setEmergencyId}
            keyboardType="numeric"
            editable={!loading}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleViewAssignment}
            disabled={loading || !emergencyId}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                View Assignment
              </ThemedText>
            )}
          </TouchableOpacity>
        </Card>

        {loading && !assignment && <SkeletonCard />}

        {assignment && (
          <Card>
            <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
              Assignment Details
            </ThemedText>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
                Assignment ID:
              </ThemedText>
              <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>
                {assignment.id}
              </ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
                ETA (minutes):
              </ThemedText>
              <ThemedText style={[styles.value, styles.etaValue, { fontSize: getResponsiveFontSize(16) }]}>
                {assignment.etaMinutes}
              </ThemedText>
            </View>
          </Card>
        )}

        {report && (
          <>
            <StatusTimelineCard currentStatus={getTimelineStatus()} />
            {assignment && (
              <ResponderDetailsCard
                name={`Responder ${assignment.responderId}`}
                distanceKm={assignment.etaMinutes ? assignment.etaMinutes * 0.5 : undefined}
              />
            )}
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: -0.5,
    width: '100%',
    maxWidth: 420,
  },
  cardTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 8,
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
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
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
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
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
  etaValue: {
    color: '#43A047',
    fontWeight: '700',
  },
});
