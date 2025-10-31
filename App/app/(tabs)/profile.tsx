import React from "react"
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProfileScreen() {
  const parent = {
    name: "Anita Sharma",
    age: 78,
    relation: "Mother",
    phone: "+91 98765 43210",
    address: "12 MG Road, Pune",
    emergency: { name: "Ravi Sharma", phone: "+91 91234 56789" },
    meds: [
      "Amlodipine 5mg - daily",
      "Metformin 500mg - twice daily",
      "Amlodipine 5mg - daily",
      "Metformin 500mg - twice daily",
    ],
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centerBlock}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg",
            }}
            style={styles.avatarLarge}
          />
          <Text style={styles.name}>{parent.name}</Text>
          <Text style={styles.sub}>
            {parent.age} • {parent.relation}
          </Text>
          <Text style={styles.phone}>{parent.phone}</Text>
        </View>

        <View style={styles.rowCards}>
          <View style={styles.cardWide}>
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.cardText}>{parent.address}</Text>
          </View>

          <View style={styles.cardWide}>
            <Text style={styles.cardTitle}>Emergency Contact</Text>
            <Text style={styles.cardText}>{parent.emergency.name}</Text>
            <Text style={styles.small}>{parent.emergency.phone}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Medications</Text>
          {parent.meds.map((m, i) => (
            <Text key={i} style={styles.listItem}>
              • {m}
            </Text>
          ))}
        </View>

      
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  centerBlock: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 16,
    color: "#111",
  },
  sub: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
  },
  phone: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
    fontWeight: "600",
  },
  rowCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  cardWide: {
    flex: 1,
    backgroundColor: "#f7f8fb",
    padding: 16,
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#f7f8fb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },
  cardText: {
    fontSize: 15,
    color: "#222",
    lineHeight: 20,
  },
  listItem: {
    fontSize: 15,
    marginBottom: 8,
    color: "#222",
    lineHeight: 22,
  },
  small: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actionsCenter: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: 12,
  },
  button: {
    backgroundColor: "#2f80ed",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#2f80ed",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 150,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#2f80ed",
    fontWeight: "700",
    fontSize: 15,
  },
})
