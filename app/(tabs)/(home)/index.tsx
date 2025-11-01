import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../assets/images/logo.png";

function logoTitle() {
  return (
    <View className=" flex-row justify-between items-center mt-8 p-1">
      <Image
        source={Logo}
        style={{ width: 100, height: 30, tintColor: "#FFFF" }}
        resizeMode="contain"
      />

      <TouchableOpacity className="ml-20 rounded-full border border-gray-100 rounded-3xl p-1">
        <Feather name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const Home = () => {
  const router = useRouter();

  const transactions = [
    { id: 1, category: "Food", date: "2025-08-05", amount: 2000.0 },
    { id: 2, category: "Client Payment", date: "2025-08-02", amount: 1000.0 },
    { id: 3, category: "Rent", date: "2025-08-21", amount: 700.0 },
  ];

  const budgetProgress = [
    { category: "Food", percentage: 30, amount: 210.0 },
    { category: "Rent", percentage: 25, amount: 175.0 },
    { category: "Utilities", percentage: 20, amount: 210.0 },
  ];

  const quickAccessItems = [
    { title: "Add Transaction", icon: "➕" },
    { title: "Create Category", icon: "📁" },
    { title: "Create Budget", icon: "📊" },
  ];

  const handleTransactionsView = () => {
    router.push("/transactions");
  };

  const handleBudgetView = () => {
    router.push("/analytics");
  };

  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          title: "Home",
          headerTitle: logoTitle,
          headerStyle: { backgroundColor: "#2E5BFF" },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        contentContainerStyle={{ marginTop: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            TrackFin
          </Text>
          <Text className="text-lg text-gray-600">Welcome Back</Text>
        </View> */}

        <View className="flex-row mb-2 justify-between border border-gray-50">
          <View
            className="bg-blue-50 mr-3 rounded-xl p-2 mb-4"
            style={{ backgroundColor: "#2E5BFF", borderRadius: 10 }}
          >
            <View className="flex-row items-center mb-2 gap-2">
              <MaterialCommunityIcons
                name="credit-card-multiple-outline"
                size={19}
                color="white"
              />
              <Text className="text-sm font-semibold mb-2 text-white">
                Current Balance
              </Text>
            </View>
            <View
              className="justify-center items-center bg-white rounded-md p-4 "
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 5,
              }}
            >
              <Text className="text-lg font-bold text-gray-700 py-8 ">
                Gh¢ 300.00
              </Text>
            </View>
          </View>

          <View
            className="bg-blue-50 rounded-xl p-2 mb-4"
            style={{ backgroundColor: "#2E5BFF" }}
          >
            <View className="flex-row items-center mb-2 gap-2">
              <SimpleLineIcons name="graph" size={19} color="white" />
              <Text className="text-sm font-medium text-white text-blue-800 mb-2">
                Monthly Progress
              </Text>
            </View>
            <View
              className="justify-between bg-white rounded-md p-2"
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 5,
              }}
            >
              <View className="mb-2">
                <Text className="text-xs text-green-600">Income</Text>
                <Text className="text-lg font-semibold text-gray-900">
                  Gh¢ 2000.00
                </Text>
              </View>
              <View>
                <Text className="text-xs text-red-600">Expenses</Text>
                <Text className="text-lg font-semibold text-gray-900">
                  Gh¢ 700.00
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mx-0 mb-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <Text className="flex-row justify-between items-center mb-1">
            Recent Transactions
          </Text>
          <View className="flex-1 h-px bg-gray-300 mb-2" />
          <View className="mb-3" key={transactions[0].id}>
            <Text className="text-black ">
              Category: {transactions[0].category}
            </Text>
            <Text className="text-black ">Date: {transactions[0].date}</Text>
            <Text className="text-black ">
              Amount (Gh¢): {transactions[0].amount}
            </Text>
          </View>
          <View className="w-1/2 h-px bg-gray-300 mb-2" />
          <View className="mb-3" key={transactions[1].id}>
            <Text className="text-black ">
              Category: {transactions[1].category}
            </Text>
            <Text className="text-black ">Date: {transactions[1].date}</Text>
            <Text className="text-black ">
              Amount (Gh¢): {transactions[1].amount}
            </Text>
          </View>
          <View className="w-1/2 h-px bg-gray-300 mb-2" />
          <View className="mb-3" key={transactions[2].id}>
            <Text className="text-black ">
              Category: {transactions[2].category}
            </Text>
            <Text className="text-black ">Date: {transactions[2].date}</Text>
            <Text className="text-black ">
              Amount (Gh¢): {transactions[2].amount}
            </Text>
          </View>
          <TouchableOpacity className="" onPress={handleTransactionsView}>
            <Text className="text-blue-600 font-medium">View all</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-md font-semibold mb-1">Quick Access</Text>
          <View className="flex-1 h-px bg-gray-300 mb-3" />
          <View className="flex-row justify-between ">
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-2xl items-center py-3 px-3  shadow-sm border border-gray-100 w-1/3 mr-1"
                style={{ backgroundColor: "#2E5BFF" }}
              >
                <Text className="text-2xl mb-2 text-white">{item.icon}</Text>
                <Text className="text-sm font-medium text-center text-white">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-3 mb-3 p-2">
          <Text className="text-md font-semibold my-2">Budget Progress</Text>
          <View className="flex-1 h-px bg-gray-300 mb-2" />
          {budgetProgress.map((budget, index) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-4 mb-2 shadow-sm border border-gray-100"
            >
              <View className="flex-row justify-between mb-1">
                <View className="flex-row gap-3">
                  <Text className="text-black font-medium mb-2">
                    {budget.category}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {budget.percentage}%
                  </Text>
                </View>
                <Text className="text-sm text-gray-600">
                  Gh¢ {budget.amount} spent
                </Text>
              </View>
              <View className="w-full h-3 bg-gray-200 rounded-full mb-2">
                <View
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${budget.percentage}%` }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity className="" onPress={handleBudgetView}>
            <Text className="text-blue-600 font-medium">View all</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
