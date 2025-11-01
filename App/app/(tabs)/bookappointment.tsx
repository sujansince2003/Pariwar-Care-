import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import MapView from "react-native-maps"
import axios from "axios"
import { env } from "@/utils/env"
import { storage } from "@/utils/storage"
import { useRouter } from "expo-router"

// Interface for Parent data from API
interface Parent {
  id: string
  name: string
  age: number
  gender: string
  address: string
  diseases: string
  medications: string
  emergencyContact: string
}

export default function BookAppointment() {
  const router = useRouter()

  // State for parents data
  const [parents, setParents] = useState<Parent[]>([])
  const [loadingParents, setLoadingParents] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [repeatSchedule, setRepeatSchedule] = useState("one-time")
  const [location, setLocation] = useState("Lalitpur, Ward-5, near Sunrise Apartments")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [nurseGenderPref, setNurseGenderPref] = useState("any")
  const [promoCode, setPromoCode] = useState("")

  const services = [
    { id: "checkup", name: "Regular Health Checkup", icon: "medkit-outline", price: "रू 500" },
    { id: "diagnostic", name: "Diagnostic Test", icon: "flask-outline", price: "रू 800" },
    { id: "physio", name: "Physiotherapy Session", icon: "fitness-outline", price: "रू 1200" },
    { id: "post-surgery", name: "Post-Surgery Care", icon: "bandage-outline", price: "रू 1500" },
    { id: "chronic", name: "Chronic Care", icon: "pulse-outline", price: "रू 600" },
    { id: "custom", name: "Custom / Other", icon: "add-circle-outline", price: "Contact" },
  ]

  const timeSlots = ["9-11 AM", "11-1 PM", "1-3 PM", "3-5 PM", "5-7 PM"]
  const repeatOptions = [
    { value: "one-time", label: "One-time" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]

  // Fetch parents from API
  const getParents = async () => {
    setLoadingParents(true)
    try {
      // Get the auth token
      const token = await storage.getAuthToken()

      if (!token) {
        Alert.alert("Error", "You must be logged in to book an appointment. Please login first.")
        router.replace("/auth/login")
        return
      }

      // Fetch parents with Authorization header
      const response = await axios.get(`${env.baseUrl}api/parents`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("Parents Response:", response.data)

      // Map the API response to parents state
      if (response.data.success && response.data.data.parents) {
        setParents(response.data.data.parents)
      }
    } catch (error: any) {
      console.error("Error while getting parents:", error)
      const errorMessage = error.response?.data?.message || "Failed to fetch parents. Please try again."
      Alert.alert("Error", errorMessage)
    } finally {
      setLoadingParents(false)
    }
  }
    
    
  const BookAppoinment = async ({
    parentId,
    scheduledFor,
  }: {
    parentId: string
    scheduledFor: string
  }) => {
    try {
      // Get the auth token
      const token = await storage.getAuthToken()

      if (!token) {
        Alert.alert(
          "Error",
          "You must be logged in to book an appointment. Please login first."
        )
        router.replace("/auth/login")
        return false
      }

      // Make API request
      const response = await axios.post(
        `${env.baseUrl}api/visits`,
        {
          parentId,
          scheduledFor,
          visitType: "FULL",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("Book Appointment Response:", response.data)

      // Show success message
      const selectedParent = parents.find((p) => p.id === parentId)
      Alert.alert(
        "Appointment Confirmed! ✅",
        `Appointment booked successfully!\n\nPatient: ${selectedParent?.name}\nDate: ${appointmentDate}\nTime: ${timeSlot}\n\nA nurse will be assigned shortly.`,
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate back or to appointments list
              router.back()
            },
          },
        ]
      )

      return true
    } catch (error: any) {
      console.error("Error while creating book appointment:", error)
      const errorMessage =
        error.response?.data?.message ||
        "Failed to book appointment. Please try again."
      Alert.alert("Error", errorMessage)
      return false
    }
  }

  // Fetch parents on component mount
  useEffect(() => {
    getParents()
  }, [])

  // Format date and time for API
  const formatScheduledFor = (date: string, time: string): string => {
    // Convert date from YYYY-MM-DD and time slot to ISO format
    // Example: "2024-01-15" + "9-11 AM" -> "2024-01-15T09:00:00.000Z"

    // Extract start hour from time slot (e.g., "9-11 AM" -> "9")
    const timeMatch = time.match(/^(\d+)/)
    if (!timeMatch) return new Date().toISOString()

    const hour = parseInt(timeMatch[1])
    const isPM = time.includes("PM")
    const hour24 = isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour

    // Create date object
    const dateTime = new Date(date)
    dateTime.setHours(hour24, 0, 0, 0)

    return dateTime.toISOString()
  }

  // Handle form submission
    const handleSubmit = async () => {
      
        console.log("Book appoinment button clicked ")
    // Validation
    if (!selectedPatient) {
      Alert.alert("Missing Information", "Please select a patient")
      return
    }

    if (!selectedService) {
      Alert.alert("Missing Information", "Please select a service type")
      return
    }

    if (!appointmentDate) {
      Alert.alert("Missing Information", "Please select an appointment date")
      return
    }

    if (!timeSlot) {
      Alert.alert("Missing Information", "Please select a time slot")
      return
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(appointmentDate)) {
      Alert.alert(
        "Invalid Date",
        "Please enter date in YYYY-MM-DD format (e.g., 2024-01-15)"
      )
      return
    }

    // Validate date is not in the past
    const selectedDate = new Date(appointmentDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      Alert.alert("Invalid Date", "Please select a future date")
      return
    }

    setLoading(true)
    try {
      // Format the scheduled date/time for API
      const scheduledFor = formatScheduledFor(appointmentDate, timeSlot)
console.log("working on booking data")
      // Call BookAppointment (success message and navigation handled inside)
    const data =   await BookAppoinment({
        parentId: selectedPatient,
        scheduledFor: scheduledFor,
    })
        console.log("Appointment Booking Data:", data)
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      Alert.alert("Error", "An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <Text style={styles.headerSubtitle}>
          Schedule a home visit for your parents
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Select Patient */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select Patient</Text>

          {loadingParents ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2f80ed" />
              <Text style={styles.loadingText}>Loading parents...</Text>
            </View>
          ) : parents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color="#999" />
              <Text style={styles.emptyText}>No parents added yet</Text>
              <Text style={styles.emptySubtext}>
                Please add a parent profile first
              </Text>
              <TouchableOpacity
                style={styles.addParentBtn}
                onPress={() => router.push("/(tabs)/add-parent")}
              >
                <Text style={styles.addParentBtnText}>Add Parent</Text>
              </TouchableOpacity>
            </View>
          ) : (
            parents.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                style={[
                  styles.patientCard,
                  selectedPatient === patient.id && styles.patientCardActive,
                ]}
                onPress={() => setSelectedPatient(patient.id)}
              >
                <View style={styles.patientInfo}>
                  <Ionicons
                    name={patient.gender === "Female" ? "woman" : "man"}
                    size={24}
                    color={selectedPatient === patient.id ? "#2f80ed" : "#666"}
                  />
                  <View style={styles.patientDetails}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientAge}>
                      {patient.age} yrs • {patient.gender}
                    </Text>
                  </View>
                </View>
                {selectedPatient === patient.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#2f80ed" />
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* 2. Service Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Service Type</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedService === service.id && styles.serviceCardActive,
                ]}
                onPress={() => setSelectedService(service.id)}
              >
                <Ionicons
                  name={service.icon as any}
                  size={28}
                  color={selectedService === service.id ? "#2f80ed" : "#666"}
                />
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. Appointment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Appointment Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Date *</Text>
            <TextInput
              style={styles.input}
              value={appointmentDate}
              onChangeText={setAppointmentDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Time Slot *</Text>
            <View style={styles.timeSlotContainer}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlotBtn,
                    timeSlot === slot && styles.timeSlotBtnActive,
                  ]}
                  onPress={() => setTimeSlot(slot)}
                >
                  <Text
                    style={
                      timeSlot === slot
                        ? styles.timeSlotTextActive
                        : styles.timeSlotText
                    }
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Repeat Schedule</Text>
            <View style={styles.repeatContainer}>
              {repeatOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.repeatBtn,
                    repeatSchedule === option.value && styles.repeatBtnActive,
                  ]}
                  onPress={() => setRepeatSchedule(option.value)}
                >
                  <Text
                    style={
                      repeatSchedule === option.value
                        ? styles.repeatTextActive
                        : styles.repeatText
                    }
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* 4. Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Location</Text>

          <MapView style={styles.map} />

          <View style={styles.locationCard}>
            <Ionicons name="location" size={20} color="#2f80ed" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <TouchableOpacity style={styles.editLocationBtn}>
            <Ionicons name="map-outline" size={16} color="#2f80ed" />
            <Text style={styles.editLocationText}>Edit on Map</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Special Instructions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="E.g., Parent has mobility issues, Call 10 mins before arrival"
            placeholderTextColor="#999"
            multiline
          />
        </View>

        {/* 6. Nurse Preference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. Nurse Preference (Optional)
          </Text>
          <View style={styles.nursePreference}>
            {[
              { value: "any", label: "Any" },
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
            ].map((pref) => (
              <TouchableOpacity
                key={pref.value}
                style={[
                  styles.nursePrefBtn,
                  nurseGenderPref === pref.value && styles.nursePrefBtnActive,
                ]}
                onPress={() => setNurseGenderPref(pref.value)}
              >
                <Text
                  style={
                    nurseGenderPref === pref.value
                      ? styles.nursePrefTextActive
                      : styles.nursePrefText
                  }
                >
                  {pref.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 7. Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Payment Summary</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Service Charge:</Text>
              <Text style={styles.paymentValue}>रू 800</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Travel Fee:</Text>
              <Text style={styles.paymentValue}>रू 150</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Discount:</Text>
              <Text style={[styles.paymentValue, { color: "#4caf50" }]}>
                - रू 100
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentRow}>
              <Text style={styles.paymentTotal}>Total:</Text>
              <Text style={styles.paymentTotal}>रू 850</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Promo Code</Text>
            <View style={styles.promoContainer}>
              <TextInput
                style={[styles.input, styles.promoInput]}
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="Enter code"
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paymentMethods}>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.paymentMethodsRow}>
              <TouchableOpacity style={styles.paymentMethodBtn}>
                <Text style={styles.paymentMethodText}>eSewa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentMethodBtn}>
                <Text style={styles.paymentMethodText}>Khalti</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentMethodBtn}>
                <Text style={styles.paymentMethodText}>Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 8. Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Booking Appointment..." : "Confirm Appointment"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  // Patient Selection
  loadingContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  addParentBtn: {
    marginTop: 20,
    backgroundColor: "#2f80ed",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  addParentBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e1e4e8",
  },
  patientCardActive: {
    borderColor: "#2f80ed",
    backgroundColor: "#f0f7ff",
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientDetails: {
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  patientAge: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  // Service Cards
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e1e4e8",
  },
  serviceCardActive: {
    borderColor: "#2f80ed",
    backgroundColor: "#f0f7ff",
  },
  serviceName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 8,
  },
  servicePrice: {
    fontSize: 12,
    color: "#2f80ed",
    fontWeight: "700",
    marginTop: 4,
  },
  // Form Inputs
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#111",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  // Time Slots
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeSlotBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  timeSlotBtnActive: {
    backgroundColor: "#2f80ed",
    borderColor: "#2f80ed",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  timeSlotTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  // Repeat Schedule
  repeatContainer: {
    flexDirection: "row",
    gap: 8,
  },
  repeatBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    alignItems: "center",
  },
  repeatBtnActive: {
    backgroundColor: "#2f80ed",
    borderColor: "#2f80ed",
  },
  repeatText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  repeatTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  // Location
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  editLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  editLocationText: {
    fontSize: 14,
    color: "#2f80ed",
    fontWeight: "600",
    marginLeft: 6,
  },
  // Nurse Preference
  nursePreference: {
    flexDirection: "row",
    gap: 8,
  },
  nursePrefBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    alignItems: "center",
  },
  nursePrefBtnActive: {
    backgroundColor: "#2f80ed",
    borderColor: "#2f80ed",
  },
  nursePrefText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  nursePrefTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  // Payment
  paymentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 15,
    color: "#666",
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e4e8",
    marginVertical: 10,
  },
  paymentTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  promoContainer: {
    flexDirection: "row",
    gap: 8,
  },
  promoInput: {
    flex: 1,
  },
  applyBtn: {
    backgroundColor: "#2f80ed",
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  paymentMethods: {
    marginTop: 16,
  },
  paymentMethodsRow: {
    flexDirection: "row",
    gap: 8,
  },
  paymentMethodBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    alignItems: "center",
  },
  paymentMethodText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  // Submit Button
  submitButton: {
    backgroundColor: "#2f80ed",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#2f80ed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: "#a0c4f0",
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  map: {
    width: "100%",
    height: 150,
  },
})