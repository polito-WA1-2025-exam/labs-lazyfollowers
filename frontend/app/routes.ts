import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/poke/PokeCreationPage.jsx"),
    route("/user", "routes/user/UserInfoPage.jsx"),
] satisfies RouteConfig;