import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { loginApi } from "../../api/auth";
import axios from "axios";

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [step, setStep] = useState<"email" | "password">("email");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const handleEmailNextStep = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("이메일 형식이 올바르지 않습니다.");
            return;
        }
        setError("");
        setStep("password");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await loginApi({ email, password });
            login(user);
            navigate('/mypage');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError("아이디 혹은 비밀번호가 틀렸습니다.");
            } else {
                setError("서버 오류가 발생했습니다.");
                console.error("Login error:", error);
            }        
        }
    };
    return (
        <div className="flex flex-col gap-2 max-w-md mx-auto rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold">로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`transition-opacity duration-300 ${step === "email" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        className="w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleEmailNextStep}
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
                    >
                        다음
                    </button>
                </div>
                <div className={`transition-opacity duration-300 ${step === "password" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                    <p className="mb-2 text-gray-700 border border-grey-600 p-3 rounded-xl">{email}</p>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        className="w-full p-3 border border-grey-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                    >
                        로그인
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <Link to="/register" className="text-center text-blue-500 hover:underline">회원가입</Link>
        </div>
    );
};