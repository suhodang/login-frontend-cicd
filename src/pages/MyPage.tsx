import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function MyPage() {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <div>
            오 자네 로그인을 했구만?
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}