import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION
const useCdn: boolean = !!process.env.NEXT_PUBLIC_SANITY_USE_CDN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published"
});
