// Mobile User: Track ETA screen - Card-based layout
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
import { ETAStatusCard } from '@/components/cards/eta-status-card';
import { ResponderDetailsCard } from '@/components/cards/responder-details-card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAssignmentByEmergency, assignResponder } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function TrackETAScreen() {
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [emergencyId, setEmergencyId] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrackETA = async () => {
    if (!emergencyId) {
      Alert.alert('Error', 'Please enter an emergency ID');
      return;
    }

    setLoading(true);
    try {
      // First try to get assignment
      try {
        const assignment = await getAssignmentByEmergency(parseInt(emergencyId));
        if (assignment && assignment.etaMinutes) {
          setResponse({
            etaMinutes: assignment.etaMinutes,
            type: 'assignment',
          });
        }
      } catch (error) {
        // If no assignment, try to assign a responder
        const responseData = await assignResponder(parseInt(emergencyId));
        setResponse({
          ...responseData,
          type: 'response',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to track ETA');
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
          Track ETA
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
            onPress={handleTrackETA}
            disabled={loading || !emergencyId}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                Track ETA
              </ThemedText>
            )}
          </TouchableOpacity>
        </Card>

        {loading && !response && <SkeletonCard />}

        {response && (
          <>
            <ETAStatusCard
              etaMinutes={response.etaMinutes !== undefined ? response.etaMinutes : null}
              responderStatus={response.type === 'response' ? 'Assigned' : 'En Route'}
            />
            {response.type === 'response' && response.responderName && (
              <ResponderDetailsCard
                name={response.responderName}
                vehicleType={response.responderRole}
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
    backgroundColor: '#43A047',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#43A047',
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
});
