import { ClientConfig, createClient } from "@sanity/client";

export const clientConfig: ClientConfig = {
  projectId: "yawjfnlv",
  dataset: "production",
  useCdn: false,
  apiVersion: "v1",
  token: process.env.SANITY_AUTH_TOKEN,
};

export const client = createClient(clientConfig);
