import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

const Index = () => {
  return (
    <SafeAreaView className=" flex-1 bg-white ">
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold " style={{ color: "#2E5BFF" }}>
          Welcome to TrackFin
        </Text>
        <Button
          title="Sign Up"
          onPress={() => {
            router.push("../components/SignUp");
          }}
          color="#3b82f6"
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

//Remember to uncomment the sync logic below if you want to enable automatic syncing of pending transactions when the app starts or when network connectivity is restored.
/*
import { useEffect } from 'react';
import { syncPendingTransactions } from './utils/syncHelper';

// Sync when app starts
useEffect(() => {
  const initialSync = async () => {
    await syncPendingTransactions();
  };
  initialSync();
}, []);

// Sync when network connectivity is restored
import { NetInfo } from '@react-native-community/netinfo';

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      await syncPendingTransactions();
    }
  });

  return () => unsubscribe();
}, []);
*/
