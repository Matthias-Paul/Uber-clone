import { useEffect, useMemo, useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { GoogleInputProps } from "@/types/type";
import { icons } from "@/constants";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";

type NominatimPlace = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  country?: string;
};

type RootState = ReturnType<typeof store.getState>;

const GoogleTextInput = ({
  icon,
  textInputBackgroundColor,
  handlePress,
  containerStyle,
  initialLocation,
}: GoogleInputProps) => {
  const { userLatitude, userLongitude } = useSelector(
    (state: RootState) => state.location
  );
  const [query, setQuery] = useState(initialLocation ?? "");
  const [results, setResults] = useState<NominatimPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);

  const canSearch = useMemo(
    () => hasUserTyped && query.trim().length >= 3,
    [hasUserTyped, query]
  );

  useEffect(() => {
    let isCancelled = false;

    if (!canSearch) {
      setResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);

        const normalizedQuery = query.trim();
        const hasUserLocation =
          typeof userLatitude === "number" && typeof userLongitude === "number";
        const queryWithFallback = `${normalizedQuery}, Nigeria`;
        const locationBias = hasUserLocation
          ? `&lat=${userLatitude}&lon=${userLongitude}`
          : "&lat=9.082&lon=8.6753";

        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            queryWithFallback
          )}&limit=20${locationBias}`
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = (await response.json()) as {
          features?: Array<{
            properties?: {
              osm_id?: number;
              name?: string;
              city?: string;
              state?: string;
              country?: string;
            };
            geometry?: {
              coordinates?: [number, number];
            };
          }>;
        };

        const mappedResults: NominatimPlace[] = (data.features ?? [])
          .map((feature, index) => {
            const coords = feature.geometry?.coordinates ?? [NaN, NaN];
            const longitude = Number(coords[0]);
            const latitude = Number(coords[1]);
            const p = feature.properties;
            const label = [p?.name, p?.city, p?.state, p?.country]
              .filter(Boolean)
              .join(", ");

            return {
              id: String(p?.osm_id ?? index),
              label: label || query,
              latitude,
              longitude,
              country: p?.country,
            };
          })
          .filter(
            (item) =>
              !Number.isNaN(item.latitude) && !Number.isNaN(item.longitude)
          )
          .filter((item) => {
            const country = String(item.country ?? "").toLowerCase().trim();
            const labelText = String(item.label ?? "").toLowerCase();

            return country === "nigeria" || labelText.includes("nigeria");
          });

        if (!isCancelled) {
          setResults(mappedResults);
          setShowResults(true);
        }
      } catch (error) {
        if (!isCancelled) {
          setResults([]);
          setShowResults(true);
        }
        console.log("place search error", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query, canSearch, userLatitude, userLongitude]);

  return (
    <>
      <View
        className={`relative z-10 rounded-xl mb-5 ${containerStyle}`}
        style={{ overflow: "visible" }}
      >
        <View className="flex flex-row items-center rounded-full bg-white px-4 ">
          <View className="justify-center items-center w-6 h-6 mr-2">
            <Image
              source={
                typeof icon === "string" ? { uri: icon } : icon || icons.search
              }
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
          <TextInput
            value={query}
            onChangeText={(value) => {
              setHasUserTyped(true);
              setQuery(value);
              if (!value.trim()) {
                setShowResults(false);
                setResults([]);
              }
            }}
            placeholder={initialLocation ?? "Where do you want to go?"}
            placeholderTextColor="gray"
            className="flex-1 text-[15px] font-JakartaSemiBold"
            style={{
              backgroundColor: textInputBackgroundColor || "white",
            }}
          />
          {loading ? (
            <ActivityIndicator size="small" color="#6b7280" />
          ) : null}
        </View>

        {showResults && results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            className="mt-2 rounded-xl"
            style={{
              backgroundColor: textInputBackgroundColor || "white",
              shadowColor: "#d4d4d4",
              zIndex: 999,
              elevation: 8,
              position: "absolute",
              left: 0,
              right: 0,
              top: 58,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-3 border-b border-neutral-200"
                onPress={() => {
                  const latitude = item.latitude;
                  const longitude = item.longitude;
                  const address = item.label;

                  setQuery(address);
                  setHasUserTyped(false);
                  setShowResults(false);
                  setResults([]);

                  if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
                    handlePress({
                      latitude,
                      longitude,
                      address,
                    });
                  }
                }}
              >
                <Text
                  numberOfLines={2}
                  className="text-[14px] font-JakartaMedium text-black"
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : null}

        {showResults && !loading && results.length === 0 && canSearch ? (
          <View
            className="mt-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: textInputBackgroundColor || "white" }}
          >
            <Text className="text-sm text-gray-500">No places found.</Text>
          </View>
        ) : null}
      </View>
    </>  
  );
};

export default GoogleTextInput;
