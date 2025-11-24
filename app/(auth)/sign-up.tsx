import { Text, ScrollView, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import OAuth from "@/components/oAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Modal, { ReactNativeModal } from "react-native-modal";
import ErrorModal from "@/components/errorModal";
import { Ionicons } from "@expo/vector-icons";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [signUpErrorMsg, setSignUpErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    status: "",
    error: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    // Start sign-up process using email and password provided
    try {
      if (form?.email === "" || form.name === "" || form?.password === "") {
        setSignUpErrorMsg("All fields are required!");
        console.log("all fields are required");
        return;
      }

      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log("error:", err);
      if (err && typeof err === "object" && "errors" in err) {
        const longMessage = err.errors?.[0]?.longMessage;

        setSignUpErrorMsg(longMessage || "Something went wrong");
      } else {
        setSignUpErrorMsg("Something went wrong");
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification((prev) => ({ ...prev, status: "complete" }));
        setPendingVerification(false);

        // router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification((prev) => ({ ...prev, error: "Verification Failed" }));

      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (err && typeof err === "object" && "errors" in err) {
        setVerification((prev) => ({
          ...prev,
          error: err.errors?.[0]?.longMessage || "Something went wrong",
        }));
      } else {
        setVerification((prev) => ({
          ...prev,
          error: "Something went wrong",
        }));
      }

      console.log("error:", err);
    }
  };

  const BroweHome = () => {
    router.replace("/");
    setVerification((prev) => ({ ...prev, status: "" }));
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
            <View className="flex  relative">
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
              title={"Sign Up"}
              onPress={onSignUpPress}
              className="mt-6  "
            />

            {/* OAuth */}
            <OAuth />

            <Link className="text-lg mt-10 text-center  " href="/sign-in">
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Log In</Text>
            </Link>
          </View>
          <ErrorModal
            visible={!!signUpErrorMsg}
            message={signUpErrorMsg}
            onClose={() => setSignUpErrorMsg("")}
          />
          <ReactNativeModal isVisible={verification?.status === "complete"}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]   ">
              <Image
                source={images?.check}
                className="w-[110px] h-[110px] mx-auto my-5   "
              />
              <Text className="text-3xl font-JakartaBold text-center   ">
                Verified{" "}
              </Text>
              <Text className="text-base font-Jakarta text-gray-400 mt-2 mb-5 ">
                {" "}
                You have successfully verified your account.{" "}
              </Text>
              <CustomButton title="Browse Home" onPress={BroweHome} />
            </View>
          </ReactNativeModal>

          {/*verification modal */}
          <ReactNativeModal isVisible={pendingVerification}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]   ">
              <Text className="text-2xl font-JakartaExtraBold  mb-2   ">
                Verification{" "}
              </Text>
              <Text className=" font-Jakarta  mb-5   ">
                We&#39;ve sent a verificationcode to {form?.email}{" "}
              </Text>
              <InputField
                label="Code"
                icon={icons?.lock}
                keyboardType="numeric"
                value={code}
                placeholder="Enter your verification code"
                onChangeText={(code) => setCode(code)}
              />
              {verification?.error && (
                <Text className="text-red-500 mt-1 ">
                  {verification?.error}
                </Text>
              )}
              <CustomButton
                title="Verify"
                onPress={onVerifyPress}
                className="mt-5 bg-success-500 "
              />
            </View>
          </ReactNativeModal>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUp;
