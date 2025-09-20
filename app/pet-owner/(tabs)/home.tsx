import { Colors } from "@/shared/colors/Colors";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import SkeletonPost from "@/shared/components/SkeletalLoader";
import { screens } from "@/shared/styles/styles";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Comment = {
  id: string;
  user: string;
  profileImage?: string;
  text: string;
};

type Post = {
  id: string;
  user: string;
  profileImage?: string;
  time: string;
  content: string;
  images: string[];
  liked: boolean;
  likesCount: number;
  comments: Comment[];
  showComments: boolean;
  taggedPets?: { id: string; name: string; image?: string }[]; // ✅ new
};

const myProfileImage = "https://i.pravatar.cc/100?img=10";

const initialPosts: Post[] = [
  {
    id: "1",
    user: "Jane Doe",
    profileImage: "https://i.pravatar.cc/100?img=1",
    time: "2h ago",
    content: "Lovely walk with my dog today!",
    images: [
      "https://picsum.photos/300/200",
      "https://picsum.photos/301/200",
      "https://picsum.photos/302/200",
    ],
    liked: false,
    likesCount: 2,
    comments: [
      {
        id: "c1",
        user: "John Smith",
        profileImage: "https://i.pravatar.cc/100?img=2",
        text: "So cute!",
      },
    ],
    showComments: false,
    taggedPets: [
      { id: "p1", name: "Buddy", image: "https://i.pravatar.cc/100?img=12" },
      { id: "p2", name: "Luna", image: "https://i.pravatar.cc/100?img=13" },
    ], // ✅ example pets
  },
];

const Home = () => {
  const { newPost } = useLocalSearchParams();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPostImages, setSelectedPostImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => {
      setPosts((prev) => (prev.length === 0 ? initialPosts : prev));
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (newPost) {
      try {
        const parsed: Post = JSON.parse(newPost as string);
        setPosts((prev) => [parsed, ...prev]);
      } catch (e) {
        console.error(" Invalid JSON newPost:", e, newPost);
      }
    }
  }, [newPost]);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likesCount: p.liked ? p.likesCount - 1 : p.likesCount + 1,
            }
          : p
      )
    );
  };

  const toggleComments = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  const addComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now().toString(),
                  user: "You",
                  profileImage: myProfileImage,
                  text,
                },
              ],
            }
          : p
      )
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const renderPost = ({ item }: { item: Post }) => {
    const maxImagesToShow = 3;
    const extraImages = item.images.length - maxImagesToShow;

    return (
      <View style={styles.postCard}>
        {/* Header */}
        <View style={styles.postHeader}>
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImage} />
          )}
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.postTime}>{item.time}</Text>
          </View>
        </View>

        {/* Content */}
        <Text style={styles.postContent}>{item.content}</Text>

        {/*  Tagged Pets */}
        {item.taggedPets && item.taggedPets.length > 0 && (
          <View style={styles.taggedPetsContainer}>
            {item.taggedPets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petChip}
                onPress={() => console.log("Go to pet profile:", pet.name)}
              >
                {pet.image ? (
                  <Image source={{ uri: pet.image }} style={styles.petAvatar} />
                ) : (
                  <View style={styles.petAvatar} />
                )}
                <Text style={styles.petName}>{pet.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Images Grid */}
        {item.images.length > 0 && (
          <View style={styles.imageGrid}>
            {item.images.slice(0, maxImagesToShow).map((img, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.imageWrapper}
                onPress={() => {
                  setSelectedPostImages(item.images);
                  setSelectedIndex(idx);
                  setImageModalVisible(true);
                }}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: img }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
                {idx === maxImagesToShow - 1 && extraImages > 0 && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{extraImages}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => toggleLike(item.id)}
            style={styles.actionBtn}
          >
            <Ionicons
              name={item.liked ? "heart-sharp" : "heart-outline"}
              size={23}
              color={item.liked ? "red" : "black"}
            />
            <Text style={styles.countText}>{item.likesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleComments(item.id)}
            style={styles.actionBtn}
          >
            <Ionicons name="chatbubble-outline" size={20} color="black" />
            <Text style={styles.countText}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>

        {/* Comments */}
        {item.showComments && (
          <View style={styles.commentSection}>
            {item.comments.map((c) => (
              <View key={c.id} style={styles.commentRow}>
                {c.profileImage ? (
                  <Image
                    source={{ uri: c.profileImage }}
                    style={styles.commentProfile}
                  />
                ) : (
                  <View style={styles.commentProfile} />
                )}
                <View style={styles.commentBubble}>
                  <Text style={styles.commentUser}>{c.user}</Text>
                  <Text style={styles.commentText}>{c.text}</Text>
                </View>
              </View>
            ))}

            {/* Add comment */}
            <View style={styles.addCommentRow}>
              <Image
                source={{ uri: myProfileImage }}
                style={styles.commentProfile}
              />
              <TextInput
                placeholder="Write a comment..."
                style={styles.commentInput}
                value={commentInputs[item.id] || ""}
                onChangeText={(text) =>
                  setCommentInputs((prev) => ({ ...prev, [item.id]: text }))
                }
              />
              <TouchableOpacity onPress={() => addComment(item.id)}>
                <Text style={styles.postCommentBtn}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[screens.screen, { backgroundColor: Colors.background }]}>
      <HeaderLayout withLogo noBorderRadius>
        <View style={styles.iconWrapper}>
          <Pressable onPress={() => router.push("/pet-owner/post")}>
            <FontAwesome name="plus-square-o" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => router.push("/pet-owner/notifications")}>
            <Feather name="bell" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => router.push("/pet-owner/search")}>
            <Feather name="search" size={24} color="black" />
          </Pressable>
        </View>
      </HeaderLayout>

      {/* Post input */}
      <View style={styles.postInputContainer}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image source={{ uri: myProfileImage }} style={styles.profileImage} />
          <TextInput
            placeholder="What's on your mind?"
            value={post}
            onChangeText={setPost}
            onPress={() => router.push("/pet-owner/post")}
            style={styles.input}
          />
        </View>
      </View>

      {/* Posts */}
      {loading ? (
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonPost />}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
              <FontAwesome5 name="pager" size={20} color="gray" />
              <Text style={{ color: "gray", fontSize: 12 }}>
                No posts yet. Be the first to share something!
              </Text>
            </View>
          )}
        />
      )}

      {/* Modal viewer with swipe */}
      {imageModalVisible && (
        <Modal visible={imageModalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            <FlatList
              data={selectedPostImages}
              horizontal
              pagingEnabled
              initialScrollIndex={selectedIndex}
              getItemLayout={(_, index) => ({
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              })}
              keyExtractor={(uri, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.fullImageWrapper}>
                  <Image
                    source={{ uri: item }}
                    style={styles.fullImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  postInputContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C3C0C0",
  },
  input: {
    fontSize: 13,
    fontFamily: "Roboto",
    color: "#808080",
    width: "85%",
    paddingVertical: 4,
  },
  postCard: {
    backgroundColor: Colors.white,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
  },
  postTime: {
    fontSize: 12,
    color: "#888",
  },
  postContent: {
    marginVertical: 5,
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 5,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countText: {
    fontSize: 13,
    color: "#555",
  },
  commentSection: {
    marginTop: 15,
    paddingLeft: 5,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  commentProfile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#C3C0C0",
    marginRight: 8,
  },
  commentBubble: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 6,
    maxWidth: "85%",
  },
  commentUser: {
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 13,
    color: "#333",
  },
  addCommentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },
  commentInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 12,
    height: 40,
  },
  postCommentBtn: {
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 5,
  },
  // ✅ NEW STYLES
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 10,
  },
  imageWrapper: {
    width: "32%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
  },
  fullImageWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  taggedPetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 5,
  },
  petChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  petAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
    backgroundColor: "#ccc",
  },
  petName: {
    fontSize: 12,
    color: "#333",
  },
});
