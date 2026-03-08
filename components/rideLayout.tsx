import { ReactNode, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { icons } from "@/constants";
import Map from "./map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className=" flex-1 bg-white ">
        <View className="flex flex-col flex-1 bg-blue-500 ">
          <View className="flex flex-row absolute z-10 top-5 items-center justify-start px-5 ">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center ">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl text-JakartaSemiBold ml-5 ">
              {" "}
              {title || "Go back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet keyboardBehavior="extend" ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
