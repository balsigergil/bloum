import { llmsFile } from "../llms";

export const GET = () => llmsFile("llms-full.txt", "text/plain");
