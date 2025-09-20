import { Colors } from "@/shared/colors/Colors";
import HeaderWithActions from "@/shared/components/HeaderSet";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens, ShadowStyle } from "@/shared/styles/styles";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  findNodeHandle,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

const initialSearches = [
  {
    id: "1",
    name: "John Doe",
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Alex Carter",
    profile: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const Search = () => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState(initialSearches);
  const [selected, setSelected] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDelete = (id: string) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
    setShowDropdown(false);
  };

  const openDropdown = (
    event: any,
    id: string // item id
  ) => {
    const handle = findNodeHandle(event.target);
    if (handle) {
      UIManager.measure(handle, (_x, _y, _w, _h, pageX, pageY) => {
        setDropdownPos({ x: pageX, y: pageY + 20 }); // position below dots
        setSelected(id);
        setShowDropdown(true);
      });
    }
  };

  const renderItem = ({ item }: { item: (typeof initialSearches)[0] }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image source={{ uri: item.profile }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      {/* Three-dot action */}
      <TouchableOpacity onPress={(e) => openDropdown(e.nativeEvent, item.id)}>
        <Entypo name="dots-three-vertical" size={18} color="#555" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      <HeaderLayout noBorderRadius>
        <HeaderWithActions onBack={() => router.back()}>
          <TextInput
            placeholder="Search Pawsbook"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#888"
          />
        </HeaderWithActions>
      </HeaderLayout>

      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: 10,
          backgroundColor: "white",
          marginTop: 12,
        }}
        ListHeaderComponent={() => (
          <Text style={styles.recentTitle}>Recent Searches</Text>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            No recent searches
          </Text>
        )}
      />

      {/* Dropdown modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View
            style={[
              styles.dropdown,
              { top: dropdownPos.y, left: dropdownPos.x - 120 },
            ]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => selected && handleDelete(selected)}
            >
              <Text style={{ color: "red", fontSize: 14 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f0ededff",
    borderRadius: 20,
    fontSize: 14,
    paddingHorizontal: 15,
    height: 40,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    marginLeft: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    ...ShadowStyle,
    width: 120,
  },
  dropdownItem: {
    paddingVertical: 8,
    alignItems: "center",
  },
});
