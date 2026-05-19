import { useState } from "react";
import { useLoginMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!email || !password) {
            setErrorMsg("Please fill all fields");
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();

            if (!res?.token || !res?.user) {
                throw new Error("Invalid auth response from server");
            }

            dispatch(setCredentials(res));

            +            // redirect to dashboard
                navigate("/");
        } catch (error: any) {
            console.error('Login failed:', error);
            const errorMessage =
                error?.data?.error ||
                error?.message ||
                (error?.data ? JSON.stringify(error.data) : "Invalid email or password");
            setErrorMsg(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
            <div className="bg-white p-8 rounded-xl shadow-sm w-[360px]">

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Login
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#5A6ACF]"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#5A6ACF]"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error */}
                    {errorMsg && (
                        <p className="text-sm text-red-500">{errorMsg}</p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#5A6ACF] text-white py-2 rounded-lg hover:opacity-90 transition"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Demo Credentials */}
                <p className="text-xs text-gray-400 mt-4 text-center">
                    Demo: admin@gmail.com / 123456
                </p>
            </div>
        </div>
    );
};

export default LoginPage;