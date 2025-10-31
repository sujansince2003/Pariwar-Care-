import React from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'

export default function AddParent() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Add Parent</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput style={styles.input} placeholder="e.g. Anita Sharma" />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} placeholder="78" keyboardType="numeric" />

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} placeholder="Street, City" />

      <Text style={styles.label}>Known conditions</Text>
      <TextInput style={styles.input} placeholder="Hypertension, Diabetes" />

      <TouchableOpacity style={styles.primary}>
        <Text style={styles.primaryText}>Save (UI only)</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  h1: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 12, color: '#666', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginTop: 6 },
  primary: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, marginTop: 18, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '600' }
})
