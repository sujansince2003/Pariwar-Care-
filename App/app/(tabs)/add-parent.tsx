import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"

export default function AddParent() {
  const router = useRouter()

  // Parent details
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("Female")
  const [phone, setPhone] = useState("")
  const [relation, setRelation] = useState("Mother")

  // Address
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")

  // Emergency contact
  const [emergencyName, setEmergencyName] = useState("")
  const [emergencyPhone, setEmergencyPhone] = useState("")

  // Medical information
  const [bloodGroup, setBloodGroup] = useState("A+")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [currentMedications, setCurrentMedications] = useState("")
  const [allergies, setAllergies] = useState("")

  const handleSubmit = () => {
    if (!name || !age || !phone || !address) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    // TODO: Implement actual save functionality
    Alert.alert("Success", "Parent profile added successfully!", [
      { text: "OK", onPress: () => router.back() }
    ])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Parent Profile</Text>
        <Text style={styles.headerSubtitle}>Enter parent's information below</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Parent's Full Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Age"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Relation</Text>
            <View style={styles.buttonRow}>
              {["Mother", "Father", "Self"].map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setRelation(r)}
                  style={[
                    styles.selectBtn,
                    relation === r && styles.selectBtnActive,
                  ]}
                >
                  <Text
                    style={
                      relation === r
                        ? styles.selectTextActive
                        : styles.selectText
                    }
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.buttonRow}>
            {["Female", "Male", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setGender(g)}
                style={[
                  styles.selectBtn,
                  gender === g && styles.selectBtnActive,
                ]}
              >
                <Text
                  style={
                    gender === g ? styles.selectTextActive : styles.selectText
                  }
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+91 XXXXX XXXXX"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.sectionTitle}>Address Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Address *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={address}
            onChangeText={setAddress}
            multiline
            placeholder="House no., Street, Area"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="City"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              placeholder="Pincode"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Emergency Contact</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Name</Text>
          <TextInput
            style={styles.input}
            value={emergencyName}
            onChangeText={setEmergencyName}
            placeholder="Full name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Phone</Text>
          <TextInput
            style={styles.input}
            value={emergencyPhone}
            onChangeText={setEmergencyPhone}
            keyboardType="phone-pad"
            placeholder="+91 XXXXX XXXXX"
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.sectionTitle}>Medical Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.buttonRow}>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <TouchableOpacity
                key={bg}
                onPress={() => setBloodGroup(bg)}
                style={[
                  styles.bloodBtn,
                  bloodGroup === bg && styles.selectBtnActive,
                ]}
              >
                <Text
                  style={
                    bloodGroup === bg
                      ? styles.selectTextActive
                      : styles.selectText
                  }
                >
                  {bg}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medical History</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={medicalHistory}
            onChangeText={setMedicalHistory}
            multiline
            placeholder="e.g., Diabetes, Hypertension, etc."
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Medications</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={currentMedications}
            onChangeText={setCurrentMedications}
            multiline
            placeholder="List current medications and dosage"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={allergies}
            onChangeText={setAllergies}
            multiline
            placeholder="Any known allergies"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Parent Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginTop: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f7f8fb",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#111",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  selectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    backgroundColor: "#fff",
  },
  selectBtnActive: {
    backgroundColor: "#2f80ed",
    borderColor: "#2f80ed",
  },
  selectText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  selectTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  bloodBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    backgroundColor: "#fff",
    minWidth: 50,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#2f80ed",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#2f80ed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: "#e1e4e8",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
})
