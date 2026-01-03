import { icons } from "@/constants";
import { setUserLatitude, setUserLongitude } from "@/redux/slice/locationSlice";
import { store } from "@/redux/store";
import { MarkerData } from "@/types/type";
import { calculateRegion, generateMarkersFromData } from "@/utils/map";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

type RootState = ReturnType<typeof store.getState>;

const Map = () => {
  const dispatch = useDispatch();
  const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useSelector((state: RootState) => state.location);
  const { drivers, selectedDriver } = useSelector((state: RootState) => state.driver);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const [loading, setLoading] = useState(true);

  const UberDrivers = [
    {
      "_id": "1",
      "first_name": "James",
      "last_name": "Wilson",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
    },
    {
      "_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
    },
    {
      "_id": "3",
      "first_name": "Michael",
      "last_name": "Johnson",
      "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.70"
    },
    {
      "_id": "4",
      "first_name": "Robert",
      "last_name": "Green",
      "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
      "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.90"
    }
  ]

  useEffect(() => {
    if (userLatitude && userLongitude) {
      const driversData = UberDrivers.map(driver => ({
        driver_id: parseInt(driver._id),
        first_name: driver.first_name,
        last_name: driver.last_name,
        profile_image_url: driver.profile_image_url,
        car_image_url: driver.car_image_url,
        car_seats: driver.car_seats,
        rating: parseFloat(driver.rating),
      }));
      
      const newMarkers = generateMarkersFromData({ 
        data: driversData, 
        userLatitude, 
        userLongitude 
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to show your location on the map"
          );
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        dispatch(setUserLatitude(currentLocation.coords.latitude));
        dispatch(setUserLongitude(currentLocation.coords.longitude));
        setLoading(false);
      } catch (error) {
        console.log("Error getting location:", error);
        setLoading(false);
      }
    })();
  }, []);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0286FF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (!userLatitude || !userLongitude) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Unable to get location. Please check your permissions or network.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        scrollEnabled={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={selectedDriver === marker._id ? icons.selectedMarker : icons.marker}
          /> 
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 300, // Give it a fixed height
    borderRadius: 16,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    color: "#6b7280",
  },
  errorText: {
    color: "#6b7280",
    textAlign: "center",
  },
});

export default Map;
