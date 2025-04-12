import axios from "axios";
//I'm not really using the types, as they will be inferred
// import { Product, Order } from "../shared/types"; // Import your types

const BASE_URL = "http://localhost:3000/api";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data; // Type inferred based on response structure
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId: string) => {
  try {
    const response = await API.get(`/products/${productId}`);
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId: string) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    const response = await API.post("/orders", orderData);
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fetch all orders for a user
export const fetchUserOrders = async (userId: string) => {
  try {
    const response = await API.get(`/orders/${userId}`);
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// Fetch a specific order by ID
export const fetchOrderById = async (orderId: string) => {
  try {
    const response = await API.get(`/orders/order/${orderId}`);
    return response.data; // Type inferred
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};
