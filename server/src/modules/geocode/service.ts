import { eq, sql } from "drizzle-orm";
import { ElysiaCustomStatusResponse, status } from "elysia";
import { db } from "$/db";
import { lgas } from "$/db/schema";

// biome-ignore lint/complexity/noStaticOnlyClass: dawdadw
export abstract class Geocoding {
  static async getBounds() {
    const bounds = await db
      .select({
        geom: sql<string>`ST_AsText(ST_Points(ST_Extent(${lgas.geom})))`,
      })
      .from(lgas)
      .where(eq(lgas.lgaCode25, "24600"));

    const pointMatch = bounds[0].geom.match(
      /(\(-?\d+(?:\.\d+) -?\d+(?:.\d+)?\))/g,
    );
    const points = pointMatch?.map((point) => {
      const matches = point.match(
        /\((?<longitude>[\d.-]+) (?<latitude>[\d.-]+)\)/,
      );
      if (!matches || !matches.groups) return {};
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
}
