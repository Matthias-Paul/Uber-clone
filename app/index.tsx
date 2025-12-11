import "./global.css";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const { loginUser } = useSelector((state: RootState) => state.auth);

  // Add this log to see what's happening
  console.log("loginUser state:", loginUser);

  // Check if Redux persist is still loading
  if (loginUser === undefined) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // User is logged in
  if (loginUser) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  // User is not logged in (loginUser is null)
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
