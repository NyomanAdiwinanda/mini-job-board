export interface JobPost {
	id: string;
	title: string;
	company_name: string;
	description: string | null;
	location: string | null;
	created_at: string;
	updated_at: string;
	country_id: string | null;
	job_type_id: string | null;
	user_id: string;
	countries?: {
		id: string;
		name: string;
		iso: string;
	} | null;
	job_types?: {
		id: string;
		type: string;
	} | null;
}
