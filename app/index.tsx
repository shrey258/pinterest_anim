import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MasonryGrid } from "../src/components/masonry-grid";
import { PinOverlay } from "../src/components/pin-overlay";
import { samplePins } from "../src/data/sample-pins";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        {/* Top Row: Logo + Avatar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          {/* Pinterest Logo */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#E60023",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                P
              </Text>
            </View>
          </View>

          {/* Right side: Notifications + Avatar */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Pressable>
              <SymbolView
                name="bell.fill"
                size={22}
                tintColor="#111"
                weight="medium"
              />
            </Pressable>
            <Pressable>
              <SymbolView
                name="ellipsis.message.fill"
                size={22}
                tintColor="#111"
                weight="medium"
              />
            </Pressable>
            <Pressable>
              <Image
                source={{ uri: "https://i.pravatar.cc/100" }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                }}
              />
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EFEFEF",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 8,
            }}
          >
            <SymbolView
              name="magnifyingglass"
              size={18}
              tintColor="#767676"
              weight="medium"
            />
            <TextInput
              placeholder="Search for ideas"
              placeholderTextColor="#767676"
              style={{
                flex: 1,
                fontSize: 16,
                color: "#111",
              }}
            />
            <Pressable>
              <SymbolView
                name="camera.fill"
                size={20}
                tintColor="#767676"
                weight="medium"
              />
            </Pressable>
          </View>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            paddingBottom: 12,
          }}
        >
          {["All", "Today", "Architecture", "Travel", "Food", "Design", "Art"].map(
            (category, index) => (
              <Pressable
                key={category}
                style={{
                  backgroundColor: index === 0 ? "#111" : "#EFEFEF",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: index === 0 ? "#fff" : "#111",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            )
          )}
        </ScrollView>
      </View>

      {/* Masonry Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <MasonryGrid pins={samplePins} numColumns={2} gap={8} />
      </ScrollView>

      {/* Pin Overlay - renders above everything when active */}
      <PinOverlay />
    </View>
  );
}
