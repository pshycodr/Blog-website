import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";

export const useValidation = () => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/validation`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setUser(response.data.message);
            } catch (error) {
                setUser(false);
            }
        };

        checkUser();
    }, []);

    return user;
};
