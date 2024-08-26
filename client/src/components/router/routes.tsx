import {HOME_ROUT, LOGIN_ROUT, REGISTER_ROUT, PROFILE_ROUT, FAVORITE_ROUT} from "./const_routes_path.tsx"

import Auth from "../pages/auth-page.tsx"
import Home from "../pages/home-page.tsx"
import Profile from "../pages/profile-page.tsx"

export const authRoutes = [
    {
        path: HOME_ROUT,
        Component: Home
    },
    {
        path: PROFILE_ROUT,
        Component: Profile
    },
    {
        path: FAVORITE_ROUT,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUT,
        Component: Home
    },
    {
        path: LOGIN_ROUT,
        Component: Auth
    },
    {
        path: REGISTER_ROUT,
        Component: Auth
    },
]