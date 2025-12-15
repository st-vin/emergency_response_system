// Dispatcher/Admin: Monitor Incidents screen - Card-based layout
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/card';
import { CaseSummaryCard } from '@/components/cards/case-summary-card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllResponders, getReportsByReporter } from '@/services/api';
import { getResponsivePadding, getResponsiveFontSize } from '@/utils/responsive';
import { SkeletonCard } from '@/components/cards/skeleton-card';

export default function DispatcherScreen() {
  const insets = useSafeAreaInsets();
  const padding = getResponsivePadding();
  const [responders, setResponders] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reporterId, setReporterId] = useState('');

  const loadResponders = async () => {
    try {
      const data = await getAllResponders();
      setResponders(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load responders');
      console.error(error);
    }
  };

  const loadReports = async (id: string) => {
    if (!id) {
      Alert.alert('Error', 'Please enter a reporter ID');
      return;
    }
    setLoading(true);
    try {
      const data = await getReportsByReporter(id);
      setReports(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadResponders();
    setRefreshing(false);
  };

  useEffect(() => {
    loadResponders();
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={[styles.title, { fontSize: getResponsiveFontSize(20) }]}>
          Monitor Incidents
        </ThemedText>

        <Card>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { fontSize: getResponsiveFontSize(16) }]}>
              All Responders
            </ThemedText>
            <View style={styles.badge}>
              <ThemedText style={[styles.badgeText, { fontSize: getResponsiveFontSize(14) }]}>
                {responders.length}
              </ThemedText>
            </View>
          </View>
          {responders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <ThemedText style={[styles.emptyText, { fontSize: getResponsiveFontSize(14) }]}>
                No responders found
              </ThemedText>
            </View>
          ) : (
            <View style={styles.cardsContainer}>
              {responders.map((responder) => (
                <Card key={responder.id}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <View style={styles.avatar}>
                        <ThemedText style={styles.avatarText}>
                          {responder.name?.charAt(0)?.toUpperCase() || 'R'}
                        </ThemedText>
                      </View>
                      <View style={styles.cardHeaderText}>
                        <ThemedText style={[styles.cardName, { fontSize: getResponsiveFontSize(14) }]}>
                          {responder.name}
                        </ThemedText>
                        <ThemedText style={[styles.cardRole, { fontSize: getResponsiveFontSize(14) }]}>
                          {responder.role}
                        </ThemedText>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        responder.availability ? styles.statusAvailable : styles.statusUnavailable,
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.statusText,
                          { fontSize: getResponsiveFontSize(12) },
                          responder.availability ? styles.statusTextAvailable : styles.statusTextUnavailable,
                        ]}
                      >
                        {responder.availability ? 'Available' : 'Unavailable'}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.cardDivider} />
                  <View style={styles.cardRow}>
                    <ThemedText style={[styles.cardLabel, { fontSize: getResponsiveFontSize(14) }]}>
                      ID:
                    </ThemedText>
                    <ThemedText style={[styles.cardValue, { fontSize: getResponsiveFontSize(14) }]}>
                      {responder.id}
                    </ThemedText>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </Card>

        <Card>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { fontSize: getResponsiveFontSize(16) }]}>
            View Reports by Reporter
          </ThemedText>
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.searchInput, { fontSize: getResponsiveFontSize(14) }]}
              placeholder="Enter Reporter ID"
              value={reporterId}
              onChangeText={setReporterId}
              keyboardType="numeric"
              editable={!loading}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled, !reporterId && styles.buttonDisabled]}
              onPress={() => loadReports(reporterId)}
              disabled={loading || !reporterId}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ThemedText style={[styles.buttonText, { fontSize: getResponsiveFontSize(14) }]}>
                  Load Reports
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>

          {loading && reports.length === 0 && <SkeletonCard />}

          {reports.length > 0 && (
            <View style={styles.reportsContainer}>
              <View style={styles.sectionHeader}>
                <ThemedText style={[styles.sectionTitle, { fontSize: getResponsiveFontSize(16) }]}>
                  Reports
                </ThemedText>
                <View style={styles.badge}>
                  <ThemedText style={[styles.badgeText, { fontSize: getResponsiveFontSize(14) }]}>
                    {reports.length}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.cardsContainer}>
                {reports.map((report) => (
                  <CaseSummaryCard
                    key={report.id}
                    alertId={report.id || ''}
                    location={`${report.locationLat}, ${report.locationLng}`}
                    emergencyType={report.type || ''}
                    reporterNotes={report.description}
                  />
                ))}
              </View>
            </View>
          )}
        </Card>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.6,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 12,
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  cardRole: {
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAvailable: {
    backgroundColor: '#E8F5E9',
  },
  statusUnavailable: {
    backgroundColor: '#FFEBEE',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontWeight: '600',
  },
  statusTextAvailable: {
    color: '#34C759',
  },
  statusTextUnavailable: {
    color: '#FF3B30',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontWeight: '600',
    opacity: 0.7,
  },
  cardValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  searchContainer: {
    gap: 12,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
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
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  reportsContainer: {
    marginTop: 16,
  },
});
