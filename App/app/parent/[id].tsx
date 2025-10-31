import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ParentProfile() {
  const params = useLocalSearchParams()
  const router = useRouter()
  const id = params.id || '1'

  // Hard-coded example data for parent id
  const parent = {
    id,
    name: 'Anita Sharma',
    age: 78,
    conditions: ['Hypertension', 'Arthritis'],
    lastVisit: '2025-10-15'
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}><Text>{'< Back'}</Text></TouchableOpacity>
      <Text style={styles.h1}>{parent.name}</Text>
      <Text style={styles.small}>Age: {parent.age}</Text>
      <Text style={styles.small}>Last Visit: {parent.lastVisit}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conditions</Text>
        {parent.conditions.map((c, i) => (
          <Text key={i} style={styles.listItem}>• {c}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>History</Text>
        <Text style={styles.listItem}>2025-10-15 — Routine checkup, stable.</Text>
        <Text style={styles.listItem}>2025-09-01 — Medication adjustment.</Text>
      </View>

      <TouchableOpacity style={styles.primary}><Text style={styles.primaryText}>View Reports</Text></TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  back: { marginBottom: 8 },
  h1: { fontSize: 22, fontWeight: '700' },
  small: { color: '#666', marginTop: 4 },
  card: { backgroundColor: '#f7f8fb', padding: 12, borderRadius: 8, marginTop: 12 },
  cardTitle: { fontWeight: '700', marginBottom: 8 },
  listItem: { marginBottom: 6 },
  primary: { backgroundColor: '#2f80ed', padding: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '600' }
})
