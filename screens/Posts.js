import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ListItem from "../components/ListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
});

export default ({ navigation }) => {
  const userId = navigation.getParam("user_id");
  const username = navigation.getParam("username");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={posts.filter((p) => p.userId === userId)}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                navigation.navigate("Detail", {
                  title: item.title,
                  body: item.body,
                  username: username
                });
              }}
              title={item.title}
            />
          )}
        />
      )}
    </View>
  );
};
