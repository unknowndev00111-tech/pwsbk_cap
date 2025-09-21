import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <HeaderLayout withLogo noBorderRadius height={130}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Menu</Text>
        </View>
      </HeaderLayout>

      <View style={styles.profileConatiner}>
        <View style={styles.row}>
          <View style={styles.avatar} />
          <Text style={styles.name}>John Doe</Text>
        </View>

        <View style={styles.devider} />

        <Text style={styles.myPets}>My Pets</Text>
        <View style={styles.row}>
          <Entypo name="circle-with-plus" size={24} color={Colors.primary} />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={styles.addPet}>Add Pet</Text>
            <Text
              style={[
                styles.addPet,
                { color: "#8B8B8B", fontSize: 12, fontFamily: "Roboto" },
              ]}
            >
              You can add only 3 pets
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actionButtonsWrapper}>
        <View style={styles.actionButton}>
          <View style={styles.actionButtonIcon}>
            <Image
              source={require("../../../assets/images/vaccine.png")}
              style={{ opacity: 100 }}
            />
          </View>
          <Text style={styles.actionButtonText}>Pets Vaccines</Text>
        </View>
        <View style={styles.actionButton}>
          <View
            style={[
              styles.actionButtonIcon,
              { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            ]}
          >
            <FontAwesome5 name="calendar-day" size={22} color="#FF0000" />
          </View>
          <Text style={styles.actionButtonText}>Appoinments</Text>
        </View>
      </View>

      <View style={styles.actionButtonsWrapper}>
        <View style={styles.actionButton}>
          <View
            style={[
              styles.actionButtonIcon,
              { backgroundColor: "rgba(0, 255, 34, 0.3)" },
            ]}
          >
            <Image
              source={require("../../../assets/images/pet.png")}
              style={{ opacity: 100 }}
            />
          </View>
          <Text style={styles.actionButtonText}>Manage Pets</Text>
        </View>
        <View style={styles.actionButton}>
          <View
            style={[
              styles.actionButtonIcon,
              { backgroundColor: "rgba(255, 0, 242, 0.3)" },
            ]}
          >
            <Octicons name="bell-fill" size={22} color="#9112BC" />
          </View>
          <Text style={styles.actionButtonText}>Notifications</Text>
        </View>
      </View>

      <View style={styles.actionButtonsWrapper}>
        <View style={styles.actionButton}>
          <View
            style={[
              styles.actionButtonIcon,
              { backgroundColor: "rgba(0, 0, 255, 0.3)" },
            ]}
          >
            <MaterialIcons name="info" size={22} color={"#0051FF"} />
          </View>
          <Text style={styles.actionButtonText}>About</Text>
        </View>
        <View style={styles.actionButton}>
          <View
            style={[
              styles.actionButtonIcon,
              { backgroundColor: "rgba(165, 165, 165, 0.3)" },
            ]}
          >
            <Image
              source={require("../../../assets/images/settings.png")}
              style={{ opacity: 100 }}
            />
          </View>
          <Text style={styles.actionButtonText}>Account Settings</Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
  },
  profileConatiner: {
    backgroundColor: Colors.white,
    padding: 15,
    width: "95%",
    borderRadius: 25,
    marginTop: 10,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#E0E0E0",
  },
  name: {
    fontSize: 16,
    fontFamily: "RobotoSemiBold",
    color: "#000",
  },
  devider: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    alignSelf: "center",
    width: "100%",
    marginBottom: 15,
  },
  myPets: {
    fontSize: 14,
    fontFamily: "RobotoMedium",
    color: "#000",
    marginBottom: 10,
  },
  addPet: {
    fontSize: 14,
    fontFamily: "RobotoMedium",
    color: "#000",
  },
  actionButtonsWrapper: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    width: "45%",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.white,

    // justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 10,
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: "rgba(252, 181, 59, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: "80%",
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  logoutButtonText: {
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
    color: Colors.black,
  },
});
