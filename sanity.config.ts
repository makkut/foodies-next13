/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "purple-weasel",
  projectId: "yawjfnlv",
  dataset: "production",
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })],
});
