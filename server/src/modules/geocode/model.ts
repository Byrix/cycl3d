// Typebox schemas for Geocoding calls
// Ref: https://nominatim.org/release-docs/develop/api/Search

import { t } from "elysia";

export namespace Geocoder {
  export const QuerySchema = t.Object({
    q: t.String(),
  });
  export const NominatimResponseSchema = t.Object({
    place_id: t.Number(),
    licence: t.String(),
    osm_type: t.String(),
    osm_id: t.Number(),
    lat: t.Numeric(),
    lon: t.Numeric(),
    category: t.String(),
    type: t.String(),
    place_rank: t.Integer(),
    importance: t.Number(),
    addresstype: t.String(),
    name: t.String(),
    display_name: t.String(),
    boundingbox: t.Array(t.Number(), { minItems: 4 }),
  });
  export const ResponseSchema = t.Object({
    rank: t.Integer(),
    name: t.String(),
    bbox: t.Array(t.Number(), { minItems: 4, maxItems: 4}),
  });

  export type geocodeResponse = typeof ResponseSchema.static;
  export type nominatimResponse = typeof NominatimResponseSchema.static;
}
