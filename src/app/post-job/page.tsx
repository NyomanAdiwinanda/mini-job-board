"use client";
import React from "react";
import JobForm from "@/components/JobForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const PostJobPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!loading && !user) {
			router.replace("/signin");
		}
	}, [user, loading, router]);

	if (loading || !user) return null;

	const handlePostJob = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Job posted (mock)");
	};

	return (
		<div className="min-h-screen bg-page">
			<main className="flex flex-col items-center justify-center min-h-[80vh]">
				<JobForm onSubmit={handlePostJob} submitLabel="Post Job" />
			</main>
		</div>
	);
};

export default PostJobPage;
