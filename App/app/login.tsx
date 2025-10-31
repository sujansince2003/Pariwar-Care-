import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome back</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="you@example.com" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity style={styles.primary}>
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Skip (UI only)</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  h1: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 12, color: '#666', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 10, borderRadius: 8, marginTop: 6 },
  primary: { backgroundColor: '#2f80ed', padding: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '600' },
  linkButton: { marginTop: 12, alignItems: 'center' },
  linkText: { color: '#2f80ed' }
})
