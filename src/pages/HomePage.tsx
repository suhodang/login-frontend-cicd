import LoginForm from "../components/auth/LoginForm";

export default function HomePage() {
    return(
        <div className="p-4">
            <h1>Home page</h1>
            <LoginForm />
        </div>
    );
}