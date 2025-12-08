import { View, Text } from "react-native";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  textInputBackgroundColor,
  handlePress,
  containerStyle,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <>
      <View  className={` flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle} `} >
        <Text>Hello</Text>
      </View>
    </>
  );
};

export default GoogleTextInput;
