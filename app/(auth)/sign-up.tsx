import { Text, ScrollView, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import OAuth from "@/components/oAuth";
import { Link, useRouter } from "expo-router";
import { ReactNativeModal } from "react-native-modal";
import ErrorModal from "@/components/errorModal";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { fetchSignUpApi } from "@/services/auth";
import { signInSuccess } from "@/redux/slice/authSlice";
import { signUpTypes } from "@/types/type";
import { fetchVerifyEmailAPI } from "@/services/auth";
import { verifyEmailTypes } from "@/types/type";
import { RootState } from "@/redux/store";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginUser } = useSelector((state: RootState) => state.auth);

  const [signUpErrorMsg, setSignUpErrorMsg] = useState("");
  const [verifyErrorMsg, setVerifyErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "rider" as "rider" | "driver",
  });

  const signUpMutation = useMutation({
    mutationFn: ({ username, email, password, role }: signUpTypes) =>
      fetchSignUpApi({ username, email, password, role }),

    onSuccess: (data) => {
      console.log("Sign up success:", data);

      dispatch(signInSuccess(data?.data?.user));
      setUserEmail(form.email);
      setShowVerificationModal(true);

      // Keep email for verification, clear other fields
      setForm({
        username: "",
        email: form.email, 
        password: "",
        role: "rider",
      });
    },

    onError: (err: any) => {
      console.log("SignUp failed:", err?.message);
      setSignUpErrorMsg(err?.message || "SignUp failed");
    },
  });

  const handleSignUp = () => {
    // Reset error messages
    setSignUpErrorMsg("");
    setVerifyErrorMsg("");

    // Validate form
    if (!form.username || !form.email || !form.password) {
      setSignUpErrorMsg("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      setSignUpErrorMsg("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setSignUpErrorMsg("Password must be at least 6 characters");
      return;
    }

    signUpMutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    });
  };

  // Verify email mutation
  const verifyMutation = useMutation({
    mutationFn: ({ token, email }: verifyEmailTypes) =>
      fetchVerifyEmailAPI({ token, email }),

    onSuccess: (data) => {
      console.log("Verification successful:", data);
      dispatch(signInSuccess(data?.data?.user));
      setCode("");
      setShowVerificationModal(false);
      setShowSuccessModal(true);

    },

    onError: (err: any) => {
      console.log("Verification failed:", err?.message);
      setVerifyErrorMsg(err?.message || "Verification failed");
    },
  });

  const verifyEmail = () => {
    // Reset error
    setVerifyErrorMsg("");

    // Validate OTP
    if (!code || code.length !== 6) {
      setVerifyErrorMsg("Please enter a valid 6-digit code");
      return;
    }

    verifyMutation.mutate({
      token: code,
      email: userEmail,
    });
  };

  const browseHome = () => {
    setShowSuccessModal(false);
    router.replace("/(root)/(tabs)/home");
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <SafeAreaView className="flex-1 bg-white">
          <View className="w-full h-[250px] relative">
            <Image
              source={images?.signUpCar}
              className="w-full z-0 h-[250px]"
            />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
              Create Your Account
            </Text>
          </View>
          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons?.person}
              value={form?.username}
              onChangeText={
                (value) => setForm((prev) => ({ ...prev, username: value })) // ✅ Fixed: was 'name'
              }
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons?.email}
              value={form?.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
            />
            <View className="flex relative">
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons?.lock}
                inputStyle="pr-14"
                secureTextEntry={!showPassword}
                value={form?.password}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, password: value }))
                }
              />
              <Pressable
                className="absolute bottom-6 right-2"
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

            {/* Role Selection */}
            <View className="mt-4">
              <Text className="text-lg font-JakartaSemiBold mb-3">
                I want to
              </Text>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() =>
                    setForm((prev) => ({ ...prev, role: "rider" }))
                  }
                  className={`flex-1 p-4 rounded-lg border-2 ${
                    form.role === "rider"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center font-JakartaSemiBold ${
                      form.role === "rider"
                        ? "text-primary-500"
                        : "text-gray-500"
                    }`}
                  >
                    🚗 Book Rides
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    setForm((prev) => ({ ...prev, role: "driver" }))
                  }
                  className={`flex-1 p-4 rounded-lg border-2 ${
                    form.role === "driver"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center font-JakartaSemiBold ${
                      form.role === "driver"
                        ? "text-primary-500"
                        : "text-gray-500"
                    }`}
                  >
                    🚕 Drive & Earn
                  </Text>
                </Pressable>
              </View>
            </View>

            <CustomButton
              title={signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
              onPress={handleSignUp} 
              className="mt-6"
              disabled={signUpMutation.isPending}
            />

            {/* OAuth */}
            <OAuth />

            <Link className="text-lg mt-10 text-center" href="/sign-in">
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Log In</Text>
            </Link>
          </View>

          <ErrorModal
            visible={!!signUpErrorMsg}
            message={signUpErrorMsg}
            onClose={() => setSignUpErrorMsg("")}
          />

          {/* Success Modal */}
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images?.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base font-Jakarta text-gray-400 mt-2 mb-5 text-center">
                You have successfully verified your account.
              </Text>
              <CustomButton title="Browse Home" onPress={browseHome} />
            </View>
          </ReactNativeModal>

          {/* Verification Modal */}
          <ReactNativeModal isVisible={showVerificationModal}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaExtraBold mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5">
                We've sent a verification code to {userEmail || form.email}
              </Text>
              <InputField
                label="Code"
                icon={icons?.lock}
                keyboardType="numeric"
                value={code}
                placeholder="Enter your verification code"
                onChangeText={(value) => setCode(value)}
                maxLength={6}
              />
              {verifyErrorMsg && (
                <Text className="text-red-500 text-sm mt-1">
                  {verifyErrorMsg}
                </Text>
              )}
              <CustomButton
                title={verifyMutation.isPending ? "Verifying..." : "Verify"}
                onPress={verifyEmail}
                className="mt-5 bg-success-500"
                disabled={verifyMutation.isPending}
              />
              <Pressable
                onPress={() => {
                  setShowVerificationModal(false);
                  setCode("");
                  setVerifyErrorMsg("");
                }}
                className="mt-3"
              >
                <Text className="text-center text-gray-500">Cancel</Text>
              </Pressable>
            </View>
          </ReactNativeModal>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUp;
