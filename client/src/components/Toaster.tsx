import { Icon } from "@iconify/react";
import type { Toast as ToastType } from "$/shared/toasts.store";
import "$/styles/animations.css";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { ToasterState } from "$/shared/toasts.store";

const iconMap = {
  warning: "material-symbols:error-outline-rounded",
  error: "material-symols:cancel-outline-rounded",
  info: "material-symbols:info-outline-rounded",
  success: "material-symbols:check-circle-outline-rounded",
};

const Toaster = ({ toasterState }: { toasterState: ToasterState }) => {
  return (
    <div class="not-hover:stack toast toast-top toast-end z-1000">
      {toasterState.$toasts?.value.map((toast) => (
        <Toast {...toast} destroy={toasterState.rmToast} />
      ))}
      <div class="alert alert-info hidden"></div>
      <div class="alert alert-warning hidden"></div>
      <div class="alert alert-error hidden"></div>
      <div class="alert alert-success hidden"></div>
    </div>
  );
};

const Toast = ({
  type,
  message,
  destroy,
}: ToastType & { destroy: () => void }) => {
  const isMounted = useSignal(false);

  useEffect(() => {
    isMounted.value = true;
    setTimeout(() => {
      isMounted.value = false;
    }, 5000);
  });

  return (
    <div
      class={`alert alert-${type}`}
      style={isMounted && { animation: "fade-out 270ms ease-out 3s" }}
      onAnimationEnd={isMounted && destroy}
    >
      <Icon icon={iconMap[type]} className="size-10" />
      <div>
        <h3 class="font-medium underline">{type.toUpperCase()}</h3>
        <div class="text-sm font-light">{message}</div>
      </div>
    </div>
  );
};

export default Toaster;
