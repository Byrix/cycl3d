import axios, { type AxiosResponse } from "axios";
import { eq, sql } from "drizzle-orm";
import { status } from "elysia";
import { db } from "$/db";
import { lgas } from "$/db/schema";
import type { Geocoder } from "./model";

export abstract class Geocoding {
  async getBounds() {
    const bounds = await db
      .select({
        geom: sql<string>`ST_AsText(ST_Points(ST_Extent(${lgas.geom})))`,
      })
      .from(lgas)
      .where(eq(lgas.lgaCode25, "24600"));

    const pointMatch = bounds[0].geom.match(
      /(\(-?\d+(?:\.\d+) -?\d+(?:.\d+)?\))/g,
    );
    const points = pointMatch?.map((point: string) => {
      const matches = point.match(
        /\((?<longitude>[\d.-]+) (?<latitude>[\d.-]+)\)/,
      );
      if (!matches || !matches.groups)
        throw status(400, "Error processing boundary");
      const { longitude, latitude } = matches.groups;
      return {
        x: parseFloat(longitude),
        y: parseFloat(latitude),
      };
    });

    return JSON.stringify([
      points[0].x,
      points[0].y,
      points[3].x,
      points[3].y,
    ]).replaceAll(/\[?\]?/g, "");
  }

  static async query(q: string) {
    let resp: AxiosResponse<Geocoder.nominatimResponse[]>;
    try {
      resp = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: q,
          format: "jsonv2",
          limit: 5,
          countrycodes: "au",
          // viewbox: bounds,
        },
      });
      // biome-ignore lint/suspicious/noExplicitAny: catch error has to be any
    } catch (err: any) {
      console.error(err);
      const respStatus = err.response?.status ?? 502;
      const respMsg = err.message ?? "Bad Gateway";
      throw status(respStatus, respMsg);
    }

    const places = await resp.data
      .map((option) => ({
        name: option.display_name,
        rank: option.place_rank,
        bbox: option.boundingbox,
      }))
      .sort(
        (a: Geocoder.geocodeResponse, b: Geocoder.geocodeResponse) =>
          a.rank - b.rank,
      );

    // console.debug(places);

    // return JSON.stringify(places);
    return places;
  }
}
