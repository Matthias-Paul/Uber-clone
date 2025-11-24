import { View, Text, Image } from "react-native";
import CustomButton from "./customButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};
  return (
    <>
      <View>
        <View className="flex flex-row justify-center items-center my-4 gap-x-3  ">
          <View className="flex-1 h-[1px] bg-general-100 " />
          <Text className="text-lg">Or</Text>
          <View className="flex-1 h-[1px] bg-general-100 " />
        </View>

        <CustomButton
          className="shadow-none w-full"
          IconLeft={() => (
            <Image
              source={icons?.google}
              resizeMode="contain"
              className="w-5 h-5 mx-2 "
            />
          )}
          title="Log In With Google"
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
      </View>
    </>
  );
};

export default OAuth;
