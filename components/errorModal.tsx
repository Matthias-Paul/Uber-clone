import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { ErrorModalTypes } from "@/types/type";

const ErrorModal = ({ visible, message, onClose }: ErrorModalTypes) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-[280px] bg-white rounded-xl items-center">
          <View className="p-3 items-center">
            <Text className="text-lg font-semibold text-black mb-2">Error</Text>
            <Text className="text-sm text-primary text-center mb-5">
              {message}
            </Text>
          </View>

          <View className="flex-row border-t border-gray-200 w-full">
            <Pressable className="flex-1 py-3 items-center" onPress={onClose}>
              <Text className="text-[#028fff] font-JakartaSemiBold text-base">
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
