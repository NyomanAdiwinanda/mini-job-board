"use client";
import React from "react";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

const SignUpPage = () => {
	const router = useRouter();
	const { signUp } = useAuth();

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const error = await signUp(email, password);

		if (error) {
			toast.error("User already exist", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			});
			return;
		}

		router.push("/");
		toast.success("Sign up success", {
			position: "bottom-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
	};

	return (
		<div className="min-h-screen bg-page">
			<main className="flex flex-col items-center justify-center min-h-[80vh]">
				<AuthForm type="signup" onSubmit={handleSignUp} />
			</main>
		</div>
	);
};

export default SignUpPage;
