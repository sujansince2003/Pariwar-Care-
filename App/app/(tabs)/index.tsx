import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Link } from "expo-router"

export default function HomeTab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>ParentCare — Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Parent</Text>
        <Text style={styles.cardSubtitle}>Mrs. Anita Sharma, 78</Text>
        <Text style={styles.small}>Last reported: 2 hours ago</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Health Summary</Text>
        <View style={styles.row}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>HR</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>120/78</Text>
            <Text style={styles.statLabel}>BP</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>SpO2</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alerts</Text>
        <Text style={styles.alert}>• Missed medication reminder (today)</Text>
        <Text style={styles.alert}>• New report available</Text>
      </View>

      <View style={styles.actions}>
        <Link href="/add-parent" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Parent</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/parent/1" asChild>
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Parent Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.menu}>
        <Text style={styles.menuTitle}>Quick Links</Text>
        <Link href="/book-appointment" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Book Appointment</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/appointment-status" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Appointment Status</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/report-viewer" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text>View Latest Report</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/notifications" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Notifications</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Login / Sign Up (UI)</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  h1: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  card: {
    backgroundColor: "#f9f9fb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: "#333", marginBottom: 4 },
  small: { fontSize: 12, color: "#666" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  stat: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#666" },
  alert: { color: "#b02a37", marginBottom: 4 },
  actions: { flexDirection: "row", gap: 12, marginBottom: 12 },
  button: {
    backgroundColor: "#2f80ed",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#2f80ed",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonOutlineText: { color: "#2f80ed", fontWeight: "600" },
  menu: { marginTop: 8 },
  menuTitle: { fontSize: 14, fontWeight: "700", marginBottom: 8 },
  menuItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 8,
  },
})
