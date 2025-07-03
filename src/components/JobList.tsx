"use client";
import React from "react";
import { toast, Bounce } from "react-toastify";
import Link from "next/link";
import JobCard from "./JobCard";
import { JobPost } from "@/entities/job-post";
import { useJobs } from "@/context/JobContext";
import { EditButton, DeleteButton } from "./ActionButtons";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface JobListProps {
	jobs?: JobPost[];
	onEdit?: (job: JobPost) => void;
	onDelete?: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onEdit, onDelete }) => {
	const { jobList, loading } = useJobs();
	const data = jobs || jobList;
	const router = useRouter();

	if (loading)
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-page bg-opacity-60 z-50">
				<Loading />
			</div>
		);

	return (
		<>
			{data.map((job: JobPost) =>
				onEdit && onDelete ? (
					<Link key={job.id} href={`/jobs/${job.id}`} className="block">
						<JobCard job={job}>
							<div className="relative z-10 flex gap-2 justify-end mt-2" onClick={e => e.stopPropagation()}>
								<EditButton
									onClick={(e: React.MouseEvent) => {
										e.stopPropagation();
										e.preventDefault();
										router.push(`/jobs/${job.id}/edit`);
									}}
									className="font-bold text-base cursor-pointer z-20 text-blue-600 hover:underline mr-2"
								/>
								<DeleteButton
									onClick={(e: React.MouseEvent) => {
										e.stopPropagation();
										e.preventDefault();
										onDelete(job.id);
										toast.warning("Job deleted", {
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
									}}
									className="font-bold text-base cursor-pointer z-20"
								/>
							</div>
						</JobCard>
					</Link>
				) : (
					<Link key={job.id} href={`/jobs/${job.id}`}>
						<JobCard job={job} />
					</Link>
				)
			)}
		</>
	);
};

export default JobList;
