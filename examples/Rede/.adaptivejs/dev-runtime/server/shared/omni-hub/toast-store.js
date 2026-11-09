import { rootSignal } from "@adaptive-js/web";
const [toastsSignal, setToasts] = rootSignal([]);
export const toasts = toastsSignal;
export function showToast(title, message, type = "success") {
	const id = Math.random().toString(36).slice(2, 9);
	setToasts((prev) => [...prev, {
		id,
		title,
		message,
		type
	}]);
	setTimeout(() => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, 3500);
}

//# sourceMappingURL=toast-store.js.map
