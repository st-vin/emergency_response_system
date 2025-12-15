// Responder: Main screen with Accept Case and Update Status options
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';

export default function ResponderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();

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
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ThemedText style={styles.iconText}>🚑</ThemedText>
          </View>
          <ThemedText type="title" style={[styles.title, { fontSize: getResponsiveFontSize(32) }]}>
            Responder Dashboard
          </ThemedText>
          <ThemedText style={[styles.subtitle, { fontSize: getResponsiveFontSize(16) }]}>
            Manage your emergency response activities
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/accept-case')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonIcon}>
              <ThemedText style={styles.buttonIconText}>✓</ThemedText>
            </View>
            <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(18) }]}>
              Accept Case
            </ThemedText>
            <ThemedText style={[styles.buttonSubtext, { fontSize: getResponsiveFontSize(14) }]}>
              Accept and view emergency cases
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.push('/update-status')}
            activeOpacity={0.8}
          >
            <View style={[styles.buttonIcon, styles.buttonIconSecondary]}>
              <ThemedText style={styles.buttonIconText}>📍</ThemedText>
            </View>
            <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(18) }]}>
              Update Status
            </ThemedText>
            <ThemedText style={[styles.buttonSubtext, { fontSize: getResponsiveFontSize(14) }]}>
              Update your location and availability
            </ThemedText>
          </TouchableOpacity>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#FF9500',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#FF9500',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonSecondary: {
    backgroundColor: '#5856D6',
    ...Platform.select({
      ios: {
        shadowColor: '#5856D6',
      },
    }),
  },
  buttonIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonIconSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonIconText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  buttonSubtext: {
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 20,
  },
});
