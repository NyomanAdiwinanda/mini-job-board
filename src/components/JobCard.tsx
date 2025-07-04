import React from "react";
import { JobPost } from "@/entities/job-post";
import JobTime from "@/components/JobTime";

interface JobCardProps {
	job: JobPost;
	children?: React.ReactNode;
}

const JobCard: React.FC<JobCardProps> = ({ job, children }) => {
	return (
		<div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col gap-2 text-card min-h-[220px]">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold text-[#FAFAFA]">{job.title}</h2>
				<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.job_types?.type}</span>
			</div>
			<div className="text-[#FFFFFF] font-semibold">{job.company_name}</div>
			<div className="text-[#3ECF8E] text-sm">
				{job.location ? `${job.location}, ` : ""}
				{job.countries?.name}
			</div>
			<p className="text-[#B4B4B4] mt-2 line-clamp-4 h-[96px]">{job.description}</p>
			<div className="text-xs text-gray-400 text-right mt-2">
				<JobTime createdAt={job.created_at} updatedAt={job.updated_at} />
			</div>
			{children && <div className="flex gap-2 justify-end mt-2">{children}</div>}
		</div>
	);
};

export default JobCard;
