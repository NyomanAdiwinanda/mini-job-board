"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

const SignInPage = () => {
	const router = useRouter();
	const { signIn } = useAuth();

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, resetFields: () => void) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const error = await signIn(email, password);

		if (error) {
			resetFields();
			toast.error("User not found", {
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

		toast.success("Sign in success", {
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
				<AuthForm type="signin" onSubmit={handleSignIn} />
			</main>
		</div>
	);
};

export default SignInPage;
