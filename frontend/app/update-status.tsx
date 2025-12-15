// Responder: Update Status screen - Card-based layout
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
import { StatusStepperCard, StatusType } from '@/components/cards/status-stepper-card';
import { LocationPickerCard } from '@/components/cards/location-picker-card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateResponderLocation, getResponder } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function UpdateStatusScreen() {
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [responderId, setResponderId] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [responder, setResponder] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<StatusType | undefined>();
  const [loading, setLoading] = useState(false);

  const handleViewResponder = async () => {
    if (!responderId) {
      Alert.alert('Error', 'Please enter a responder ID');
      return;
    }

    setLoading(true);
    try {
      const responderData = await getResponder(parseInt(responderId));
      setResponder(responderData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch responder details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = async () => {
    if (!responderId || !locationLat || !locationLng) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const updatedResponder = await updateResponderLocation(
        parseInt(responderId),
        parseFloat(locationLat),
        parseFloat(locationLng)
      );
      setResponder(updatedResponder);
      Alert.alert('Success', 'Location updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update location');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (status: StatusType) => {
    setCurrentStatus(status);
    // TODO: Implement status update API call
    Alert.alert('Status Updated', `Status changed to: ${status}`);
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
          Update Status
        </ThemedText>

        <Card>
          <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
            Responder ID
          </ThemedText>
          <TextInput
            style={[styles.input, { fontSize: getResponsiveFontSize(14) }]}
            placeholder="Enter your responder ID"
            value={responderId}
            onChangeText={setResponderId}
            keyboardType="numeric"
            editable={!loading}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.button, styles.viewButton, loading && styles.buttonDisabled]}
            onPress={handleViewResponder}
            disabled={loading || !responderId}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                View My Info
              </ThemedText>
            )}
          </TouchableOpacity>
        </Card>

        {loading && !responder && <SkeletonCard />}

        {responder && (
          <>
            <Card>
              <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
                Responder Information
              </ThemedText>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Name:</ThemedText>
                <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>
                  {responder.name}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>Role:</ThemedText>
                <ThemedText style={[styles.value, { fontSize: getResponsiveFontSize(14) }]}>
                  {responder.role}
                </ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={[styles.label, { fontSize: getResponsiveFontSize(14) }]}>
                  Availability:
                </ThemedText>
                <ThemedText
                  style={[
                    styles.value,
                    { fontSize: getResponsiveFontSize(14) },
                    responder.availability ? styles.available : styles.unavailable,
                  ]}
                >
                  {responder.availability ? 'Available' : 'Unavailable'}
                </ThemedText>
              </View>
            </Card>

            <StatusStepperCard
              currentStatus={currentStatus}
              onStatusChange={handleStatusChange}
              disabled={loading}
            />

            <LocationPickerCard
              locationLat={locationLat}
              locationLng={locationLng}
              onLocationChange={(lat, lng) => {
                setLocationLat(lat);
                setLocationLng(lng);
              }}
              disabled={loading}
            />

            <TouchableOpacity
              style={[styles.button, styles.updateButton, loading && styles.buttonDisabled]}
              onPress={handleUpdateLocation}
              disabled={loading || !locationLat || !locationLng}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                  Update Location
                </ThemedText>
              )}
            </TouchableOpacity>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
    width: '100%',
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
  updateButton: {
    backgroundColor: '#D32F2F',
    maxWidth: 420,
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
  available: {
    color: '#43A047',
    fontWeight: '700',
  },
  unavailable: {
    color: '#D32F2F',
    fontWeight: '700',
  },
});
