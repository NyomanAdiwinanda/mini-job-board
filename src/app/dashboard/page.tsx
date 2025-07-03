"use client";
import React, { useState } from "react";
import JobForm from "@/components/JobForm";
import { JobPost } from "@/entities/job-post";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useJobs } from "@/context/JobContext";
import { supabase } from "@/supabase/client";
import JobList from "@/components/JobList";
import Loading from "@/components/Loading";

const DashboardPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	const { loading: jobsLoading, fetchUserJobs } = useJobs();
	const [editingJob, setEditingJob] = useState<JobPost | null>(null);
	const [myJobs, setMyJobs] = useState<JobPost[]>([]);

	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	React.useEffect(() => {
		if (!loading && !user) {
			router.replace("/signin");
		}
	}, [user, loading, router]);

	React.useEffect(() => {
		if (user) {
			fetchUserJobs(user.id).then(setMyJobs);
		}
	}, [user, editingJob, fetchUserJobs]);

	if (loading || jobsLoading) return <Loading />;

	const handleDelete = async (id: string) => {
		await supabase.from("job_posts").delete().eq("id", id);
		setMyJobs(prev => prev.filter(job => job.id !== id));
	};

	const handleEdit = (job: JobPost) => {
		setEditingJob(job);
	};

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
		};
		await supabase.from("job_posts").update(updatedJob).eq("id", editingJob!.id);
		setEditingJob(null);
		if (user) {
			fetchUserJobs(user.id).then(setMyJobs);
		}
	};

	return (
		<div className="min-h-screen bg-page">
			<main className="max-w-4xl mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold mb-6 text-center">My Posted Jobs</h1>
				{editingJob ? (
					<JobForm initial={editingJob} onSubmit={handleUpdate} submitLabel="Update Job" />
				) : (
					<div className="grid gap-6 md:grid-cols-2">
						<JobList jobs={myJobs} onEdit={handleEdit} onDelete={handleDelete} />
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
