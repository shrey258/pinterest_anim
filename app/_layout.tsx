import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PinOverlayProvider } from "../src/context/pin-overlay-context";

function TabIcon({
  name,
  focused,
}: {
  name:
  | "house.fill"
  | "magnifyingglass"
  | "plus.app.fill"
  | "bubble.left.and.bubble.right.fill"
  | "person.fill";
  focused: boolean;
}) {
  return (
    <SymbolView
      name={name}
      size={24}
      tintColor={focused ? "#000" : "#767676"}
      weight="medium"
    />
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinOverlayProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#fff",
              borderTopWidth: 0,
              height: 84,
              paddingTop: 8,
            },
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon name="house.fill" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="magnifyingglass" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="plus.app.fill" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="messages"
            options={{
              title: "Messages",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="bubble.left.and.bubble.right.fill" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="person.fill" focused={focused} />
              ),
            }}
          />
        </Tabs>
      </PinOverlayProvider>
    </GestureHandlerRootView>
  );
}
