import { Text, ScrollView, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import OAuth from "@/components/oAuth";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import ErrorModal from "@/components/errorModal";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [signInErrorMsg, setSignInErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      if (form?.email === "" || form?.password === "") {
        setSignInErrorMsg("All fields are required!");
        console.log("all fields are required");
        return;
      }

      if (isSignedIn) {
        router.replace("/");
      }

      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      if (err && typeof err === "object" && "errors" in err) {
        const longMessage = err.errors?.[0]?.longMessage;

        setSignInErrorMsg(longMessage || "Something went wrong");
      } else {
        setSignInErrorMsg("Something went wrong");
      }

      console.log("error:", err);
    }
  };

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
              wellcome 👋
            </Text>
          </View>
          <View className="p-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons?.email}
              value={form?.email}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
            />
            <View className="flex relative">
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons?.lock}
                inputStyle="pr-14 "
                secureTextEntry={!showPassword}
                value={form?.password}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, password: value }))
                }
              />
              <Pressable
                className=" absolute bottom-6 right-2 "
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#858585"
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            </View>

            <CustomButton
              title={"Sign In"}
              onPress={onSignInPress}
              className="mt-6  "
            />

            {/* OAuth */}
            <OAuth />

            <Link className="text-lg mt-10 text-center  " href="/sign-up">
              <Text>Don&#39;t have an account? </Text>
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>

          {/*error modal */}
          <ErrorModal
            visible={!!signInErrorMsg}
            message={signInErrorMsg}
            onClose={() => setSignInErrorMsg("")}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignIn;
