import { deepSignal } from "deepsignal";

export const data = deepSignal({
  buildings: {
    show: true,
    loaded: false,
  },
  trees: {
    show: true,
    loaded: false,
  },
  roads: {
    show: true,
    loaded: false,
  },
});
