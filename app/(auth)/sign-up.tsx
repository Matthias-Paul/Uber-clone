import { Text, ScrollView, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";

const SignUp = () => {
  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <SafeAreaView className="flex-1 bg-white " >
          <View className="w-full h-[250px] relative ">
              <Image
                source={images?.signUpCar}
                className="w-full z-0 h-[250px]  "
              />
              <Text className=" " >Create your account</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUp;
