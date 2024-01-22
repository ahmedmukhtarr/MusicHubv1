import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, RefreshControl, Modal } from 'react-native';
import { Image } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { createPost, deletePost, getAllPosts, likePost, unlikePost } from '../API/Api';
import { getUserDetail } from '../API/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image
  const [selectedVideo, setSelectedVideo] = useState(null); // Added state for selected video
  const [refreshing, setRefreshing] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentCommentItemId, setCurrentCommentItemId] = useState(null);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});



  const handlePostTextChange = (text) => {
    setPostText(text);
  };

  const createNewPost = async () => {
    try {
      const user = await getUserDetail();
      const postData = { userId: user._id, text: postText, imageUrl: selectedImage, videoUrl: selectedVideo };
      const response = await createPost(postData);
      alert(response?.message);

      // Reset the state after posting
      setPostText('');
      setSelectedImage(null);
      setSelectedVideo(null);

      // Fetch updated posts
      await getAllPostsApi();
    } catch (error) {
      console.error("Error creating post:", error.response);
    }
  };

  const getAllPostsApi = async () => {
    try {
      const response = await getAllPosts();
      console.log("dataaaa", response?.data);
      setPosts(response?.data)
    } catch (error) {
      console.error("Error fetching posts:", error.response);
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      const response = await axiosClient.put(`/posts/update/${postId}`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const deletePostApi = async (postId) => {
    try {
      const response = await deletePost(postId);
      alert(response?.message);
    } catch (error) {
      console.error("Error deleting post:", error.response?.data.message);
    }
  };

  const addComment = async (postId, commentData) => {
    try {
      const response = await axiosClient.post(`/posts/add/comment/${postId}`, commentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      // Assuming response.data is the newly added comment
      setComments([...comments, response?.data]);
      return response?.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };



  const likePostApi = async (postId, userId) => {
    try {
      setRefreshing(true);
      const response = await likePost(postId, userId);
      if(response.data) {
        console.log("like", response.data);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('Error liking post:', error.response.data.message);
      setRefreshing(false);
    }
  };

  const unlikePostApi = async (postId, userId) => {
    try {
      setRefreshing(true);
      const response = await unlikePost(postId, userId);
      if(response.data) {
        console.log("unlike", response.data);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('Error liking post:', error.response.data.message);
      setRefreshing(false);
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
  const viewComments = async (postId) => {
    try {
      const response = await axiosClient.get(`/posts/comments/${postId}`);
      setComments(response?.data || []);
      setCurrentCommentItemId(postId);
      setCommentModalVisible(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
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
        setSelectedVideo(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error fetching or processing the video:', error);
    }
  };


  useEffect(() => {
    getAllPostsApi();

    const fetchData = async () => {
      const user = await AsyncStorage.getItem("userdata");
      setUserData(JSON.parse(user))
    }

    fetchData();
  }, [refreshing])

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


      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Display comments above the input box */}
            <FlatList
              data={comments}
              keyExtractor={(item) => item ? item.commentId : null}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text>{item.text}</Text>
                </View>
              )}
            />


            {/* Input box for entering a new comment */}
            <TextInput
              style={styles.commentInput}
              placeholder="Enter your comment..."
              onChangeText={setCommentText}
              value={commentText}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.commentSubmitButton}
              onPress={() => {
                addComment(currentCommentItemId, { text: commentText });
                setCommentModalVisible(false);
              }}
            >
              <Text style={styles.commentSubmitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentCloseButton}
              onPress={() => setCommentModalVisible(false)}
            >
              <Text style={styles.commentCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={posts.slice().reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.postSegment} key={index}>
            <View>
              <Text style={styles.username}>{item?.user?.name}</Text>
              <Text>{item.text}</Text>
              {item?.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.selectedImage} />}
              {selectedVideo && (
                <Video
                  source={{ uri: selectedVideo }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={false} // Set to true if you want the video to start playing automatically
                  isLooping={false}
                  style={{ width: 300, height: 300 }}
                />
              )}
              <View style={styles.editDeleteButtons}>
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => {
                  if (item?.likes?.some(like => like === userData?._id)) {
                    // If user already liked the post, call unlikePostApi
                    unlikePostApi(item._id, userData?._id);
                  } else {
                    // If user has not liked the post, call likePostApi
                    likePostApi(item._id, userData?._id);
                  }
                }}
              >
                <Text style={styles.likeButtonText}>
                  {item?.likes?.some(like => like === userData?._id)
                    ? `Unlike ${item?.likes?.length}`
                    : `Like ${item?.likes?.length}`}
                </Text>
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

                {/* <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePostApi(item._id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity> */}
              </View>
            </View>
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
    backgroundColor: "#E6E6FA",
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
  username: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'purple', 
     
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  commentSubmitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  commentSubmitText: {
    color: 'white',
    textAlign: 'center',
  },
  commentCloseButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  commentCloseText: {
    color: 'black',
    textAlign: 'center',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

});

export default HomeScreen;
