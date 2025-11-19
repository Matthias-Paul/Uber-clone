import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Platform,
  Keyboard,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  iconStyle,
  containerStyle,
  inputStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-2 w-full  ">
            <Text
              className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}   `}
            >
              {label}
            </Text>
            <View
              className={`flex flex-row rounded-full justify-start items-center relative
                focus:border-primary-500 bg-neutral-100 border border-neutral-100 ${containerStyle}  `}
            >
              {icon && (
                <Image
                  source={icon}
                  className={`w-6 h-6 ml-4  ${iconStyle} `}
                />
              )}
              <TextInput
                className={`flex-1 rounded-full p-4 text-[15px] font-JakartaSemiBold text-left ${inputStyle}  `}
                secureTextEntry={secureTextEntry}
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};
export default InputField;
