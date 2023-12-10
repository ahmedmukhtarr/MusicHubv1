import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: `https://1ee8-182-183-15-37.ngrok-free.app/api`,
});

// Add a function to set the Authorization header
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

// Auth APIs
export const Login = (Data) => {
  return axiosClient.post(`user/signin`, Data);
};

export const Register = (Data) => {
  return axiosClient.post(`user/register`, Data);
};

// Post APIs
export const createPost = async (postData) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post("/posts/create", postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get("/posts/getAll", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = (postId) => {
  return axiosClient.get(`/posts/get/${postId}`);
};

export const updatePost = (postId, postData) => {
  return axiosClient.put(`/posts/update/${postId}`, postData);
};

export const deletePost = (postId) => {
  return axiosClient.delete(`/posts/delete/${postId}`);
};

export const addComment = (postId, commentData) => {
  return axiosClient.post(`/posts/add/comment/${postId}`, commentData);
};

export const likePost = (postId) => {
  return axiosClient.post(`/posts/like/${postId}`);
};

export const unlikePost = (postId) => {
  return axiosClient.post(`/posts/unlike/${postId}`);
};