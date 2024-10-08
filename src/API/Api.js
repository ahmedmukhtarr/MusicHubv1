import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://47bd-182-182-235-145.ngrok-free.app/api`,
});

export const imageBaseUrl = "https://47bd-182-182-235-145.ngrok-free.app";

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
export const forgotPassword = async (email) => {
  try {
    const response = await axiosClient.post("/user/forgot-password", { email });
    return response?.data;
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw error;
  }
};
export const initiatePasswordReset = async (email) => {
  try {
    const response = await axiosClient.post("/user/initiate-password-reset", { email });
    return response?.data;
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw error;
  }
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
  const authToken = getAuthToken();
  try {
    const response = await axiosClient.post(
      "/user/reset-password",
      {
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const Login = async (Data) => {
  return axiosClient.post(`user/signin`, Data);
};

export const Register = async (Data) => {
  try {
    const res = await axiosClient.post(`user/register`, Data);
    alert("User Registered");
    return res.data;
  } catch (error) {
    console.error('Error in Register:', error);
    throw error;
  }
};

export const updateProfile = async (userId, newUsername, newPassword, confirmPassword) => {
  const authToken = await getAuthToken();
  try {
    const response = await axiosClient.put(
      `/user/update-profile`,
      {
        userId,
        newUsername,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const profileDetails = async (userId) => {
  const authToken = await getAuthToken();
  try {
    const response = await axiosClient.get(
      `/user/profile-details/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error('Error getting profile details:', error);
    throw error;
  }
};

// Post APIS

export const createPost = async (postData) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post("/posts/create", postData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Change content type to multipart/form-data
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

export const getPost = async (postId) => {
  try {
    const response = await axiosClient.get(`/posts/get/${postId}`);
    return response?.data;
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await axiosClient.put(`/posts/update/${postId}`, postData);
    return response?.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosClient.delete(`/posts/delete/${postId}`);
    console.log(response, "sdss");
    return response?.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const addComment = async (postId, text, userId) => {
  const authToken = await getAuthToken();
  try {
    // Update your axios request in the frontend
    const response = await axiosClient.post(`/posts/add/comment/${postId}`, {
      text: text,
      userId: userId
    }, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Replace 'userToken' with your actual token variable
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export const likePost = async (postId, userId) => {
  const authToken = await getAuthToken();
  try {
    const response = await axiosClient.post(`/posts/like/${postId}`, {userId}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (postId, userId) => {
  const authToken = await getAuthToken();
  try {
    const response = await axiosClient.post(`/posts/unlike/${postId}`, {userId}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};


// Music APIs

export const uploadMusic = async (musicData) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post('/music/upload', musicData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error uploading music:', error);
    throw error;
  }
};

export const getAllMusic = async () => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get('/music/getAll', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching music:', error);
    throw error;
  }
};

export const updateMusic = async (musicId, musicData) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.put(`/music/update/${musicId}`, musicData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error updating music:', error);
    throw error;
  }
};

export const deleteMusic = async (musicId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.delete(`/music/delete/${musicId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error deleting music:', error);
    throw error;
  }
};

// Complaint APIs

export const sendComplaint = async (complaintData, userId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post('/complaint/submit-complaint', {
      complaint: complaintData,
      userId
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });    
    return response?.data;
  } catch (error) {
    console.error('Error sending complaint:', error);
    throw error;
  }
};

export const getAllComplaints = async () => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get('/complaints/get-complaints', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

export const resolveComplaint = async (complaintId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.put(`/complaints/resolve/${complaintId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error resolving complaint:', error);
    throw error;
  }
};

export const deleteComplaint = async (complaintId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.delete(`/complaints/delete/${complaintId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
};
export const getAllMerchandise = async () => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get('/merchandise/getAll', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error fetching merchandise:', error);
    throw error;
  }
};

export const getMerchandiseById = async (merchandiseId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get(`/merchandise/${merchandiseId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error fetching merchandise by ID:', error);
    throw error;
  }
};
// Add this function to your API file
export const submitPaymentDetails = async (paymentDetails) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post('/payment/payment-details', paymentDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error submitting payment details:', error);
    throw error;
  }
};

// Get all payment details
export const getAllPaymentDetails = async (userId) => {
  console.log(userId);
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get(`/payment/payment-details?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};

// Get payment detail by ID
export const getPaymentDetailById = async (paymentDetailId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get(`/payment/payment-details/${paymentDetailId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching payment detail by ID:', error);
    throw error;
  }
};

// Update payment detail by ID
export const updatePaymentDetail = async (paymentDetailId, paymentDetails) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.put(`/payment-details/${paymentDetailId}`, paymentDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error updating payment detail:', error);
    throw error;
  }
};

// Delete payment detail by ID
export const deletePaymentDetail = async (paymentDetailId) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.delete(`/payment-details/${paymentDetailId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error deleting payment detail:', error);
    throw error;
  }
};

export const saveRecentSearch = async (searchDetails) => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.post('/recentsearches/recent-searches', searchDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error saving recent search:', error);
    throw error;
  }
};

export const getAllRecentSearches = async () => {
  try {
    const token = await getAuthToken();
    const response = await axiosClient.get(`/recentsearches/recent-searches`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};