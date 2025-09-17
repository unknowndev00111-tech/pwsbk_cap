import { Colors } from "@/shared/colors/Colors";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PetOwnerSignupProps {
  step: number;
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  petName: string;
  setPetName: (val: string) => void;
  species: string;
  setSpecies: (val: string) => void;
  breed: string;
  setBreed: (val: string) => void;
  age: string;
  setAge: (val: string) => void;
  speciesList: string[];
  breedList: string[];
  onNext: () => void;
}

const PetOwnerSignup: React.FC<PetOwnerSignupProps> = ({
  step,
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  petName,
  setPetName,
  species,
  setSpecies,
  breed,
  setBreed,
  age,
  setAge,
  speciesList,
  breedList,
  onNext,
}) => {
  const [speciesModal, setSpeciesModal] = useState(false);
  const [breedModal, setBreedModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Separate animations for each modal
  const speciesAnim = useRef(new Animated.Value(300)).current;
  const breedAnim = useRef(new Animated.Value(300)).current;

  const openModal = (setter: any, anim: any) => {
    setter(true);
    setTimeout(() => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }, 50);
  };

  const closeModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    anim: Animated.Value
  ) => {
    Animated.timing(anim, {
      toValue: 300,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setter(false));
  };

  if (step === 2) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              Let’s set up your account so you can easily manage your pets.{" "}
            </Text>
            <Text style={styles.subTitle}>
              Please provide the following details
            </Text>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <FontAwesome6 name="phone" size={20} color={Colors.primary} />
                <TextInput
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color={Colors.primary} />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Password */}
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5
                  name="lock"
                  size={20}
                  color={Colors.primary}
                  marginLeft={25}
                />

                <TextInput
                  placeholder="Password"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  style={[styles.input, { flex: 1 }]}
                />

                <TouchableOpacity
                  disabled={password.length === 0}
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={{ padding: 5 }}
                >
                  {password.length > 0 ? (
                    <FontAwesome5
                      name={showPassword ? "eye-slash" : "eye"}
                      size={15}
                      color="#ccc"
                      marginRight={10}
                    />
                  ) : (
                    <View style={{ width: 15 }} /> // placeholder keeps layout stable
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <FontAwesome6
                  name="lock"
                  size={20}
                  color={Colors.primary}
                  marginLeft={25}
                />

                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={setConfirmPassword}
                  style={[styles.input, { flex: 1 }]}
                />

                <TouchableOpacity
                  disabled={confirmPassword.length === 0}
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ padding: 5 }}
                >
                  {confirmPassword.length > 0 ? (
                    <FontAwesome5
                      name={showConfirmPassword ? "eye-slash" : "eye"}
                      size={15}
                      marginRight={10}
                      color="#ccc"
                    />
                  ) : (
                    <View style={{ width: 15 }} /> // placeholder keeps layout stable
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (step === 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Pet Information</Text>

        <TextInput
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
          style={styles.input}
        />

        {/* Species Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => openModal(setSpeciesModal, speciesAnim)}
        >
          <Text>{species || "Select Species"}</Text>
        </TouchableOpacity>

        {/* Breed Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => openModal(setBreedModal, breedAnim)}
        >
          <Text>{breed || "Select Breed"}</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>

        {/* Species Modal */}
        <Modal transparent visible={speciesModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: speciesAnim }] },
              ]}
            >
              <Text style={styles.modalTitle}>Select Species</Text>
              <FlatList
                data={speciesList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSpecies(item);
                      closeModal(setSpeciesModal, speciesAnim);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => closeModal(setSpeciesModal, speciesAnim)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {/* Breed Modal */}
        <Modal transparent visible={breedModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: breedAnim }] },
              ]}
            >
              <Text style={styles.modalTitle}>Select Breed</Text>
              <FlatList
                data={breedList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setBreed(item);
                      closeModal(setBreedModal, breedAnim);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => closeModal(setBreedModal, breedAnim)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "RobotoMedium",
    marginBottom: 20,
    maxWidth: "100%",
    marginHorizontal: 20,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Roboto",
    marginBottom: 30,
    maxWidth: "100%",
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    borderWidth: 1.3,
    borderColor: Colors.primary,
    borderRadius: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    height: 50,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#000",
    marginLeft: 30,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    width: "80%",
    fontFamily: "Roboto",
    color: "#000",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    top: "10%",
    width: "85%",
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default PetOwnerSignup;
