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

    const handleLogOut = async () => {
      try {
        dispatch(logOutSuccess());
        console.log("log out successfully");
        router.replace("/(auth)/sign-in");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">Profile screen </Text>
        <Pressable
          className="bg-primary w-full rounded-xl p-3 flex-row items-center justify-center mb-6"
          onPress={handleLogOut}
        >
          <Text className="ml-[6px] font-bold text-blue-500">Logout</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default Profile;
