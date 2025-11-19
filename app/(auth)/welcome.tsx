import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/customButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1

  return (
    <>
      <SafeAreaView className="flex h-full items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-up")}
          className="w-full justify-end items-end p-5 flex "
        >
          <Text className="text-md text-black font-JakartaBold">Skip</Text>
        </TouchableOpacity>
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full " />
          }
          activeDot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full " />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((onboard) => (
            <View
              className="flex justify-center items-center p-5  "
              key={onboard?.id}
            >
              <Image
                source={onboard?.image}
                className="w-full h-[300px]  "
                resizeMode="contain"
              />
              <View className="w-full flex flex-row items-center justify-center mt-10  " > 
                <Text className="text-black font-bold text-3xl mx-10 text-center " >{onboard?.title}</Text>
              </View>
              <Text  className="text-md font-JakartaSemiBold text-center text-[#858585] mt-3 mx-10  " >{onboard?.description}</Text>
            </View>
          ))}
        </Swiper>
        <CustomButton
          title={ isLastSlide ? "Get Started" : "Next"}
          onPress={()=> isLastSlide ? router.replace("/(auth)/sign-up"):
            swiperRef.current?.scrollBy( 1 )  }
          className="mt-10 mb-5 w-[90%] "
        />
      </SafeAreaView>
    </>
  );
};

export default Onboarding;
