import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link, useRouter } from "expo-router";
import { logOutSuccess } from "@/redux/slice/authSlice";
const Profile = () => {

    const dispatch = useDispatch();
  const router = useRouter();
  const { loginUser } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Profile screen </Text>
        
      </SafeAreaView>
    </>
  );
};

export default Profile;
