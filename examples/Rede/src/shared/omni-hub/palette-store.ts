import { rootSignal } from "@adaptive-js/web";

const [isPaletteOpen, setPaletteOpen] = rootSignal<boolean>(false);

export const paletteOpen = isPaletteOpen;

export function openPalette(): void {
  setPaletteOpen(true);
}

export function closePalette(): void {
  setPaletteOpen(false);
}