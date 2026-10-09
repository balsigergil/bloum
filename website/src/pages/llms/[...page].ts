import type { APIRoute, GetStaticPaths } from "astro";
import { llmsFile, llmsPages } from "../../llms";

export const getStaticPaths = (async () =>
  (await llmsPages()).map((page) => ({
    params: { page },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  llmsFile(`llms/${params.page}`, "text/markdown");
