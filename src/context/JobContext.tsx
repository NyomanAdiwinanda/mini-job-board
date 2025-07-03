"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { QueryError } from "@supabase/supabase-js";
import { Country } from "@/entities/country";
import { JobType } from "@/entities/job-type";
import { JobPost } from "@/entities/job-post";

interface JobContextType {
	jobList: JobPost[];
	jobListError: QueryError | null;
	setSelectedCountryFilter: (val: string) => void;
	countriesFilter: Country[];
	countryFilterError: QueryError | null;
	setSelectedJobTypeFilter: (val: string) => void;
	jobTypeFilter: JobType[];
	jobTypeFilterError: QueryError | null;
	loading: boolean;
	fetchUserJobs: (userId: string) => Promise<JobPost[]>;
	updateJob: (id: string, updatedJob: Partial<JobPost>) => Promise<void>;
	refreshJobs: () => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
	const [jobList, setJobList] = useState<JobPost[]>([]);
	const [jobListError, setJobListError] = useState<QueryError | null>(null);
	const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("All");
	const [countriesFilter, setCountriesFilter] = useState<Country[]>([]);
	const [countryFilterError, setCountryFilterError] = useState<QueryError | null>(null);
	const [selectedJobTypeFilter, setSelectedJobTypeFilter] = useState<string>("All");
	const [jobTypeFilter, setJobTypeFilter] = useState<JobType[]>([]);
	const [jobTypeFilterError, setJobTypeFilterError] = useState<QueryError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAll();
	}, [selectedCountryFilter, selectedJobTypeFilter]);

	const fetchAll = async () => {
		setLoading(true);
		const [
			{ data: jobListData, error: jobListError },
			{ data: countriesFilterData, error: countryFilterError },
			{ data: jobTypeFilterData, error: jobTypeFilterError },
		] = await Promise.all([
			supabase
				.from("job_posts")
				.select("*, countries(id, name, iso), job_types(id, type)")
				.order("updated_at", { ascending: false }),
			supabase.from("countries").select("*").order("sort_order", { ascending: true }),
			supabase.from("job_types").select("*").order("created_at", { ascending: true }),
		]);

		if (jobListError || countryFilterError || jobTypeFilterError) {
			setJobListError(jobListError || null);
			setCountryFilterError(countryFilterError || null);
			setJobTypeFilterError(jobTypeFilterError || null);
			return;
		}

		setJobList(jobListData);
		setCountriesFilter(countriesFilterData);
		setJobTypeFilter(jobTypeFilterData);
		setLoading(false);
	};

	const fetchUserJobs = async (userId: string) => {
		const { data, error } = await supabase
			.from("job_posts")
			.select("*, countries(id, name, iso), job_types(id, type)")
			.eq("user_id", userId)
			.order("updated_at", { ascending: false });
		if (error) return [];

		return data || [];
	};

	const updateJob = async (id: string, updatedJob: Partial<JobPost>) => {
		const { error } = await supabase.from("job_posts").update(updatedJob).eq("id", id);
		if (error) throw error;
		// Optionally, refresh jobList after update
		await fetchAll();
	};

	const refreshJobs = async () => {
		await fetchAll();
	};

	const value = {
		jobList,
		jobListError,
		setSelectedCountryFilter,
		countriesFilter,
		countryFilterError,
		setSelectedJobTypeFilter,
		jobTypeFilter,
		jobTypeFilterError,
		loading,
		fetchUserJobs,
		updateJob,
		refreshJobs,
	};

	return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
	const context = useContext(JobContext);
	if (!context) throw new Error("useJobs must be used within an JobProvider");
	return context;
};
