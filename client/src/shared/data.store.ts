import { effect } from "@preact/signals";
import { deepSignal } from "deepsignal";

export const data = deepSignal({
  buildings: {
    show: true,
    loaded: false,
  },
});
