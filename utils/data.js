"use client";
const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
import axios from "axios";

const UNSPLASH_BASE_URL = "https://api.unsplash.com";

export const fetchRandomPhotos = async () => {
  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/photos/random?count=10&client_id=${UNSPLASH_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch random photos");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserPhotos = async (username) => {
  try {
    const response = await axios.get(
      `${UNSPLASH_BASE_URL}/users/${username}/photos?client_id=${UNSPLASH_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user photos: " + error);
  }
};

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `${UNSPLASH_BASE_URL}/users/${username}?client_id=${UNSPLASH_API_KEY}`
    );

    console.log(response.data); 

    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data: " + error);
  }
};
