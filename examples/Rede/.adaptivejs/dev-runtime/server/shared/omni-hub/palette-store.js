import { rootSignal } from "@adaptive-js/web";
const [isPaletteOpen, setPaletteOpen] = rootSignal(false);
export const paletteOpen = isPaletteOpen;
export function openPalette() {
	setPaletteOpen(true);
}
export function closePalette() {
	setPaletteOpen(false);
}

//# sourceMappingURL=palette-store.js.map
