import type { app } from "./app";
import type { Geocoder } from "./modules/geocode/model";

export type App = typeof app;

type GeocodeResponse = Geocoder.geocodeResponse;
export type { GeocodeResponse };
export type { SelectUser } from "./db/models";
