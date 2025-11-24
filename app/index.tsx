import "./global.css";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  console.log("Auth state - isSignedIn:", isSignedIn, "isLoaded:", isLoaded);

  // Show loading spinner while checking auth state
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Once loaded, redirect based on auth state
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
