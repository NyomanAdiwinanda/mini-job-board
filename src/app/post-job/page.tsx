"use client";
import React, { useEffect } from "react";

import JobForm from "@/components/JobForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const PostJobPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/signin");
		}
	}, [user, loading, router]);

	if (loading || !user) return null;

	return (
		<div className="min-h-screen bg-page">
			<main className="flex flex-col items-center justify-center min-h-[80vh]">
				<JobForm submitLabel="Post Job" />
			</main>
		</div>
	);
};

export default PostJobPage;
