import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function BookAppointment() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Book Appointment</Text>
      <Text style={styles.small}>Pick a date and time (UI only)</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Type</Text>
        <Text>• In-person</Text>
        <Text>• Teleconsult</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Suggested slots</Text>
        <TouchableOpacity style={styles.slot}><Text>Mon, 03 Nov — 10:00 AM</Text></TouchableOpacity>
        <TouchableOpacity style={styles.slot}><Text>Tue, 04 Nov — 02:00 PM</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primary}><Text style={styles.primaryText}>Confirm (UI only)</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  h1: { fontSize: 20, fontWeight: '700' },
  small: { color: '#666', marginBottom: 12 },
  card: { backgroundColor: '#f7f8fb', padding: 12, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontWeight: '700', marginBottom: 8 },
  slot: { padding: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', marginBottom: 8 },
  primary: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '600' }
})
