import { supabase } from "@/supabase/client";
import { JobPost } from "@/entities/job-post";

export const JobService = {
	fetchAll: async (filters: {
		searchFilter?: string;
		selectedLocationFilter?: string;
		selectedCountryFilter?: string;
		selectedJobTypeFilter?: string;
	}) => {
		let query = supabase.from("job_posts").select("*, countries(id, name, iso), job_types(id, type)");

		if (filters.searchFilter) {
			query = query.or(`title.ilike.%${filters.searchFilter}%,company_name.ilike.%${filters.searchFilter}%`);
		}
		if (filters.selectedLocationFilter) {
			query = query.eq("location", filters.selectedLocationFilter);
		}
		if (filters.selectedCountryFilter) {
			query = query.eq("country_id", filters.selectedCountryFilter);
		}
		if (filters.selectedJobTypeFilter) {
			query = query.eq("job_type_id", filters.selectedJobTypeFilter);
		}
		query = query.order("updated_at", { ascending: false });

		const [
			{ data: jobListData, error: jobListError },
			{ data: countriesFilterData, error: countryFilterError },
			{ data: jobTypeFilterData, error: jobTypeFilterError },
		] = await Promise.all([
			query,
			supabase.from("countries").select("*").order("sort_order", { ascending: true }),
			supabase.from("job_types").select("*").order("created_at", { ascending: true }),
		]);

		return {
			jobListData,
			jobListError,
			countriesFilterData,
			countryFilterError,
			jobTypeFilterData,
			jobTypeFilterError,
		};
	},

	fetchUserJobs: async (userId: string) => {
		const { data, error } = await supabase
			.from("job_posts")
			.select("*, countries(id, name, iso), job_types(id, type)")
			.eq("user_id", userId)
			.order("updated_at", { ascending: false });
		if (error) return [];
		return data || [];
	},

	updateJob: async (id: string, updatedJob: Partial<JobPost>) => {
		const { error } = await supabase.from("job_posts").update(updatedJob).eq("id", id);
		if (error) throw error;
	},
};
