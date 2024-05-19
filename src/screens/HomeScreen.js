import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, RefreshControl, Modal } from 'react-native';
import { Image } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { addComment, createPost, deletePost, getAllPosts, imageBaseUrl, likePost, unlikePost, updatePost } from '../API/Api';
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
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showComments, setShowComments] = useState(true);




  const handlePostTextChange = (text) => {
    setPostText(text);
  };

  const createNewPost = async () => {
    try {
      const fileUrl = selectedImage?.uri;
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      // Extract the file extension (file type)
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);

      const user = await getUserDetail();
      // const postData = { userId: user._id, text: postText, image: selectedImage};
      const formData = new FormData();

      formData.append('image', {
        uri: fileUrl,
        type: `image/${fileType}`, // Adjust the type based on the image format if needed
        name: fileName, // You can set a custom name for the image file
      });
      formData.append('userId', user._id);
      formData.append('text', postText);

      const response = await createPost(formData);
      alert(response?.message);
      // Reset the state after posting
      setPostText('');
      setSelectedImage(null);
      

      // Fetch updated posts
      await getAllPostsApi();
      console.log(response?.data);
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

  const updatePostApi = async (postId, postData) => {
    try {
      const response = await updatePost(postId, postData);

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

  const addCommentApi = async () => {
    console.log(selectedPostId, commentText, userData?._id);
    try {
      const response = await addComment(selectedPostId, commentText, userData?._id);
      // Assuming response.data is the newly added comment
      console.log("dataaaa", response?.data);
    } catch (error) {
      console.error('Error adding comment:', error.response.data.message);
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
        console.log(result.assets[0].fileName);
        console.log(result.assets[0].uri);
        console.log(result.assets[0].type);
        setSelectedImage(result.assets[0]);

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
      {selectedImage?.uri && <Image source={{ uri: selectedImage?.uri }} style={styles.selectedImage} />}

      <View style={styles.uploadOptions}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadPicture}
        >
          <Text style={styles.uploadText}>Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePost}
        >
          <Text style={styles.uploadText}>Post</Text>
        </TouchableOpacity>
      </View>
{/* 
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity> */}

      <Text style={styles.postFeedHeading}>Post Feed</Text>


     



      <FlatList
  data={posts.slice().reverse()}
  keyExtractor={(item) => item.id}
  renderItem={({ item, index }) => (
    <View style={styles.postSegment} key={index}>
      <View>
        <Text style={styles.username}>{item?.user?.name}</Text>
        <Text>{item.text}</Text>
        {item?.imageUrl && <Image source={{ uri: `${imageBaseUrl}${item.imageUrl}` }} style={styles.selectedImage} />}
        {selectedVideo && (
          <Video
            source={{ uri: selectedVideo }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            style={{ width: 300, height: 300 }}
          />
        )}
        <View style={styles.editDeleteButtons}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => {
              if (item?.likes?.some((like) => like === userData?._id)) {
                unlikePostApi(item._id, userData?._id);
              } else {
                likePostApi(item._id, userData?._id);
              }
            }}
          >
            <Text style={styles.likeButtonText}>
              {item?.likes?.some((like) => like === userData?._id)
                ? `Unlike ${item?.likes?.length}`
                : `Like ${item?.likes?.length}`}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity> */}

          {/* Comment button */}
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => {
              setCommentModalVisible(true);
              setSelectedPostId(item._id);
            }}
          >
            <Text style={styles.commentButtonText}>Comment</Text>
          </TouchableOpacity>

          {/* Delete button */}
          {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePostApi(item._id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Comment box for the selected post */}
{selectedPostId === item._id && (
  <>
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
      onPress={addCommentApi}
    >
      <Text style={styles.commentSubmitText}>Submit</Text>
    </TouchableOpacity>
    <TouchableOpacity
  style={styles.commentButton}
  onPress={() => setShowComments(!showComments)}
>
  <Text style={styles.commentButtonText}>
    {showComments ? 'Hide Comments' : 'Show Comments'}
  </Text>
</TouchableOpacity>


    {/* Display existing comments */}
    {showComments && (
  <>
    {item.comments.length > 0 ? (
      // Display existing comments
      item.comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.username}>{comment.user?.name}</Text>
          <Text>{comment.text}</Text>
        </View>
      ))
    ) : (
      // Display a message if there are no comments
      <Text style={styles.username}>No comments yet</Text>
    )}
  </>
)}

  </>
)}
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
