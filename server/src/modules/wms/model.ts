// Typebox schemas for WMS calls 
// Ref: https://docs.geoserver.org/stable/en/user/services/wms/reference.html#getmap

import { t } from 'elysia';


// === SCHEMAS ==================================
export const WmsGetSchema = t.Object({
	service: t.Literal('WMS'),
	version: t.Union([
		t.Literal('1.0.0'),
		t.Literal('1.1.0'),
		t.Literal('1.1.1'),
		t.Literal('1.3.0'),
	]),
	request: t.Literal('GetMap'),
	layers: t.String({ description: 'comma seperated list of layers' }),
	styles: t.Optional(t.String()),
	crs: t.Optional(t.String({ pattern: '/^EPSG:/i', description: "required for version=1.3.0" })),
	srs: t.Optional(t.String({ pattern: '/^EPSG:/i', description: "required for all version below 1.3.0" })),
	bbox: t.String({ pattern: '/(?:-?d+.?d*,){3}-?d+.?d+/' }),
	width: t.String({ pattern: '/^d+/' }),
	height: t.String({ pattern: '/^d+/' }),
	format: t.Union([
		t.String({ pattern: '/^image/png8?$/' }),
		t.Literal('image/jpeg'),
		t.Literal('image/vnd.jpeg-png'),
		t.Literal('image/vnd.jpeg-png8'),
		t.Literal('image/gif'),
		t.Literal('image/tiff'),
		t.Literal('image/tiff8'),
		t.Literal('image/geotiff'),
		t.Literal('image/geotiff8'),
		t.Literal('image/svg'),
		t.Literal('application/pdf'),
		t.Literal('rss'),
		t.Literal('kml'),
		t.Literal('kmz'),
		t.Literal('text/mapml'),
		t.Literal('application/openlayers'),
		t.Literal('application/json;type=utfgrid'),
	]),
	transparent: t.Optional(t.Boolean({ default: false })),
	bgcolor: t.Optional(t.String({ pattern: '^#[a-f0-9]{6}', default: '#FFFFFF', description: "a colour defined by an RGB hex code in format #RRGGBB" })),
	exceptions: t.Optional(t.String({ default: 'application/vnd.ogc.se_xml' })),
	time: t.Optional(t.String({ format: 'date-time' })),
	sld: t.Optional(t.String({ format: 'uri' })),
	sld_body: t.Optional(t.String({ format: 'uri' })),
});

// NOTE: Of questionable value
// export const WmsErrorSchema = t.Object({
// 	error: t.String(),
// 	code: t.Optional(t.Number()),
// });
// export type WmsError = typeof WmsErrorSchema.$infer;

// export interface WmsSuccessResponse {
// 	status: number;
// 	contentType: string;
// 	cacheControl?: string;
// }