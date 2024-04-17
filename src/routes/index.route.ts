import { FastifyInstance } from "fastify";
import { catalogRoutes } from "./catalog.route";
export const IndexRoutes = (app: FastifyInstance) => {
    catalogRoutes(app)
}
