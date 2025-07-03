"use client";
import React from "react";
import { notFound } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useJobs } from "@/context/JobContext";

const JobDetailPage = () => {
	const { user } = useAuth();
	const { jobList } = useJobs();

	const params = useParams();
	const id = params.id as string;

	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	const job = jobList.find(j => j.id === id);
	if (!job) return notFound();

	return (
		<div className="min-h-screen bg-page">
			<main className="max-w-2xl mx-auto py-10 px-4">
				<div className="bg-card rounded-lg shadow-md p-8 text-card">
					<h1 className="text-3xl font-bold mb-2 text-[#FAFAFA]">{job.title}</h1>
					<div className="flex gap-4 items-center mb-4">
						<span className="text-lg font-semibold text-[#FFFFFF]">{job.company_name}</span>
						<span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.job_types?.type}</span>
					</div>
					<div className="text-[#3ECF8E] mb-6">
						{job.location ? `${job.location}, ` : ""}
						{job.countries?.name}
					</div>
					<p className="text-[#B4B4B4] whitespace-pre-line">{job.description}</p>
					<div className="text-xs text-gray-400 text-right mt-2">
						{new Date(job.updated_at).getTime() > new Date(job.created_at).getTime()
							? `Last Updated: ${new Date(job.updated_at).toLocaleDateString(undefined, {
									day: "2-digit",
									month: "short",
									year: "numeric",
							  })} - ${new Date(job.updated_at).toLocaleTimeString(undefined, {
									hour: "2-digit",
									minute: "2-digit",
									hour12: false,
							  })}`
							: `Created On: ${new Date(job.created_at).toLocaleDateString(undefined, {
									day: "2-digit",
									month: "short",
									year: "numeric",
							  })} - ${new Date(job.created_at).toLocaleTimeString(undefined, {
									hour: "2-digit",
									minute: "2-digit",
									hour12: false,
							  })}`}
					</div>
				</div>
			</main>
		</div>
	);
};

export default JobDetailPage;
