import { Colors } from "@/shared/colors/Colors";
import HeaderWithActions from "@/shared/components/HeaderSet";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ItemDetails = () => {
  const router = useRouter();
  const {
    id,
    name,
    price,
    description,
    image,
    location,
    seller,
    sellerImage, // 👈 expect seller profile image
  } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <HeaderLayout noBorderRadius>
        <HeaderWithActions onBack={() => router.back()} />
      </HeaderLayout>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Image */}
        <Image source={{ uri: image as string }} style={styles.itemImage} />

        {/* Info */}
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>₱{Number(price).toLocaleString()}</Text>

        {/* Action buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignSelf: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Pressable
            style={[styles.Button, { backgroundColor: Colors.buttonlogin }]}
          >
            <FontAwesome name="bookmark" size={20} color={"#000"} />
            <Text style={[styles.buttonText, { color: "#000" }]}>Save</Text>
          </Pressable>

          <Pressable style={styles.Button}>
            <Ionicons name="chatbubble" size={20} color={"#fff"} />
            <Text style={styles.buttonText}>Message</Text>
          </Pressable>
        </View>

        <View style={styles.devider} />

        {/* Description */}
        <Text style={styles.title}>Description</Text>
        <Text style={styles.itemDesc}>{description}</Text>

        <View style={styles.devider} />

        {/* Seller Information */}
        <Text style={styles.title}>Seller Information</Text>
        <View style={styles.sellerRow}>
          <Image
            source={{
              uri:
                (sellerImage as string) ||
                "https://via.placeholder.com/100x100.png?text=User",
            }}
            style={styles.sellerAvatar}
          />
          <Text style={styles.infoValue}>{seller}</Text>
        </View>

        <View style={styles.devider} />

        {/* Location */}
        <Text style={styles.title}>Meetup Preference</Text>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <FontAwesome6 name="location-dot" size={20} color={Colors.primary} />
          <Text style={[styles.infoValue, { fontFamily: "Roboto" }]}>
            {location}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 25,
    width: "95%",
    alignSelf: "center",
    marginTop: 5,
    paddingBottom: 30,
  },
  itemImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: "RobotoSemiBold",
    color: Colors.primary,
    marginBottom: 10,
  },
  itemDesc: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#555",
    marginBottom: 20,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray,
  },
  Button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 8,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  devider: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    alignSelf: "center",
    width: "100%",
  },
});
