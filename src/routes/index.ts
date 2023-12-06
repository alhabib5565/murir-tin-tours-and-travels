import { Router } from "express";
import { userRoute } from "./user.routes";
import { tourRoutes } from "./tour.routes";
import { reviewRoutes } from "./review.routes";


const router = Router()

const route = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/tour',
        route: tourRoutes
    },
    {
        path: '/review',
        route: reviewRoutes
    }
]

route.map(routeObj => router.use(routeObj.path, routeObj.route))


export const routes = router