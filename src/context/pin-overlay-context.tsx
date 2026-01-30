import { createContext, ReactNode, useCallback, useState } from "react";
import { LayoutRectangle } from "react-native";
import { PinData } from "../components/pin-card";

interface PinOverlayState {
    isActive: boolean;
    pin: PinData | null;
    layout: LayoutRectangle | null;
}

interface PinOverlayContextValue {
    state: PinOverlayState;
    showOverlay: (pin: PinData, layout: LayoutRectangle) => void;
    hideOverlay: () => void;
}

export const PinOverlayContext = createContext<PinOverlayContextValue | null>(
    null
);

export function PinOverlayProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<PinOverlayState>({
        isActive: false,
        pin: null,
        layout: null,
    });

    const showOverlay = useCallback((pin: PinData, layout: LayoutRectangle) => {
        setState({ isActive: true, pin, layout });
    }, []);

    const hideOverlay = useCallback(() => {
        setState({ isActive: false, pin: null, layout: null });
    }, []);

    return (
        <PinOverlayContext.Provider value={{ state, showOverlay, hideOverlay }}>
            {children}
        </PinOverlayContext.Provider>
    );
}
