import { Colors } from "@/shared/colors/Colors";
import { Ionicons } from "@expo/vector-icons"; // 👈 icon
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string | null>(null);

  // Credentials
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Pet Info
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const speciesList = ["Dog", "Cat", "Bird"];
  const breedList = ["Labrador", "Bulldog", "Persian", "Siamese"];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // handle signup success → navigate to home
      console.log("Signup Success", { userType, fullName, petName });
      router.replace("/pet-owner/(tabs)/home");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back(); // go back to prev screen
    }
  };

  const StepIndicator = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {[1, 2, 3].map((s) => (
        <View
          key={s}
          style={{
            width: step === s ? 43 : 7,
            height: 7,
            borderRadius: 10,
            marginHorizontal: 5,
            backgroundColor: step === s ? Colors.primary : "#ccc",
          }}
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 👈 Visible Back Icon */}
      <TouchableOpacity onPress={handleBack} style={{ marginBottom: 10 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <StepIndicator />

      {step === 1 && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
            Select User Type
          </Text>
          {["Pet Owner", "Veterinarian", "Groomer"].map((type) => (
            <TouchableOpacity
              key={type}
              style={{
                padding: 15,
                backgroundColor: userType === type ? Colors.primary : "#eee",
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                setUserType(type);
                if (type === "Pet Owner") {
                  setStep(2);
                } else {
                  console.log(type, "signup complete");
                  router.replace("/pet-owner/(tabs)/home");
                }
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: userType === type ? "#fff" : "#000",
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 2 && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
            Enter Your Credentials
          </Text>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
            Add Pet Information
          </Text>
          <TextInput
            placeholder="Pet Name"
            value={petName}
            onChangeText={setPetName}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setSpecies(species === "" ? speciesList[0] : "")}
          >
            <Text>{species || "Select Species"}</Text>
          </TouchableOpacity>
          {species === "" &&
            speciesList.map((sp) => (
              <TouchableOpacity key={sp} onPress={() => setSpecies(sp)}>
                <Text style={{ padding: 5 }}>{sp}</Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setBreed(breed === "" ? breedList[0] : "")}
          >
            <Text>{breed || "Select Breed"}</Text>
          </TouchableOpacity>
          {breed === "" &&
            breedList.map((br) => (
              <TouchableOpacity key={br} onPress={() => setBreed(br)}>
                <Text style={{ padding: 5 }}>{br}</Text>
              </TouchableOpacity>
            ))}

          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Finish</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
};

export default Signup;
