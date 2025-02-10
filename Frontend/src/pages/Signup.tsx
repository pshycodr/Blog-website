import { Link, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@pshycodr/medium-common/dist";
import { useValidation } from "../hooks/useValidation";

export const Signup = () => {
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="hidden lg:block relative">
                <Quote text="Let's Unleash your writing" />
            </div>
            <div className="w-screen h-screen flex items-center justify-center bg-gray-100 lg:w-auto lg:h-auto">
                <div>
                    <SignupForm type="Signup" />
                </div>
            </div>
        </div>
    );
};

function SignupForm({ type }: { type: "Signup" | "Signin" }) {
    const [inputs, setInputs] = useState<SignupInput>({
        username: "",
        name: "",
        password: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useValidation();

    useEffect(() => {
        if (user) navigate("/blogs");
    }, [user, navigate]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: any = {};
        if (!inputs.username.trim())
            newErrors.username = "Username is required.";
        if (!inputs.password) {
            newErrors.password = "Password is required.";
        } else if (inputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                inputs
            );
            const jwt = response.data.jwt;
            localStorage.setItem("token", `Bearer ${jwt}`);
            localStorage.setItem("name", response.data.user.name);
            navigate("/blogs");
        } catch (error) {
            alert("Failed to sign up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[400px] max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-4">{type}</h2>
            <form onSubmit={onSubmitHandler} className="space-y-4">
                <Input
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Full Name"
                    onChange={onChangeHandler}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}

                <Input
                    type="text"
                    label="Email"
                    name="username"
                    placeholder="email@example.com"
                    onChange={onChangeHandler}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                )}

                <Input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Password"
                    onChange={onChangeHandler}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                        loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Signing up..." : type}
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/signin" className="text-indigo-600 underline">
                    Sign in here
                </Link>
            </p>
        </div>
    );
}
