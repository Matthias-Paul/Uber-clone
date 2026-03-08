import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RideLayout from "@/components/rideLayout";
import { RootState } from "@/redux/store";
import GoogleTextInput from "@/components/googleTextInput";
import { icons } from "@/constants";
import {
  setDestinationAddress,
  setDestinationLatitude,
  setDestinationLongitude,
  setUserAddress,
  setUserLatitude,
  setUserLongitude,
} from "@/redux/slice/locationSlice";
import CustomButton from "@/components/customButton";
import { useRouter } from "expo-router";

const FindRide = () => {
  const dispatch = useDispatch();
  const {
    destinationLatitude,
    userAddress,
    destinationLongitude,
    destinationAddress,
  } = useSelector((state: RootState) => state.location);

  console.log(
    destinationAddress,
    userAddress,
    destinationLatitude,
    destinationLongitude,
  );

  const router = useRouter();
  const handleUserLocationPress = async (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    dispatch(setUserAddress(location.address));
    dispatch(setUserLatitude(location.latitude));
    dispatch(setUserLongitude(location.longitude));
  };

  const handleDestinationPress = async (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    dispatch(setDestinationAddress(location.address));
    dispatch(setDestinationLatitude(location.latitude));
    dispatch(setDestinationLongitude(location.longitude));
  };

  return (
    <RideLayout title="Ride">
      <View className="my-3 ">
        <Text className="text-lg font-JakartaSemiBold  ">From</Text>
        <GoogleTextInput
          icon={icons.target}
          handlePress={(location) => handleUserLocationPress(location)}
          initialLocation={userAddress}
          textInputBackgroundColor="#f5f5f5"
          containerStyle="bg-neutral-100  "
        />
      </View>

      <View className="my-3 mb-15 ">
        <Text className="text-lg font-JakartaSemiBold  ">To</Text>
        <GoogleTextInput
          icon={icons.map}
          handlePress={(location) => handleDestinationPress(location)}
          initialLocation={destinationAddress}
          textInputBackgroundColor="transparent"
          containerStyle="bg-neutral-100  "
        />
      </View>

      <CustomButton
        title="Find Now"  
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
