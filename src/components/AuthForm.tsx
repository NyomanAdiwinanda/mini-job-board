import React from "react";

interface AuthFormProps {
	type: "signin" | "signup";
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
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
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			{type === "signup" && (
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					required
					className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			)}
			<button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold mt-2">
				{type === "signin" ? "Sign In" : "Sign Up"}
			</button>
		</form>
	);
};

export default AuthForm;
