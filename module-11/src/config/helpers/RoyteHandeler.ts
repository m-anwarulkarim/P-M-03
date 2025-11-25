import { IncomingMessage, ServerResponse } from "http";

type RouteHandeler = (req: IncomingMessage, res: ServerResponse) => void;

const route: Map<string, Map<string, RouteHandeler>> = new Map();

const addRoutes = (mathod: string, path: string, handeler: RouteHandeler) => {
  if (!route.has(mathod)) route.set(mathod, new Map());
  route.get(mathod)?.set(path, handeler);
};
export default addRoutes;
