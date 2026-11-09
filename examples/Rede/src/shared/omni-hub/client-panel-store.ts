
import { rootSignal } from "@adaptive-js/web";

const [isClientPanelOpen, setClientPanelOpen] = rootSignal<boolean>(false);

export const clientPanelOpen = isClientPanelOpen;

export function openClientPanel(): void {
  setClientPanelOpen(true);
}

export function closeClientPanel(): void {
  setClientPanelOpen(false);
}

export function toggleClientPanel(): void {
  console.log(isClientPanelOpen());
  setClientPanelOpen((open) => !open);
}
