import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    if (isLoggedIn) {
        navigate('/mypage');
        return null;
    }

    return (
        <div className="p-4 border border-gray-600 rounded-md w-96 m-auto">
            <LoginForm />
        </div>
    );
}