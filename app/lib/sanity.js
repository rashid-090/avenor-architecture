import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "xrx9b4l4",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder({
  projectId: "xrx9b4l4",
  dataset: "production",
});

export function urlFor(source) {
  if (!source) return "";
  return builder.image(source);
}
