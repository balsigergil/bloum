import { llmsFile } from "../llms";

export const GET = () => llmsFile("llms.txt", "text/plain");
