import { Link, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { SigninInput } from "@pshycodr/medium-common/dist";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useValidation } from "../hooks/useValidation";

export const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* Left Section: Form */}
            <div className="flex items-center justify-center bg-gray-100">
                <SigninForm type="Signin" />
            </div>

            {/* Right Section: Quote */}
            <div className="hidden lg:block relative">
                <Quote text="Welcome Back" />
            </div>
        </div>
    );
};

function SigninForm({ type }: { type: "Signup" | "Signin" }) {
    const [inputs, setInputs] = useState<SigninInput>({
        name: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const user = useValidation(); 

    useEffect(() => {
        if (user) {
            navigate("/blogs"); 
        }
    }, [user, navigate]);

    // Handle input changes
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // Validate inputs
    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!inputs.username) {
            newErrors.username = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.username)) {
            newErrors.username = "Enter a valid email address.";
        }
        if (!inputs.password) {
            newErrors.password = "Password is required.";
        } else if (inputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const onSubmitHandler = async () => {
        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            // Replace with your API endpoint
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, inputs)

            const jwt = response.data.jwt

            localStorage.setItem('token', `Bearer ${jwt}`)
            localStorage.setItem('name', response.data.user.name)
            
            navigate('/blogs')
            // Optionally redirect to another page
        } catch (error: any) {
            console.log(error)
            alert(error.message || "Failed to sign in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">{type}</h2>

            <form
                className="space-y-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitHandler();
                }}
            >
                {/* Email Input */}
                <div>
                    <Input
                        type="email"
                        label="Email"
                        name="username"
                        placeholder="email@example.com"
                        onChange={onChangeHandler}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                {/* Password Input */}
                <div>
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Your Password"
                        onChange={onChangeHandler}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className={`w-full mt-3 py-2 px-4 rounded-md text-white font-semibold ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : type}
                    </button>
                </div>
            </form>

            {/* Helper Text */}
            <div className="mt-4 text-center text-sm text-gray-500">
                 <p>
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 underline font-semibold">
                            Sign Up
                        </Link>
                    </p>
                 
            </div>
        </div>
    );
}
