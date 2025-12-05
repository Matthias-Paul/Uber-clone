import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

export default function Layout() {
  const TabIcon = ({ icon, focused }: { icon: any; focused: boolean }) => {
    return (
      <View
        className={`flex  flex-row rounded-full justify-center items-center ${
          focused ? "bg-general-300" : ""
        }`}
      >
        <View
          className={`rounded-full w-12 h-12 ml-3 items-center justify-center ${
            focused ? "bg-general-400" : ""
          }`}
        >
          <Image
            source={icon}
            tintColor="white"
            resizeMode="contain"
            className="w-7 h-7"
          />
        </View>
      </View>
    );
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          paddingBottom:30,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />

      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.list} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.chat} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
