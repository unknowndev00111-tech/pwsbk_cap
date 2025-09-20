import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const addFriend = () => {
  // Dummy friend requests data
  const friendRequests = [
    {
      id: "1",
      name: "Jane Smith",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "2h ago",
      mutualFriends: 3,
      mutualFriendImages: [
        "https://randomuser.me/api/portraits/men/12.jpg",
        "https://randomuser.me/api/portraits/women/33.jpg",
        "https://randomuser.me/api/portraits/men/56.jpg",
      ],
    },
    {
      id: "2",
      name: "Michael Johnson",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "5h ago",
      mutualFriends: 0,
      mutualFriendImages: [],
    },
    {
      id: "3",
      name: "Emily Davis",
      profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
      time: "1d ago",
      mutualFriends: 2,
      mutualFriendImages: [
        "https://randomuser.me/api/portraits/women/21.jpg",
        "https://randomuser.me/api/portraits/men/40.jpg",
      ],
    },
  ];

  const renderRequest = ({ item }: { item: (typeof friendRequests)[0] }) => (
    <View style={styles.requestCard}>
      {/* Profile Pic */}
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />

      {/* Info + Actions */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>

        {/* Mutual friends (only if > 0) */}
        {item.mutualFriends > 0 && (
          <View style={styles.mutualRow}>
            <View style={styles.mutualPics}>
              {item.mutualFriendImages.slice(0, 3).map((uri, idx) => (
                <Image
                  key={idx}
                  source={{ uri }}
                  style={[
                    styles.mutualPic,
                    { marginLeft: idx === 0 ? 0 : -10 },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.mutualText}>
              {item.mutualFriends} mutual friend
              {item.mutualFriends > 1 ? "s" : ""}
            </Text>
          </View>
        )}

        {/* Actions below */}
        <View style={styles.actionsColumn}>
          <Pressable style={[styles.button, styles.confirm]}>
            <Text style={styles.btnText}>Confirm</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.delete]}>
            <Text style={[styles.btnText, { color: "#000" }]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <HeaderLayout withLogo noBorderRadius height={130}>
        <Text style={styles.title}>Friends</Text>
        <Pressable onPress={() => router.push("/pet-owner/search")}>
          <Feather name="search" size={24} color="black" alignSelf="flex-end" />
        </Pressable>
      </HeaderLayout>

      <View
        style={{
          flexDirection: "row",
          marginLeft: 15,
          gap: 10,
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        <View style={styles.suggestions}>
          <Text style={styles.text}>Suggestions</Text>
        </View>
        <View style={styles.yourfriend}>
          <Text style={styles.text}>Your Friends</Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: "RobotoSemiBold",
          fontSize: 16,
          color: "#000",
          alignSelf: "flex-start",
          marginLeft: 15,
          marginBottom: 5,
          marginTop: 10,
        }}
      >
        Friend Requests
      </Text>
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{
          padding: 15,
          backgroundColor: "#fff",
        }}
      />
    </View>
  );
};

export default addFriend;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    top: 30,
    marginLeft: 10,
  },
  suggestions: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  yourfriend: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: "RobotoSemiBold",
    color: "#000",
  },
  time: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#555",
  },
  mutualRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  mutualPics: {
    flexDirection: "row",
    marginRight: 5,
  },
  mutualPic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  mutualText: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: Colors.primary,
  },
  actionsColumn: {
    marginTop: 13,
    gap: 6,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  confirm: {
    backgroundColor: Colors.primary,
  },
  delete: {
    backgroundColor: Colors.buttonlogin,
  },
  btnText: {
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
    color: "#fff",
  },
});
