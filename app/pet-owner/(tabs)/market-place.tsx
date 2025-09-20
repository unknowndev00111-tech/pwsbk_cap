import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import SkeletonMarketCard from "@/shared/components/MarketSkeleton";
import { screens, ShadowStyle } from "@/shared/styles/styles";
import { Feather, Octicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const marketPlace = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => {
      onRefresh();
      setLoading(false);
    }, 2000);
  }, []);

  // Sample market place items
  const marketItems = [
    {
      id: "1",
      name: "Golden Retriever Puppy",
      price: 12000,
      description: "Healthy 2-month-old Golden Retriever. Vaccinated.",
      image: "https://placedog.net/400/300?id=1",
    },
    {
      id: "2",
      name: "Cat Scratching Post",
      price: 1500,
      description: "Durable scratching post for cats. 3ft tall.",
      image: "https://placekitten.com/400/300",
    },
    {
      id: "3",
      name: "Pet Food Pack",
      price: 899,
      description: "10kg premium dry dog food.",
      image: "https://picsum.photos/400/300?random=10",
    },
  ];

  const filteredItems = marketItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: (typeof marketItems)[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>₱{item.price.toLocaleString()}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <HeaderLayout withLogo noBorderRadius height={130}>
        <Text style={styles.title}>Market Place</Text>
        <View style={styles.iconWrapper}>
          <Link href="/pet-owner/(market)/sell" asChild>
            <Pressable style={styles.sellButton}>
              <Text style={styles.sellText}>Sell</Text>
            </Pressable>
          </Link>
          <Pressable onPress={() => router.push("/pet-owner/notifications")}>
            <Feather name="bell" size={24} color="black" />
          </Pressable>
        </View>
      </HeaderLayout>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search Market Place"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
        <View style={styles.filter}>
          <Octicons name="filter" size={24} color="black" />
        </View>
      </View>

      {/*  List with skeleton */}
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={() => <SkeletonMarketCard />}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 15 }}
        />
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingHorizontal: 5,
            gap: 5,
            marginHorizontal: 5,
          }}
          contentContainerStyle={{
            paddingBottom: 0,
            flexGrow: 1,
            marginTop: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default marketPlace;

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  sellButton: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#d9d9d9",
  },
  sellText: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#000",
  },
  title: {
    fontSize: 20,
    fontFamily: "RobotoSemiBold",
    color: "#000",
    top: 30,
    marginLeft: 10,
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.buttonlogin,
    borderRadius: 25,
    flex: 1,
    padding: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#808080",
    flex: 1,
    paddingVertical: 4,
  },
  filter: {
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    ...ShadowStyle,
    width: "48%",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 8,
  },
  itemName: {
    fontSize: 14,
    fontFamily: "RobotoSemiBold",
    color: "#000",
  },
  itemDesc: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#555",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontFamily: "RobotoSemiBold",
    color: Colors.primary,
    marginTop: 5,
  },
});
