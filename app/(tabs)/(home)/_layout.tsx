import { Stack } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import Logo from "../../../assets/images/logo.png";

function logoTitle() {
  return (
    <View className=" flex-row items-center gap-5 mt-6">
      <Image
        source={Logo}
        style={{ width: 100, height: 50, tintColor: "#FFFF" }}
        resizeMode="contain"
      />
      <Text className="text-black">Home</Text>
    </View>
  );
}

const HomeLayout = () => {
  return <Stack screenOptions={{ headerShown: true }} />;
};

export default HomeLayout;
