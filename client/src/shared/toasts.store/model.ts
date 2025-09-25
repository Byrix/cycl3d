import t, { type Static } from "typebox";

export const ToastSchema = t.Object({
	type: t.Union([
		t.Literal("error"),
		t.Literal("warning"),
		t.Literal("success"),
		t.Literal("info"),
	]),
	message: t.Optional(t.String()),
});
export type Toast = Static<typeof ToastSchema>;

export type ToastSignal = {
	toasts: Toast[];
	cook: (bread: Toast) => void;
	rmToast: () => void;
	warn: (message?: string) => void;
	err: (message?: string) => void;
	info: (message?: string) => void;
	success: (message?: string) => void;
};
