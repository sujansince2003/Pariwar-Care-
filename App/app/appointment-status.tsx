import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

const sample = [
  { id: 'a1', type: 'General', date: '2025-11-03', status: 'Pending' },
  { id: 'a2', type: 'Cardiology', date: '2025-11-05', status: 'Assigned' },
  { id: 'a3', type: 'Physio', date: '2025-10-28', status: 'Completed' }
]

export default function AppointmentStatus() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Appointment Status</Text>
      <FlatList data={sample} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={styles.row}>
          <View>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.small}>{item.date}</Text>
          </View>
          <Text style={[styles.badge, item.status==='Completed'?styles.green:item.status==='Assigned'?styles.orange:styles.gray]}>{item.status}</Text>
        </View>
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  h1: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 8, backgroundColor: '#f7f8fb', marginBottom: 8 },
  type: { fontWeight: '600' },
  small: { color: '#666' },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, color: '#fff', fontWeight: '700' },
  green: { backgroundColor: '#27ae60' },
  orange: { backgroundColor: '#f2994a' },
  gray: { backgroundColor: '#7f8c8d' }
})
