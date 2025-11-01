import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Axios from "../../api/axios";
import Apple from "../../assets/images/apple.png";
import Facebook from "../../assets/images/Facebook_Logo.png";
import Google from "../../assets/images/Google.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await Axios.post("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
      } else {
        Alert.alert("Error", "Failed to create account");
      }
    } catch (error: any) {
      console.log("Error", error?.message || "Failed to create account");
    }
  };

  const handleSignIn = () => {
    router.push("./SignIn");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-6 mb-8">
          <Text
            className="text-3xl font-bold text-gray-800, text-center"
            style={{ color: "#2E5BFF" }}
          >
            TrackFin
          </Text>
          <View className="flex-1 h-px bg-gray-300 mb-10" />
          <Text className="text-2xl font-semibold text-center text-gray-700">
            Create An Account
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-gray-700 ">
              First Name
            </Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
              autoCapitalize="words"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mt-2">
              Last name
            </Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
              autoCapitalize="words"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mt-2">
              Email
            </Text>
            <TextInput
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              autoComplete="email"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mt-2">
              {" "}
              Create Password
            </Text>

            <View>
              <TextInput
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
                className="absolute right-3 top-3"
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mt-2">
              Confirm Password
            </Text>
            <View>
              <TextInput
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((prev) => !prev)}
                activeOpacity={0.7}
                className="absolute right-3 top-3"
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">Or continue with</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <View className="flex-row justify-center space-x-4 mb-8">
          <TouchableOpacity className="px-3 py-3 ">
            <Image
              source={Google}
              resizeMode="cover"
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-3 py-3">
            <Image
              source={Apple}
              resizeMode="cover"
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-3 py-3">
            <Image
              source={Facebook}
              resizeMode="cover"
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-full bg-blue-600 py-4 rounded-lg mb-6"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mb-8">
          <Text className="text-gray-600">Already have an account</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text className="text-blue-600 font-semibold"> Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
