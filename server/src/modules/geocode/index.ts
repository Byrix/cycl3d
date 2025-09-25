// Middleware route for geocoding with Nominatim

import axios, { type AxiosResponse } from "axios";
import type { App } from "$/exports";
import { QuerySchema } from "./model";

export default (app: App) =>
  app.get(
    "/",
    async ({ request, set, status }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      // const bounds = await Geocoding.getBounds();

      let resp: AxiosResponse;
      try {
        resp = await axios.get(
          // `https://nominatim.openstreetmap.org/search?q=Unter%20den%20Linden%201%20Berlin&format=json&addressdetails=1&limit=1&polygon_svg=1`,
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              ...query.toJSON(),
              format: "jsonv2",
              limit: 5,
              // viewbox: bounds,
            },
          },
        );
        // biome-ignore lint/suspicious/noExplicitAny: catch error has to be any
      } catch (err: any) {
        const respStatus = err.response?.status ?? 502;
        const respMsg = err.message ?? "Bad Gateway";
        return status(respStatus, respMsg);
      }

      set.status = resp.status as number;
      const contentType = resp.headers["content-type"];
      if (contentType) set.headers["content-type"] = contentType;

      return status(resp.status, resp.data);
    },
    {
      query: QuerySchema,
      // response: QueryRespSchema,
      detail: {
        summary: "Geocoder",
        description: "Filtered geocoding via OSM-based Nominatim API",
        tags: ["Geocoding"],
      },
    },
  );
