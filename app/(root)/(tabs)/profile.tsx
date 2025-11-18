import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Profile screen </Text>
      </SafeAreaView>
    </>
  );
};

export default Profile;
