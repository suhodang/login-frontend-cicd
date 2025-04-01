import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import MyPage from "../pages/MyPage";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/mypage"
                element={
                    <PrivateRoute>
                        <MyPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}