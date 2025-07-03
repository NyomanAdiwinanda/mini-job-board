"use client";
import React from "react";
import { toast, Bounce } from "react-toastify";
import Link from "next/link";
import JobCard from "./JobCard";
import { JobPost } from "@/entities/job-post";
import { useJobs } from "@/context/JobContext";
import { EditButton, DeleteButton } from "./ActionButtons";
import { useRouter, usePathname } from "next/navigation";
import RenderIf from "@/utils/RenderIf";

interface JobListProps {
	jobs?: JobPost[];
	onEdit?: (job: JobPost) => void;
	onDelete?: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onEdit, onDelete }) => {
	const { jobList } = useJobs();
	const data = jobs || jobList;
	const router = useRouter();
	const pathname = usePathname();
	const isDashboard = pathname.includes("dashboard");

	if (!data || data.length === 0) {
		return (
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-gray-400 text-lg font-semibold">
				{isDashboard ? "No jobs created yet" : "No jobs available"}
			</div>
		);
	}

	return (
		<>
			{data.map((job: JobPost) => (
				<Link key={job.id} href={`/jobs/${job.id}`} className="block">
					<JobCard job={job}>
						<RenderIf isTrue={!!onEdit && !!onDelete}>
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
										if (onDelete) onDelete(job.id);
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
						</RenderIf>
					</JobCard>
				</Link>
			))}
		</>
	);
};

export default JobList;
