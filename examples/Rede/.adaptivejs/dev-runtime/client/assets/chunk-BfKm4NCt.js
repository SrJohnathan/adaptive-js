import { s as rootSignal } from "./chunk-CME3klQt.js";

//#region src/shared/omni-hub/toast-store.ts
const [toastsSignal, setToasts] = rootSignal([]);
const toasts = toastsSignal;
function showToast(title, message, type = "success") {
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

//#endregion
export { toasts as n, showToast as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstQmZLbTROQ3QuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9vbW5pLWh1Yi90b2FzdC1zdG9yZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290U2lnbmFsIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcbmltcG9ydCB0eXBlIHsgVG9hc3RJdGVtLCBUb2FzdFR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBbdG9hc3RzU2lnbmFsLCBzZXRUb2FzdHNdID0gcm9vdFNpZ25hbDxUb2FzdEl0ZW1bXT4oW10pO1xuXG5leHBvcnQgY29uc3QgdG9hc3RzID0gdG9hc3RzU2lnbmFsO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1RvYXN0KFxuICB0aXRsZTogc3RyaW5nLFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IFRvYXN0VHlwZSA9IFwic3VjY2Vzc1wiLFxuKTogdm9pZCB7XG4gIGNvbnN0IGlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgOSk7XG4gIHNldFRvYXN0cygocHJldikgPT4gWy4uLnByZXYsIHsgaWQsIHRpdGxlLCBtZXNzYWdlLCB0eXBlIH1dKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0VG9hc3RzKChwcmV2KSA9PiBwcmV2LmZpbHRlcigodG9hc3QpID0+IHRvYXN0LmlkICE9PSBpZCkpO1xuICB9LCAzNTAwKTtcbn0iXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sQ0FBQyxjQUFjLGFBQWEsV0FBd0IsQ0FBQyxDQUFDO0FBRTVELE1BQWEsU0FBUztBQUV0QixTQUFnQixVQUNkLE9BQ0EsU0FDQSxPQUFrQixXQUNaO0NBQ04sTUFBTSxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztDQUNoRCxXQUFXLFNBQVMsQ0FBQyxHQUFHLE1BQU07RUFBRTtFQUFJO0VBQU87RUFBUztDQUFLLENBQUMsQ0FBQztDQUMzRCxpQkFBaUI7RUFDZixXQUFXLFNBQVMsS0FBSyxRQUFRLFVBQVUsTUFBTSxPQUFPLEVBQUUsQ0FBQztDQUM3RCxHQUFHLElBQUk7QUFDVCJ9