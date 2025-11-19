import { Text, ScrollView, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onPressSubmit = async()=>{

  }

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <SafeAreaView className="flex-1 bg-white ">
          <View className="w-full h-[250px] relative ">
            <Image
              source={images?.signUpCar}
              className="w-full z-0 h-[250px]  "
            />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
              Create Your Account
            </Text>
          </View>
          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons?.person}
              value={form?.name}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, name: value }))
              }
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons?.email}
              value={form?.email}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons?.lock}
              secureTextEntry={true}
              value={form?.password}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, password: value }))
              }
            />

            <CustomButton
              title={"Sign Up"}
              onPress={onPressSubmit}
              className="mt-6  "
            />

            {/* OAuth */}

            <Link className="text-lg  mb-1 mt-10 text-center  " href="/sign-in">
              <Text>Already have an account? </Text>
              <Text className="text-primary-500" >Log In</Text>
            </Link>
          </View>

          {/*verification modal */}


        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUp;
