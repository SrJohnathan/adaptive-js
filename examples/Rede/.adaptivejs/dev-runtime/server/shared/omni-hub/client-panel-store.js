import { rootSignal } from "@adaptive-js/web";
const [isClientPanelOpen, setClientPanelOpen] = rootSignal(false);
export const clientPanelOpen = isClientPanelOpen;
export function openClientPanel() {
	setClientPanelOpen(true);
}
export function closeClientPanel() {
	setClientPanelOpen(false);
}
export function toggleClientPanel() {
	console.log(isClientPanelOpen());
	setClientPanelOpen((open) => !open);
}

//# sourceMappingURL=client-panel-store.js.map
