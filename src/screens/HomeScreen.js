import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
 
  const handlePostTextChange = (text) => {
    setPostText(text);
  };

  const handlePost = () => {
    if (postText) {
      const newPost = {
        id: Date.now().toString(),
        text: postText,
      };

      setPosts([newPost, ...posts]);
      setPostText('');
    }
  };

  const handleEdit = (postId) => {
    setEditingPostId(postId);
  };

  const handleSaveEdit = (postId, newText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, text: newText };
      }
      return post;
    });

    setPosts(updatedPosts);
    setEditingPostId(null);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Function to navigate to the Comments screen for a post
  const viewComments = (postId) => {
    // You can navigate to a new screen here to display and add comments for the selected post.
    // For example, using React Navigation:
    // navigation.navigate('CommentsScreen', { postId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        onChangeText={handlePostTextChange}
        value={postText}
        multiline={true}
        numberOfLines={4}
      />

      <View style={styles.uploadOptions}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            // Handle uploading a video here
          }}
        >
          <Text style={styles.uploadText}>Upload Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            // Handle uploading a picture here
          }}
        >
          <Text style={styles.uploadText}>Upload Picture</Text>
        </TouchableOpacity>
        
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <Text style={styles.postFeedHeading}>Post Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postSegment}>
            {editingPostId === item.id ? (
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
            ) : (
              <View>
                
                <Text>{item.text}</Text>
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
});

export default HomeScreen;
