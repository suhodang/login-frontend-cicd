import axios from "axios";

interface UserInfo {
    username: string;
    email: string;
    password: string;
    phone_number: string;
};

export type loginData = Pick<UserInfo, 'email' | 'password'>;

const API_ADDRESS: string = import.meta.env.VITE_BACKEND_API_URL as string;

export async function registerApi<T extends UserInfo>(data: T) {
    const res = await axios.post(`${API_ADDRESS}/api/auth/signup`, data);
    return res.data;
}

export async function loginApi(data: loginData) {
    const res = await axios.post(`${API_ADDRESS}/api/auth/login`, data);
    const token = res.data.token;

    localStorage.setItem("token", token);
    return token;
}