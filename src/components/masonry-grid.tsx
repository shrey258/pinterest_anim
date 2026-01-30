import { View, useWindowDimensions } from "react-native";
import { PinCard, PinData } from "./pin-card";

interface MasonryGridProps {
    pins: PinData[];
    numColumns?: number;
    gap?: number;
}

export function MasonryGrid({
    pins,
    numColumns = 2,
    gap = 8,
}: MasonryGridProps) {
    const { width } = useWindowDimensions();
    const columnWidth = (width - gap * (numColumns + 1)) / numColumns;

    // Distribute pins into columns
    const columns: PinData[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights: number[] = Array(numColumns).fill(0);

    pins.forEach((pin) => {
        // Find the shortest column
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestColumn].push(pin);
        columnHeights[shortestColumn] += pin.height + gap + (pin.title ? 50 : 0);
    });

    return (
        <View
            style={{
                flexDirection: "row",
                paddingHorizontal: gap,
                gap: gap,
            }}
        >
            {columns.map((column, columnIndex) => (
                <View
                    key={columnIndex}
                    style={{
                        flex: 1,
                        gap: gap,
                    }}
                >
                    {column.map((pin) => (
                        <PinCard key={pin.id} pin={pin} />
                    ))}
                </View>
            ))}
        </View>
    );
}
