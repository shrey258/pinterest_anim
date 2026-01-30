import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";

export interface PinData {
  id: string;
  imageUrl: string;
  title?: string;
  author?: string;
  height: number; // For masonry layout
}

interface PinCardProps {
  pin: PinData;
  onPress?: () => void;
}

export function PinCard({ pin, onPress }: PinCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          borderRadius: 16,
          borderCurve: "continuous",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Image
          source={{ uri: pin.imageUrl }}
          style={{
            width: "100%",
            height: pin.height,
          }}
          contentFit="cover"
          transition={200}
        />
        {(pin.title || pin.author) && (
          <View style={{ padding: 8, gap: 2 }}>
            {pin.title && (
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#111",
                }}
              >
                {pin.title}
              </Text>
            )}
            {pin.author && (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  color: "#767676",
                }}
              >
                {pin.author}
              </Text>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
