import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("@auth_token", token);
  } catch (error) {
    console.error("Error storing token", error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("@auth_token");
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@auth_token");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export { getToken, removeToken, storeToken };
