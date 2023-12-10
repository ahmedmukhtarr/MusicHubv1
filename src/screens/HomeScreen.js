import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost, getAllPosts } from '../API/Api';
import { getUserDetail } from '../API/storage';

const HomeScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image
  const [selectedVideo, setSelectedVideo] = useState(null); // Added state for selected video
  const [refreshing, setRefreshing] = useState(false);

  const handlePostTextChange = (text) => {
    setPostText(text);
  };

  const createNewPost = async () => {
    try {
      const user = await getUserDetail();
      const postData = { userId: user._id, text: postText, imageUrl: selectedImage };
      const response = await createPost(postData);
      alert(response?.message);
    } catch (error) {
      console.error("Error creating post:", error.response);
    }
  };

  const getAllPostsApi = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response?.data)
    } catch (error) {
      console.error("Error fetching posts:", error.response);
    }
  };

  const handlePost = () => {
    if (postText) {
      createNewPost();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch updated data or perform any other refresh logic
    await getAllPostsApi(); // You need to implement a function to fetch fresh data
    setRefreshing(false);
  };

  const handleEdit = (postId) => {
    setEditingPostId(postId);
  };

  // Function to navigate to the Comments screen for a post
  const viewComments = (postId) => {
    // You can navigate to a new screen here to display and add comments for the selected post.
    // For example, using React Navigation:
    // navigation.navigate('CommentsScreen', { postId });
  };
  const handleUploadPicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Set the selected image URI
        console.log(result.assets[0].uri);
        setSelectedImage(result.assets[0].uri);

        // Further processing or uploading logic can be added here.
      }
    } catch (error) {
      console.error('Error fetching or processing the image:', error);
    }
  };

  const handleUploadVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Set the selected video URI
        console.log(result.assets[0].uri);
        setSelectedVideo(result.assets[0].uri);
  
        // // Generate a thumbnail for the video
        // const thumbnail = await generateThumbnail(result.assets[0].uri);
        // console.log(thumbnail);
  
        // Further processing or uploading logic can be added here.
      }
    } catch (error) {
      console.error('Error fetching or processing the video:', error);
    }
  };

  useEffect(() => {
    getAllPostsApi();
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
    >
     
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        onChangeText={handlePostTextChange}
        value={postText}
        multiline={true}
        numberOfLines={4}
      />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}

      <View style={styles.uploadOptions}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadVideo}
        >
          <Text style={styles.uploadText}>Upload Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadPicture}
        >
          <Text style={styles.uploadText}>Upload Picture</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <Text style={styles.postFeedHeading}>Post Feed</Text>

      <FlatList
        data={posts.slice().reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.postSegment} key={index}>
            {/* {editingPostId === item.id ? (
              <View>
                <TextInput
                  style={styles.editInput}
                  onChangeText={(text) => setPostText(text)}
                  value={postText}
                  multiline={true}
                  numberOfLines={4}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleSaveEdit(item.id, postText)}
                >
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : ( */}
              <View>
                <Text>{item.text}</Text>
                {item?.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.selectedImage} />}
                <View style={styles.editDeleteButtons}>
                <TouchableOpacity
                    style={styles.likeButton}
                    
                  >
                    <Text style={styles.likeButtonText}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEdit(item.id)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.commentButton}
                    onPress={() => viewComments(item.id)}
                  >
                    <Text style={styles.commentButtonText}>Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            {/* )} */}
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
  textInput: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  uploadText: {
    color: 'white',
    textAlign: 'center',
  },
  postButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: "#000",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }, 
  postFeedHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
    marginTop: 20,
  },
  postSegment: {
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%', // Ensures full width
    minWidth: 350, // Set a minimum width (adjust as needed)
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
  editDeleteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Edit button style
  editButton: {
    
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'blue',
    textAlign: 'center',
  },
  // Comment button style
  commentButton: {
    
    padding: 5,
    borderRadius: 5,
  },
  commentButtonText: {
    color: 'green',
    textAlign: 'center',
  },
  // Delete button style
  deleteButton: {
    
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
    textAlign: 'center',
  },
  likeButton: {
    
    padding: 5,
    borderRadius: 5,
  },
  likeButtonText: {
    color: 'purple',
    textAlign: 'center',
  },
  selectedImage: {
    marginTop: 10,
    marginBottom: 10,
    width: 140,
    height: 140,
    borderRadius: 10,
  },
});

export default HomeScreen;
