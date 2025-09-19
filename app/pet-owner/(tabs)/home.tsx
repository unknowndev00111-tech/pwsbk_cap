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
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
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
};

const myProfileImage = "https://i.pravatar.cc/100?img=10"; // ✅ your profile pic

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
  },
];

const Home = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    // Simulate fetching
    setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 2000);
  }, []);

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

  const handlePost = () => {
    if (!post.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      user: "You",
      profileImage: myProfileImage,
      time: "Just now",
      content: post,
      images: [],
      liked: false,
      likesCount: 0,
      comments: [],
      showComments: false,
    };
    setPosts([newPost, ...posts]);
    setPost("");
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

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      {/* Header row */}
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

      {/* Post content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Images */}
      {item.images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {item.images.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              style={styles.postImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
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

          {/* Add comment input */}
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
        {/* <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignSelf: "flex-start",
            alignItems: "center",
            // justifyContent: "center",
            marginLeft: 50,
            marginTop: 10,
            width: "100%",
          }}
        >
          <FontAwesome name="image" size={17} color="#26BC00" />
          <Octicons name="video" size={17} color="#E00101" />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={{ color: Colors.white, textAlign: "center" }}>
              Post
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Post list */}
      {loading ? (
        <FlatList
          data={[1, 2, 3]} // 3 skeleton placeholders
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonPost />}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 50,
                flexDirection: "column",
              }}
            >
              <FontAwesome5 name="pager" size={20} color="gray" />
              <Text style={{ color: "gray", fontSize: 12 }}>
                No posts yet. Be the first to share something!
              </Text>
            </View>
          )}
        />
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
  postButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 15,
    width: "25%",
    position: "absolute",
    right: 0,
    marginRight: 50,
  },
  postCard: {
    backgroundColor: Colors.white,
    marginTop: 10,
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
  postImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#d9d9d9",
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
});
