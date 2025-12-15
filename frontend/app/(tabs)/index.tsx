// Home screen - Choose your role
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          Emergency Response System
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Choose your role to continue
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📱 Mobile User
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.mobileButton]}
              onPress={() => router.push('/report-emergency')}
            >
              <ThemedText style={styles.buttonText}>Report Emergency</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.mobileButton]}
              onPress={() => router.push('/view-assignment')}
            >
              <ThemedText style={styles.buttonText}>View Assignment</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.mobileButton]}
              onPress={() => router.push('/track-eta')}
            >
              <ThemedText style={styles.buttonText}>Track ETA</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🚑 Responder
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.responderButton]}
              onPress={() => router.push('/responder')}
            >
              <ThemedText style={styles.buttonText}>Responder Dashboard</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            👮 Dispatcher/Admin
          </ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.dispatcherButton]}
              onPress={() => router.push('/dispatcher')}
            >
              <ThemedText style={styles.buttonText}>Monitor Incidents</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  mobileButton: {
    backgroundColor: '#007AFF',
  },
  responderButton: {
    backgroundColor: '#FF9500',
  },
  dispatcherButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
