import StepIndicator from "@/components/StepIndicator";
import GroomerSignup from "@/components/UserComponent/GroomerSignup";
import PetOwnerSignup from "@/components/UserComponent/PetOwnerSignup";
import VetSignup from "@/components/UserComponent/VetSignup";
import { Colors } from "@/shared/colors/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string | null>(null);

  // Shared states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Pet states
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const speciesList = [
    "Dog",
    "Cat",
    "Bird",
    "Reptile",
    "Fish",
    "asdasd",
    "adsad",
    "adsasdasda",
  ];
  const breedList = ["Labrador", "Bulldog", "Persian", "Siamese"];

  const handleBack = () => {
    if (step === 1) {
      router.replace("/StartScreen");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (userType === "Pet Owner") {
      if (step < 3) {
        setStep(step + 1);
      } else {
        console.log("Pet Owner Signup Success", {
          userType,
          fullName,
          petName,
        });
        router.replace("/pet-owner/(tabs)/home");
      }
    } else if (userType === "Veterinarian" || userType === "Groomer") {
      if (step < 2) {
        setStep(step + 1);
      } else {
        console.log("Signup Success", { userType, fullName, email });
        router.replace("/pet-owner/(tabs)/home");
      }
    }
  };

  const steps = userType === "Pet Owner" ? [1, 2, 3] : userType ? [1, 2] : [1];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBack}
        style={{ marginBottom: 10, marginTop: 30 }}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>

      <StepIndicator step={step} steps={steps} />

      {/* Step 1: User Type Selection */}
      {step === 1 && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "RobotoMedium",
              maxWidth: "75%",
              alignSelf: "flex-start",
              textAlign: "left",
              marginBottom: 20,
            }}
          >
            Welcome! To get started, tell us who you are.
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
                setStep(2);
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

      {/* Pet Owner Signup */}
      {userType === "Pet Owner" && (
        <PetOwnerSignup
          step={step}
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          petName={petName}
          setPetName={setPetName}
          species={species}
          setSpecies={setSpecies}
          breed={breed}
          setBreed={setBreed}
          age={age}
          setAge={setAge}
          speciesList={speciesList}
          breedList={breedList}
          onNext={handleNext}
        />
      )}

      {/* Vet Signup */}
      {userType === "Veterinarian" && step === 2 && (
        <VetSignup
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onFinish={handleNext}
        />
      )}

      {/* Groomer Signup */}
      {userType === "Groomer" && step === 2 && (
        <GroomerSignup
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onFinish={handleNext}
        />
      )}
    </View>
  );
};

export default Signup;
