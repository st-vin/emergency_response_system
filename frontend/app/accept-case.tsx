// Responder: Accept Case screen - Card-based layout
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
import { CaseSummaryCard } from '@/components/cards/case-summary-card';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createAssignment, getReport } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function AcceptCaseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [emergencyId, setEmergencyId] = useState('');
  const [report, setReport] = useState<any>(null);
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleViewEmergency = async () => {
    if (!emergencyId) {
      Alert.alert('Error', 'Please enter an emergency ID');
      return;
    }

    setLoading(true);
    try {
      const reportData = await getReport(parseInt(emergencyId));
      setReport(reportData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch emergency details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptCase = async () => {
    if (!emergencyId) {
      Alert.alert('Error', 'Please enter an emergency ID');
      return;
    }

    setLoading(true);
    try {
      const assignmentData = await createAssignment(parseInt(emergencyId));
      setAssignment(assignmentData);
      Alert.alert('Success', 'Case accepted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to accept case');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          Accept Case
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
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.viewButton, loading && styles.buttonDisabled]}
              onPress={handleViewEmergency}
              disabled={loading || !emergencyId}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                  View Emergency
                </ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.acceptButton, loading && styles.buttonDisabled]}
              onPress={handleAcceptCase}
              disabled={loading || !emergencyId}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                  Accept Case
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>
        </Card>

        {loading && !report && !assignment && (
          <SkeletonCard />
        )}

        {report && (
          <CaseSummaryCard
            alertId={report.id || ''}
            location={`${report.locationLat}, ${report.locationLng}`}
            emergencyType={report.type || ''}
            reporterNotes={report.description}
          />
        )}

        {assignment && (
          <Card>
            <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
              Assignment Created
            </ThemedText>
            <View style={styles.divider} />
            <View style={styles.resultItem}>
              <ThemedText style={[styles.resultLabel, { fontSize: getResponsiveFontSize(14) }]}>
                Assignment ID:
              </ThemedText>
              <ThemedText style={[styles.resultValue, { fontSize: getResponsiveFontSize(14) }]}>
                {assignment.id}
              </ThemedText>
            </View>
            <View style={styles.resultItem}>
              <ThemedText style={[styles.resultLabel, { fontSize: getResponsiveFontSize(14) }]}>
                ETA (minutes):
              </ThemedText>
              <ThemedText style={[styles.resultValue, styles.etaValue, { fontSize: getResponsiveFontSize(16) }]}>
                {assignment.etaMinutes}
              </ThemedText>
            </View>
          </Card>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  viewButton: {
    backgroundColor: '#1976D2',
  },
  acceptButton: {
    backgroundColor: '#43A047',
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
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultLabel: {
    fontWeight: '600',
    opacity: 0.7,
    flex: 1,
  },
  resultValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  etaValue: {
    color: '#43A047',
    fontWeight: '700',
  },
});
