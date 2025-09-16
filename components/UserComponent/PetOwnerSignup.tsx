import { Colors } from "@/shared/colors/Colors";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Modal,
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
        useNativeDriver: false, // 👈 force JS driver
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
      useNativeDriver: false, // 👈 force JS driver
    }).start(() => setter(false));
  };

  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Credentials</Text>
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
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
    borderRadius: 10,
    marginTop: 10,
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
