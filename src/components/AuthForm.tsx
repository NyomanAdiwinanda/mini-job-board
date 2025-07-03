import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AuthFormProps {
	type: "signin" | "signup";
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (!loading && user) {
			router.replace("/");
		}
	}, [user, loading, router]);

	const isSignup = type === "signup";
	const isDisabled = isSignup
		? !email || !password || !confirmPassword || password !== confirmPassword
		: !email || !password;

	return (
		<form
			onSubmit={onSubmit}
			className="bg-card p-8 rounded shadow-md w-full max-w-md mx-auto flex flex-col gap-4 text-card"
		>
			<h1 className="text-2xl font-bold text-center mb-4">{type === "signin" ? "Sign In" : "Sign Up"}</h1>
			<input
				type="email"
				name="email"
				placeholder="Email"
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			{isSignup && password.length > 0 && password.length < 6 && (
				<span className="text-red-500 text-sm -mt-2">6 characters minimum</span>
			)}
			{isSignup && (
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					required
					className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			)}
			<button
				type="submit"
				disabled={isDisabled}
				className={`bg-blue-600 text-white py-2 rounded font-semibold mt-2 transition-colors ${
					isDisabled ? "opacity-50 cursor-not-allowed hover:bg-blue-600" : "hover:bg-blue-700"
				}`}
			>
				{type === "signin" ? "Sign In" : "Sign Up"}
			</button>
		</form>
	);
};

export default AuthForm;
