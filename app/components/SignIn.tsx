import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Apple from "../../assets/images/apple.png";
import Facebook from "../../assets/images/Facebook_Logo.png";
import Google from "../../assets/images/Google.png";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async () => {
    // if (!formData.email || !formData.password) {
    //   Alert.alert("Error", "Please fill in all required fields");
    //   return;
    // }

    router.push("../(tabs)/(home)/");

    // try {
    //   const response = await Axios.post("/auth/login", {
    //     email: formData.email,
    //     password: formData.password,
    //   });
    //   if (response.status === 200) {
    //     Alert.alert("Success", "Signed in successfully!");
    //     router.replace("/");
    //   } else {
    //     Alert.alert("Error", "Failed to sign in");
    //   }
    // } catch (error: any) {
    //   Alert.alert(
    //     "Error",
    //     error.response?.data?.message || "An error occurred during sign in"
    //   );
    // } finally {
    //   router.push("./home");
    // }
  };

  const handleSignUp = () => {
    router.push("./SignUp");
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    Alert.alert("Social Sign In", `Signing in with ${provider}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mt-6 mb-12">
            <Text
              className="text-3xl font-bold text-center text-gray-900"
              style={{ color: "#2E5BFF" }}
            >
              TrackFin
            </Text>
            <View className="flex-1 h-px bg-gray-300 mb-10" />
            <Text className="text-2xl font-semibold text-center text-gray-800">
              Welcome Back
            </Text>
          </View>

          <View className="space-y-6 mb-8">
            <View>
              <Text className="text-sm font-medium text-gray-700 m">Email</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 text-gray-900 text-base"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mt-3">
                Password
              </Text>
              <View>
                <TextInput
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 text-gray-900 text-base"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  activeOpacity={0.7}
                  className="absolute right-3 top-3"
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="self-start mt-2">
              <Text className="text-blue-600 font-medium text-sm">
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center my-4 mt-20">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm font-medium">
              Or continue with
            </Text>
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
            className="w-full bg-blue-600 py-5 rounded-xl mb-6 shadow-md"
            onPress={handleSignIn}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign in
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mb-12">
            <Text className="text-gray-600 text-base mx-1">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-blue-600 font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
