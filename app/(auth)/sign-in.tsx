import { Text, ScrollView, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import OAuth from "@/components/oAuth";
import { Link, useRouter } from "expo-router";
import ErrorModal from "@/components/errorModal";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { fetchLoginApi } from "@/services/auth";
import { signInSuccess } from "@/redux/slice/authSlice";
import { loginTypes } from "@/types/type";
import { ReactNativeModal } from "react-native-modal";
import { fetchVerifyEmailAPI } from "@/services/auth";
import { verifyEmailTypes } from "@/types/type";
import { RootState } from "@/redux/store";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginUser } = useSelector((state: RootState) => state.auth);

  const [signInErrorMsg, setSignInErrorMsg] = useState("");
  const [verifyErrorMsg, setVerifyErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: loginTypes) =>
      fetchLoginApi({ email, password }),

    onSuccess: (data) => {
      console.log("Login success:", data);

      // Check if user needs email verification
      if (data?.statusCode === 403) {
        // User not verified - show verification modal
        setUserEmail(form.email);
        setShowVerificationModal(true);
      } else {
        // User verified - proceed to home
        dispatch(signInSuccess(data));
        setForm({
          email: "",
          password: "",
        });
        router.replace("/(root)/(tabs)/home");
      }
    },

    onError: (err: any) => {
      console.log("Login failed:", err?.message);
      setSignInErrorMsg(err?.message || "Login failed");
    },
  });

  const handleLogin = () => {
    // Reset error messages
    setSignInErrorMsg("");
    setVerifyErrorMsg("");

    // Validate form
    if (!form.email || !form.password) {
      setSignInErrorMsg("Please fill in all fields");
      return;
    }

    loginMutation.mutate({
      email: form.email,
      password: form.password,
    });
  };

  // Verify email mutation
  const verifyMutation = useMutation({
    mutationFn: ({ token, email }: verifyEmailTypes) =>
      fetchVerifyEmailAPI({ token, email }),

    onSuccess: (data) => {
      console.log("Verification successful:", data);
      dispatch(signInSuccess(data));
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
      email:userEmail,
    });
  };

  const browseHome = () => {
    setShowSuccessModal(false);
    router.replace("/(root)/(tabs)/home");
  };

  return (
    <>
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
            <Text className="text-red-500 text-sm mt-1">{verifyErrorMsg}</Text>
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

      <ScrollView className="flex-1 bg-white">
        <SafeAreaView className="flex-1 bg-white">
          <View className="w-full h-[250px] relative">
            <Image
              source={images?.signUpCar}
              className="w-full z-0 h-[250px]"
            />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
              Welcome 👋
            </Text>
          </View>
          <View className="p-5">
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

            <CustomButton
              title={loginMutation.isPending ? "Signing In..." : "Sign In"}
              onPress={handleLogin}
              className="mt-6"
              disabled={loginMutation.isPending}
            />

            {/* OAuth */}
            <OAuth />

            <Link className="text-lg mt-10 text-center" href="/sign-up">
              <Text>Don't have an account? </Text>
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>

          {/* Error Modal */}
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
