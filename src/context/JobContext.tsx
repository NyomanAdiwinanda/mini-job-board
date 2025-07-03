"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { QueryError } from "@supabase/supabase-js";
import { Country } from "@/entities/country";
import { JobType } from "@/entities/job-type";
import { JobPost } from "@/entities/job-post";
import { JobService } from "@/services/JobService";

interface JobContextType {
	jobList: JobPost[];
	jobListError: QueryError | null;
	setSearchFilter: (val: string) => void;
	selectedCountryFilter: string;
	setSelectedCountryFilter: (val: string) => void;
	countriesFilter: Country[];
	countryFilterError: QueryError | null;
	selectedJobTypeFilter: string;
	setSelectedJobTypeFilter: (val: string) => void;
	jobTypeFilter: JobType[];
	jobTypeFilterError: QueryError | null;
	loading: boolean;
	fetchUserJobs: (userId: string) => Promise<JobPost[]>;
	updateJob: (id: string, updatedJob: Partial<JobPost>) => Promise<void>;
	refreshJobs: () => Promise<void>;
	setSelectedLocationFilter: (val: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
	const [jobList, setJobList] = useState<JobPost[]>([]);
	const [jobListError, setJobListError] = useState<QueryError | null>(null);
	const [searchFilter, setSearchFilter] = useState<string>("");
	const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("");
	const [countriesFilter, setCountriesFilter] = useState<Country[]>([]);
	const [countryFilterError, setCountryFilterError] = useState<QueryError | null>(null);
	const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>("");
	const [selectedJobTypeFilter, setSelectedJobTypeFilter] = useState<string>("");
	const [jobTypeFilter, setJobTypeFilter] = useState<JobType[]>([]);
	const [jobTypeFilterError, setJobTypeFilterError] = useState<QueryError | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchAll = useCallback(async () => {
		setLoading(true);
		const {
			jobListData,
			jobListError,
			countriesFilterData,
			countryFilterError,
			jobTypeFilterData,
			jobTypeFilterError,
		} = await JobService.fetchAll({
			searchFilter,
			selectedLocationFilter,
			selectedCountryFilter,
			selectedJobTypeFilter,
		});

		if (jobListError || countryFilterError || jobTypeFilterError) {
			setJobListError(jobListError || null);
			setCountryFilterError(countryFilterError || null);
			setJobTypeFilterError(jobTypeFilterError || null);
			return;
		}

		setJobList(jobListData || []);
		setCountriesFilter(countriesFilterData || []);
		setJobTypeFilter(jobTypeFilterData || []);
		setLoading(false);
	}, [searchFilter, selectedLocationFilter, selectedCountryFilter, selectedJobTypeFilter]);

	useEffect(() => {
		fetchAll();
	}, [fetchAll]);

	const fetchUserJobs = async (userId: string) => {
		return await JobService.fetchUserJobs(userId);
	};

	const updateJob = async (id: string, updatedJob: Partial<JobPost>) => {
		await JobService.updateJob(id, updatedJob);
		await fetchAll();
	};

	const refreshJobs = async () => {
		await fetchAll();
	};

	const value = {
		jobList,
		jobListError,
		setSearchFilter,
		selectedCountryFilter,
		setSelectedCountryFilter,
		countriesFilter,
		countryFilterError,
		selectedJobTypeFilter,
		setSelectedJobTypeFilter,
		jobTypeFilter,
		jobTypeFilterError,
		loading,
		fetchUserJobs,
		updateJob,
		refreshJobs,
		setSelectedLocationFilter,
	};

	return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
	const context = useContext(JobContext);
	if (!context) throw new Error("useJobs must be used within an JobProvider");
	return context;
};
