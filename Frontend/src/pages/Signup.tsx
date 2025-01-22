import { Link, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@pshycodr/medium-common/dist";
import { useValidation } from "../hooks/useValidation"; // Import the hook

export const Signup = () => {
    return (
        <div className="grid grid-cols-2">
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
        if (user) {
            navigate("/blogs"); 
        }
    }, [user, navigate]);

    // Handle input changes
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // Validate inputs
    const validate = () => {
        const newErrors: any = {};
        if (!inputs.username.trim()) {
            newErrors.username = "Username is required.";
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
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                inputs
            );

            const jwt = response.data.jwt;
            console.log(jwt);
            localStorage.setItem("token", `Bearer ${jwt}`);
            localStorage.setItem('name', response.data.user.name)

            if (inputs.name) {
                localStorage.setItem("name", inputs.name);
            }

            navigate("/blogs");
        } catch (error: any) {
            alert("Failed to sign up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-[400px] flex flex-wrap justify-center flex-col gap-3">
            <div className="text-3xl font-bold mb-2">{type}</div>

            <form
                onSubmit={onSubmitHandler}
                className="flex flex-wrap flex-col gap-3"
            >
                <div>
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
                </div>

                <div>
                    <Input
                        type="text"
                        label="Email"
                        name="username"
                        placeholder="email@example.com"
                        onChange={onChangeHandler}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">
                            {errors.username}
                        </p>
                    )}
                </div>

                <div>
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Password"
                        onChange={onChangeHandler}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>
                    )}
                </div>

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
                        {loading ? "Signing up..." : type}
                    </button>
                </div>
            </form>

            <div className="text-slate-500 text-s">
                <p>
                    Already have an account?{" "}
                    <Link to={"/signin"} className="underline">
                        signin here
                    </Link>
                </p>
            </div>
        </div>
    );
}
