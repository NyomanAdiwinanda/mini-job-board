"use client";
import React from "react";
import Link from "next/link";
import JobCard from "./JobCard";
import { JobPost } from "@/entities/job-post";
import { useJobs } from "@/context/JobContext";

const JobList = () => {
	const { jobList, loading } = useJobs();

	if (loading) return null;

	return (
		<>
			{jobList.map((job: JobPost) => (
				<Link key={job.id} href={`/jobs/${job.id}`}>
					<JobCard job={job} />
				</Link>
			))}
		</>
	);
};

export default JobList;
