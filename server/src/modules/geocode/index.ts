// Middleware route for geocoding with Nominatim

import type { App } from "$/exports";
import { Geocoder } from "./model";
import { Geocoding } from "./service";

export default (app: App) =>
  app.get(
    "/",
    async ({ request, set, status }) => {
      const url = new URL(request.url);
      const { q } = url.searchParams.toJSON();

      let resp: Response;
      try {
        resp = await Geocoding.query(q);
        // biome-ignore lint/suspicious/noExplicitAny: catch error has to be any
      } catch (err: any) {
        console.error(err);
        return status(
          err.response?.status ?? 502,
          err.message ?? "Bad Gateway",
        );
      }

      set.status = resp.status as number;
      const contentType = resp.headers.get("content-type");
      if (contentType) set.headers["content-type"] = contentType;

      console.debug(resp.body);
      return status(resp.status, resp.body);
    },
    {
      query: Geocoder.QuerySchema,
      response: Geocoder.ResponseSchema,
      detail: {
        summary: "Geocoder",
        description: "Filtered geocoding via OSM-based Nominatim API",
        tags: ["Geocoding"],
      },
    },
  );
