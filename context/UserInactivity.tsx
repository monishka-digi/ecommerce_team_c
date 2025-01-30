import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useNavigation } from "@react-navigation/native"; 

const storage = new MMKV({
  id: "UserInactivity",
});

const LOCK_TIME = 3000;

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    console.log("Previous State:", appState.current);
    console.log("Next State:", nextAppState);

    if (nextAppState === "inactive") {
      console.log("App is inactive, navigating to Lock Screen");
      navigation.navigate("Lock");
    } else if (nextAppState === "background") {
      console.log("App is in background, recording start time");
      recordStartTime();
    } else if (nextAppState === "active" && appState.current === "background") {
      console.log("App is active, checking elapsed time since background");
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      console.log("Elapsed time:", elapsed);

      if (elapsed >= LOCK_TIME) {
        console.log("Elapsed time exceeded LOCK_TIME, navigating to Lock Screen");
        navigation.navigate("Lock");
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};
