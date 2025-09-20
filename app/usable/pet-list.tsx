import { Colors } from "@/shared/colors/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const dummyPets = [
  { id: "1", name: "Bella", image: "https://i.pravatar.cc/100?img=12" },
  { id: "2", name: "Charlie", image: "https://i.pravatar.cc/100?img=15" },
  { id: "3", name: "Max", image: "https://i.pravatar.cc/100?img=20" },
  { id: "4", name: "Luna", image: "https://i.pravatar.cc/100?img=25" },
];

const PetList = () => {
  const [search, setSearch] = useState("");
  const [selectedPets, setSelectedPets] = useState<typeof dummyPets>([]);

  const filteredPets = dummyPets.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (pet: (typeof dummyPets)[number]) => {
    if (selectedPets.some((p) => p.id === pet.id)) {
      setSelectedPets((prev) => prev.filter((p) => p.id !== pet.id));
    } else {
      setSelectedPets((prev) => [...prev, pet]);
    }
  };

  const handleDone = () => {
    router.back();
    setTimeout(() => {
      router.push({
        pathname: "/pet-owner/(home)/post",
        params: { taggedPets: JSON.stringify(selectedPets) },
      });
    }, 50);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, padding: 15 }}>
      <TextInput
        placeholder="Search pets..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedPets.some((p) => p.id === item.id);
          return (
            <TouchableOpacity
              style={[styles.petRow, isSelected && styles.selectedRow]}
              onPress={() => toggleSelect(item)}
            >
              <Image source={{ uri: item.image }} style={styles.petAvatar} />
              <Text style={styles.petName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetList;

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  petRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedRow: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  petAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  petName: {
    fontSize: 14,
    color: "#333",
  },
  doneBtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  doneText: {
    color: Colors.white,
    fontWeight: "600",
  },
});
