import { deepSignal } from "deepsignal";
import v from "typebox/value";
import { type Toast, ToastSchema, type ToastSignal } from "./model";

const useToasts = deepSignal<ToastSignal>({
	toasts: [],
	cook: (bread: Toast) => {
		if (!v.Check(ToastSchema, bread))
			throw new TypeError(`Invalid toast: ${[...bread]}`);
		useToasts.toasts = [bread, ...useToasts.toasts];
	},
	rmToast: () => {
		useToasts.toasts.shift();
	},
	warn: (message?: string) => {
		const bread: Toast = { type: "warning", message: message };
		useToasts.cook(bread);
	},
	err: (message?: string) => {
		const bread: Toast = { type: "error", message: message };
		useToasts.cook(bread);
	},
	info: (message?: string) => {
		const bread: Toast = { type: "info", message: message };
		useToasts.cook(bread);
	},
	success: (message?: string) => {
		const bread: Toast = { type: "success", message: message };
		useToasts.cook(bread);
	},
});
type ToasterState = typeof useToasts;

export { useToasts, type ToasterState, type Toast };
