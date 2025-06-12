import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";

// Sample dropdown data
const countries = [
  { label: "Select Country", value: "" },
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "UK" },
  { label: "Australia", value: "AU" },
];

const states = [
  { label: "Select State", value: "" },
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
];

// Zod schemas
const phoneSchema = z
  .string()
  .regex(/^\+?\d{10,15}$/, "Phone number must be 10-15 digits");

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: phoneSchema,
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
});

export default function ComplexForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    address: "",
    city: "",
    zipCode: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (text: string) => {
    // Clean phone input - only digits and + at start
    const cleaned = text.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
    updateField("phone", cleaned);
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form is valid!", formData);
      // Handle form submission
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Registration Form</Text>

        {/* Name Fields */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="John"
              value={formData.firstName}
              onChangeText={(text) => updateField("firstName", text)}
              returnKeyType="next"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Doe"
              value={formData.lastName}
              onChangeText={(text) => updateField("lastName", text)}
              returnKeyType="next"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="john@example.com"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Phone - Your main input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="+1234567890"
            value={formData.phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={16}
            returnKeyType="next"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        {/* Country Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <View
            style={[
              styles.pickerContainer,
              errors.country && styles.inputError,
            ]}
          >
            <Picker
              selectedValue={formData.country}
              onValueChange={(value) => updateField("country", value)}
              style={styles.picker}
            >
              {countries.map((country) => (
                <Picker.Item
                  key={country.value}
                  label={country.label}
                  value={country.value}
                  color={country.value === "" ? "#999" : "#333"}
                />
              ))}
            </Picker>
          </View>
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}
        </View>

        {/* State Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <View
            style={[styles.pickerContainer, errors.state && styles.inputError]}
          >
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => updateField("state", value)}
              style={styles.picker}
              enabled={!!formData.country} // Only enable if country is selected
            >
              {states.map((state) => (
                <Picker.Item
                  key={state.value}
                  label={state.label}
                  value={state.value}
                  color={state.value === "" ? "#999" : "#333"}
                />
              ))}
            </Picker>
          </View>
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
          {!formData.country && (
            <Text style={styles.helperText}>Please select a country first</Text>
          )}
        </View>

        {/* Address */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="123 Main Street"
            value={formData.address}
            onChangeText={(text) => updateField("address", text)}
            returnKeyType="next"
          />
        </View>

        {/* City & ZIP */}
        <View style={styles.row}>
          <View style={styles.expandedField}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="New York"
              value={formData.city}
              onChangeText={(text) => updateField("city", text)}
              returnKeyType="next"
            />
          </View>

          <View style={styles.zipField}>
            <Text style={styles.label}>ZIP</Text>
            <TextInput
              style={styles.input}
              placeholder="10001"
              value={formData.zipCode}
              onChangeText={(text) => updateField("zipCode", text)}
              keyboardType="number-pad"
              maxLength={5}
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Bio */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChangeText={(text) => updateField("bio", text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            returnKeyType="done"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 15,
  },
  halfField: {
    flex: 1,
  },
  expandedField: {
    flex: 2,
  },
  zipField: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
    fontStyle: "italic",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
