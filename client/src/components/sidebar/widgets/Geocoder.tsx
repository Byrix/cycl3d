import type { GeocodeResponse } from "@cycl3d/server";
import { Icon } from "@iconify/react";
import { effect, signal } from "@preact/signals";
import { For } from "@preact/signals/utils";
import { deepSignal } from "deepsignal";
import { useEffect } from "preact/hooks";
import { map } from "$/shared/cesium.store";
import { useToasts } from "$/shared/toasts.store";
import Fieldset from "./Fieldset";

type GeocoderState = {
  results: GeocodeResponse[];
  isSubmitting: boolean;
  query: string;
  goTo: (ind: number) => void;
};
const state = deepSignal<GeocoderState>({
  results: [],
  isSubmitting: false,
  query: "",
  goTo: (ind: number) => {
    state.isSubmitting = true;
    const { bbox } = state.results[ind];
    map.zoomTo(bbox);
    state.results = [];
    inputValue.value = "";
    state.isSubmitting = false;
  },
});
const inputValue = signal("");

// TODO: Actual geocoding
const fakeSearch = async (q: string): Promise<GeocodeResponse[]> => {
  if (q == "") return [];
  state.isSubmitting = true;
  await new Promise((r) => setTimeout(r, 2000));
  state.isSubmitting = false;
  return [
    {
      rank: 14,
      name: "Melbourne, City of Melbourne, Victoria, Australia",
      bbox: [-38.49937, -37.40175, 144.44405, 146.1925],
    },
    {
      rank: 16,
      name: "Melbourne, Brevard County, Florida, United States",
      bbox: [28.0350148, 28.200533, -80.7482559, -80.5749441],
    },
    {
      rank: 16,
      name: "Melbourne, Logan Township, Marshall County, Iowa, United States",
      bbox: [41.9353692, 41.9497466, -93.1094543, -93.0963237],
    },
    {
      rank: 12,
      name: "City of Melbourne, Victoria, Australia",
      bbox: [-37.850667, -37.775451, 144.896981, 144.9913462],
    },
    {
      rank: 18,
      name: "Melbourne, City of Melbourne, Victoria, Australia",
      bbox: [-37.855527, -37.799446, 144.9514311, 144.989097],
    },
  ];
};
effect(() => {
  fakeSearch(state.query).then((res) => {
    if (state.query != "" && res.length === 0) {
      useToasts.cook({
        type: "warning",
        message: "No matching locations were found.",
      });
    }
    state.results = res;
  });
});

const Geocoder = () => {
  let timeout: number | null = null;

  // biome-ignore lint/correctness/useExhaustiveDependencies: is not dependent on timeout
  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      state.query = inputValue.value;
    }, 400);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [inputValue.value]);

  return (
    <Fieldset title="Search" help="Enter an address or location and go!">
      <label className="input w-full bg-base-200">
        <span className="label">
          {state.isSubmitting ? (
            <span class="loading loading-spinner loading-md" />
          ) : (
            <Icon icon="material-symbols:search" className="size-6" />
          )}
        </span>
        <input
          type="text"
          placeholder="Enter a location..."
          value={inputValue.value}
          disabled={state.isSubmitting}
          onInput={(e) => {
            inputValue.value = (e.target as HTMLInputElement).value;
          }}
        />
      </label>

      <ul class={`join join-vertical bg-base-100 rounded-box z-10`}>
        {state.$results != undefined && (
          <For each={state.$results}>
            {(place: GeocodeResponse, ind: number) => (
              <div class="tooltip" data-tip={place.name}>
                <li
                  key={ind}
                  onClick={() => state.goTo(ind)}
                  class="join-item btn btn-primary btn-soft text-sm font-light overflow-hidden text-ellipsis line-clamp-1 leading-8"
                >
                  {place.name}
                </li>
              </div>
            )}
          </For>
        )}
      </ul>
    </Fieldset>
  );
};

export default Geocoder;
