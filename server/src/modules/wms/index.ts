// Proxy route for Geoserver

import axios, { type AxiosResponse } from "axios";
import { Readable } from "stream";
import { env } from "$/env";
import type { App } from "$/exports";
import { WmsGetSchema } from "./model";

// Config
const TIMEOUT = 15_000;

// Route
export default (app: App) =>
	app
		.get(
			"/",
			async ({ request, set, status }) => {
				const url = new URL(request.url);
				const query = url.searchParams;

				const targetUrl = `${env.GEOSERVER_BASE}?${query.toString()}`;
				let geoResponse: AxiosResponse<Readable>;
				try {
					geoResponse = await axios.get<Readable>(targetUrl, {
						responseType: "stream",
						timeout: TIMEOUT,
					});
				} catch (err: any) {
					const respStatus = err.response?.status ?? 502;
					const respMsg = err.message ?? "Bad Gateway";
					return status(respStatus, respMsg);
				}

				set.status = geoResponse.status as any;
				const contentType = geoResponse.headers["content-type"];
				if (contentType) set.headers["content-type"] = contentType;

				const cacheControl = geoResponse.headers["cache-control"];
				if (cacheControl) set.headers["cache-control"] = cacheControl;

				return status(geoResponse.status, geoResponse.data);
			},
			{
				query: WmsGetSchema,
				detail: {
					summary: "Web map service endpoint",
					description: "WMS endpoint for streaming the used datasets",
					tags: ["WMS"],
				},
			},
		)
		.get(
			"/health",
			() => ({
				status: "ok",
				timestamp: new Date().toISOString(),
			}),
			{
				detail: {
					summary: "WMS health check",
					description: "Returns the health status of the WMS endpoint",
					tags: ["WMS"],
				},
			},
		);
