import t, { type Static, type TObject } from "typebox";
import v from "typebox/value";

function parseEnv<T extends TObject>(
  schema: T,
  env: Record<string, string | undefined>,
): Static<T> {
  const normalised = Object.fromEntries(
    Object.entries(env)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        const cleanKey = key.startsWith("VITE_") ? key.slice(5) : key;
        return [cleanKey, value] as const;
      })
      .filter(([key]) => Object.keys(schema.properties).includes(key)),
  );

  const withDefaults = v.Default(schema, normalised);
  const converted = v.Convert(schema, withDefaults);
  const isValid = v.Check(schema, converted);

  if (!isValid) {
    const errors = v.Errors(schema, converted);
    throw new Error(
      `Invalid environment variables: ${[...errors]
        .map((e) => e.message)
        .join(", ")}`,
    );
  }

  return converted;
}

const EnvDTO = t.Object({
  BASE_URL: t.String(),
  DEV: t.Boolean(),
  MODE: t.Enum({
    development: "development",
    production: "production",
  }),
  PROD: t.Boolean(),
  SSR: t.Boolean(),
  CESIUM_TOKEN: t.String(),
  GEOSERVER_BASE: t.String(),
});

export const env = parseEnv(EnvDTO, import.meta.env);
