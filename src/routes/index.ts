import { Router } from "express";
import { userRoute } from "./user.routes";
import { tourRoutes } from "./tour.routes";
import { reviewRoutes } from "./review.routes";
import { bookingRoutes } from "./bookings.routes";
import { authRoutes } from "./auth.routes";


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
    },
    {
        path: '/booking',
        route: bookingRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
]

route.map(routeObj => router.use(routeObj.path, routeObj.route))


export const routes = router