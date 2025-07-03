"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import { useJobs } from "@/context/JobContext";
import JobForm from "@/components/JobForm";
import { useAuth } from "@/context/AuthContext";

const EditJobPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	const { jobList, updateJob } = useJobs();
	const params = useParams();
	const id = params.id as string;

	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	React.useEffect(() => {
		if (!loading && !user) {
			router.replace("/signin");
		}
	}, [user, loading, router]);

	const job = jobList.find(j => j.id === id);
	if (!job) return null;

	const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const updatedJob = {
			title: formData.get("title") as string,
			company_name: formData.get("company") as string,
			description: formData.get("description") as string,
			location: formData.get("location") as string,
			updated_at: new Date().toISOString(),
			job_type_id: formData.get("type") as string,
			country_id: formData.get("country") as string,
		};
		await updateJob(id, updatedJob);
		router.push("/dashboard");
		toast.success("Job updated", {
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
				<JobForm initial={job} onSubmit={handleUpdate} submitLabel="Update Job" />
			</main>
		</div>
	);
};

export default EditJobPage;
