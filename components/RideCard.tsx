import { Ride } from "@/types/type";
import { Text, View, Image } from "react-native";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/utils/utils";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    origin_address,
    created_at,
    driver,
    ride_time,
    destination_address,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <>
      <View className="flex w-full flex-row justify-center items-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3   ">
        <View className=" flex flex-col justify-center items-center p-3 ">
          <View className=" flex flex-row justify-between items-center ">
            <Image
              source={{
                uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}  `,
              }}
              className=" w-[80px] h-[90px] rounded-lg  "
            />

            <View className=" flex flex-col mx-5 gap-y-5  flex-1 ">
              <View className="flex  flex-row items-center gap-x-2  ">
                <Image source={icons?.to} className="h-5 w-5 rounded-full  " />
                <Text
                  numberOfLines={1}
                  className="text-md font-JakartaMedium  "
                >
                  {origin_address}
                </Text>
              </View>

              <View className="flex  flex-row items-center gap-x-2  ">
                <Image
                  source={icons?.point}
                  className="h-5 w-5 rounded-full  "
                />
                <Text
                  numberOfLines={1}
                  className="text-md font-JakartaMedium  "
                >
                  {destination_address}
                </Text>
              </View>
            </View>
          </View>

          <View
            className="flex w-full flex-col bg-general-500 
          rounded-lg mt-5 p-3 items-start justify-center  "
          >
            <View className=" w-full flex flex-row items-center justify-between mb-5 ">
              <Text className=" text-md font-JakartaMedium text-gray-500  ">
                Date & Time
              </Text>

              <Text className=" text-md font-JakartaMedium text-gray-500  ">
                {formatDate(created_at)}, {formatTime(ride_time)}
              </Text>
            </View>

            <View className=" w-full flex flex-col items-center justify-between mb-5 ">
              <View className=" w-full flex flex-row items-center justify-between mb-5 ">
                <Text className=" text-md font-JakartaMedium text-gray-500  ">
                  Driver
                </Text>

                <Text className=" text-md font-JakartaMedium text-gray-500  ">
                  {driver?.first_name} {driver?.last_name}
                </Text>
              </View>

              <View className=" w-full flex flex-row items-center justify-between mb-5 ">
                <Text className=" text-md font-JakartaMedium text-gray-500  ">
                  Car Seats
                </Text>

                <Text className=" text-md font-JakartaMedium text-gray-500  ">
                  {driver?.car_seats}
                </Text>
              </View>

              <View className=" w-full flex flex-row items-center justify-between mb-5 ">
                <Text className=" text-md font-JakartaMedium text-gray-500  ">
                  Payment Status
                </Text>

                <Text className={` text-md capitalize font-JakartaMedium
                     text-gray-500 ${payment_status  ==="paid"? " text-green-500 ":"text-red-500" } `}>
                  {payment_status}
                </Text>
              </View>


            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default RideCard;
