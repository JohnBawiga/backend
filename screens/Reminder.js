import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Reminder = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your backend API
  const API_ENDPOINT = 'https://welltalk.onrender.com/posts';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        const data = response.data;

        const sortedPosts = data
          .map(post => ({
            ...post,
            key: post.id.toString(), // FlatList requires a 'key' prop
          }))
          .sort((a, b) => b.id - a.id); // Sort by id in descending order

        setAllPosts(sortedPosts);
        console.log(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle1}>
        {item.counselor.firstName} {item.counselor.lastName}
      </Text>
      <Text>{item.counselor.userType}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.photoContent && (
        <View>
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.photoContent}` }}
            style={styles.postImage}
          />
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <FlatList
          data={allPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30d5c8',
    marginBottom: 8,
    marginTop: 8,
  },
  postTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default Reminder;
