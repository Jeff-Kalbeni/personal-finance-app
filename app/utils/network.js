import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";

const isOnline = async () => {
  if (Platform.OS == "web") {
    return navigator.onLine;
  } else {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }
};

const subscribeToNetworkChanges = (callback) => {
  return NetInfo.addEventListener(callback);
};

export { isOnline };
export default subscribeToNetworkChanges;
