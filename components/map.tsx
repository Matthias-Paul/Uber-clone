import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);
        setLoading(false);
      } catch (error) {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="w-full h-full rounded-2xl bg-gray-100 items-center justify-center">
        <ActivityIndicator size="large" color="#0286FF" />
        <Text className="mt-4 text-gray-600">Getting your location...</Text>
      </View>
    );
  }

  return (
    <View className="w-full h-full rounded-2xl bg-blue-100 items-center justify-center p-4">
      <Text className="text-lg font-bold mb-2">📍 Your Location</Text>
      {location && (
        <>
          <Text className="text-gray-700">
            Lat: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text className="text-gray-700">
            Lng: {location.coords.longitude.toFixed(6)}
          </Text>
          <Text className="text-sm text-gray-500 mt-4 text-center">
            Map will appear when you build with:{"\n"}
            npx expo run:android
          </Text>
        </>
      )}
    </View>
  );
};

export default Map;
