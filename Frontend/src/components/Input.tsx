import { ChangeEvent } from "react";

interface LableInputType {
    label?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, placeholder, type, name, onChange }: LableInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
                <sup className="text-red-700">*</sup>
            </label>
            <input
                type={type}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    );
}

export default Input;
