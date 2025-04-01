import { JSX } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

interface Prop {
    children: JSX.Element;
}

export default function PrivateRoute<T extends Prop>({children}: T) {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    return isLoggedIn ? children : <Navigate to={"/"} replace />;
}