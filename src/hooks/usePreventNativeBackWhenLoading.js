import { useEffect } from "react";
import { BackHandler } from "react-native";

export function usePreventNativeBackWhenLoading(backAction) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [backAction]);
}
