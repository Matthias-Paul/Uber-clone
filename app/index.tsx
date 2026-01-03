import "./global.css";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Index = () => {
  const { loginUser } = useSelector((state: RootState) => state.auth);

  console.log("loginUser state:", loginUser);

  if (loginUser === undefined) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (loginUser) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Index;
