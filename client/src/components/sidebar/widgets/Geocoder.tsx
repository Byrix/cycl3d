import type { GeocodeResponse } from "@cycl3d/server";
import { Icon } from "@iconify/react";
import { effect, Signal, signal } from "@preact/signals";
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
		const { boundingbox } = state.results[ind];
		map.zoomTo(boundingbox);
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
			place_id: 407734760,
			licence:
				"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
			osm_type: "relation",
			osm_id: 4246124,
			lat: "-37.8142454",
			lon: "144.9631732",
			category: "boundary",
			type: "administrative",
			place_rank: 14,
			importance: 0.752619858192843,
			addresstype: "city",
			name: "Melbourne",
			display_name: "Melbourne, City of Melbourne, Victoria, Australia",
			boundingbox: ["-38.4993700", "-37.4017500", "144.4440500", "146.1925000"],
		},
		{
			place_id: 277495995,
			licence:
				"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
			osm_type: "relation",
			osm_id: 117646,
			lat: "28.0785034",
			lon: "-80.6077908",
			category: "boundary",
			type: "administrative",
			place_rank: 16,
			importance: 0.5187105217694741,
			addresstype: "city",
			name: "Melbourne",
			display_name: "Melbourne, Brevard County, Florida, United States",
			boundingbox: ["28.0350148", "28.2005330", "-80.7482559", "-80.5749441"],
		},
		{
			place_id: 345483954,
			licence:
				"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
			osm_type: "relation",
			osm_id: 129273,
			lat: "41.9430186",
			lon: "-93.1030319",
			category: "boundary",
			type: "administrative",
			place_rank: 16,
			importance: 0.4583192596762687,
			addresstype: "village",
			name: "Melbourne",
			display_name:
				"Melbourne, Logan Township, Marshall County, Iowa, United States",
			boundingbox: ["41.9353692", "41.9497466", "-93.1094543", "-93.0963237"],
		},
		{
			place_id: 18925078,
			licence:
				"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
			osm_type: "relation",
			osm_id: 2404870,
			lat: "-37.8123825",
			lon: "144.9482613",
			category: "boundary",
			type: "administrative",
			place_rank: 12,
			importance: 0.44858009478901617,
			addresstype: "municipality",
			name: "City of Melbourne",
			display_name: "City of Melbourne, Victoria, Australia",
			boundingbox: ["-37.8506670", "-37.7754510", "144.8969810", "144.9913462"],
		},
		{
			place_id: 19033090,
			licence:
				"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
			osm_type: "relation",
			osm_id: 2383266,
			lat: "-37.8141705",
			lon: "144.9655616",
			category: "boundary",
			type: "administrative",
			place_rank: 18,
			importance: 0.4427950632796455,
			addresstype: "suburb",
			name: "Melbourne",
			display_name: "Melbourne, City of Melbourne, Victoria, Australia",
			boundingbox: ["-37.8555270", "-37.7994460", "144.9514311", "144.9890970"],
		},
	];
};
effect(() => {
	fakeSearch(state.query).then((res) => {
		if (state.query != "" && res.length === 0) {
			useToasts.addToast({
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
				<For each={state.$results as Signal<GeocodeResponse>}>
					{(place: GeocodeResponse, ind: number) => (
						<div class="tooltip" data-tip={place.display_name}>
							<li
								key={ind}
								onClick={() => state.goTo(ind)}
								class="join-item btn btn-primary btn-soft text-sm font-light overflow-hidden text-ellipsis line-clamp-1 leading-8"
							>
								{place.display_name}
							</li>
						</div>
					)}
				</For>
			</ul>
		</Fieldset>
	);
};

export default Geocoder;
