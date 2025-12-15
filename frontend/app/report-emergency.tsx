// Mobile User: Report Emergency screen - Card-based layout
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
import { LocationPickerCard } from '@/components/cards/location-picker-card';
import { EmergencyTypeGridCard, EmergencyType } from '@/components/cards/emergency-type-grid-card';
import { ErrorCard } from '@/components/error-card';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createEmergencyReport } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function ReportEmergencyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [type, setType] = useState<EmergencyType | ''>('');
  const [description, setDescription] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [reporterId, setReporterId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCurrentLocation = () => {
    // TODO: Implement GPS location fetching
    Alert.alert('Info', 'GPS location feature will be implemented');
  };

  const handleLocationChange = (lat: string, lng: string) => {
    setLocationLat(lat);
    setLocationLng(lng);
  };

  const handleSubmit = async () => {
    if (!type || !description || !locationLat || !locationLng || !reporterId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createEmergencyReport({
        type,
        description,
        locationLat: parseFloat(locationLat),
        locationLng: parseFloat(locationLng),
        reporterId,
      });
      Alert.alert('Success', 'Emergency report created successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      setError('Failed to create emergency report. Please check your connection and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit();
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
          Report Emergency
        </ThemedText>

        {error && <ErrorCard message={error} onRetry={handleRetry} />}

        {loading ? (
          <View style={styles.loadingContainer}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          <>
            <EmergencyTypeGridCard
              selectedType={type}
              onTypeSelect={setType}
              disabled={loading}
            />

            <Card>
              <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
                Description
              </ThemedText>
              <TextInput
                style={[styles.textArea, { fontSize: getResponsiveFontSize(14) }]}
                placeholder="Describe the emergency..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                editable={!loading}
                placeholderTextColor="#999"
              />
            </Card>

            <LocationPickerCard
              locationLat={locationLat}
              locationLng={locationLng}
              onLocationChange={handleLocationChange}
              onGetCurrentLocation={handleGetCurrentLocation}
              disabled={loading}
            />

            <Card>
              <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: getResponsiveFontSize(16) }]}>
                Reporter ID
              </ThemedText>
              <TextInput
                style={[styles.input, { fontSize: getResponsiveFontSize(14) }]}
                placeholder="Your reporter ID"
                value={reporterId}
                onChangeText={setReporterId}
                editable={!loading}
                placeholderTextColor="#999"
              />
            </Card>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={[styles.submitButtonText, { fontSize: getResponsiveFontSize(14) }]}>
                  Submit Report
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
  loadingContainer: {
    width: '100%',
    maxWidth: 420,
    gap: 12,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
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
  submitButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
    minHeight: 52,
    width: '100%',
    maxWidth: 420,
    ...Platform.select({
      ios: {
        shadowColor: '#D32F2F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
