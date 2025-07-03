"use client";
import React, { useState, useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import { Country } from "@/entities/country";
import { useJobs } from "@/context/JobContext";
import { supabase } from "@/supabase/client";
import { JobPost } from "@/entities/job-post";
import { useRouter } from "next/navigation";

interface JobFormProps {
	initial?: Partial<JobPost>;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
	submitLabel?: string;
}

const JobForm: React.FC<JobFormProps> = ({ initial = {}, onSubmit, submitLabel = "Post Job" }) => {
	const [jobTitle, setJobTitle] = useState<string>(initial.title || "");
	const [companyName, setCompanyName] = useState<string>(initial.company_name || "");
	const [countryId, setCountryId] = useState<string>(initial.country_id || "");
	const [location, setLocation] = useState<string>(initial.location || "");
	const [jobTypeId, setJobTypeId] = useState<string>(initial.job_type_id || "");
	const [description, setDescription] = useState<string>(initial.description || "");

	const [locationList, setLocationList] = useState<string[]>([]);
	const [citiesError, setCitiesError] = useState<string>("");
	const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
	const { countriesFilter, jobTypeFilter, refreshJobs } = useJobs();
	const router = useRouter();

	useEffect(() => {
		if (initial.country_id && countriesFilter.length) {
			const selected = countriesFilter.find(c => c.id === initial.country_id);
			if (selected && selected.name !== "Remote") {
				(async () => {
					setIsLoadingCities(true);
					try {
						const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ country: selected.name.trim() }),
						});
						const result = await res.json();
						if (result.data && Array.isArray(result.data)) {
							setLocationList(result.data);
						}
					} catch {
						setLocationList([]);
					} finally {
						setIsLoadingCities(false);
					}
				})();
			}
		}
	}, [initial.country_id, countriesFilter]);

	const onSelectCountry = async (country: Country) => {
		setLocation("");
		setCountryId(country.id);
		setCitiesError("");
		setIsLoadingCities(true);

		if (country.name.trim() === "Remote") {
			setLocationList([]);
			setIsLoadingCities(false);
			return;
		}

		try {
			const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ country: country.name.trim() }),
			});
			const result = await res.json();
			if (result.error || !result.data || !Array.isArray(result.data) || result.data.length === 0) {
				setLocationList([]);
				setCitiesError("Cities not found");
			} else {
				setLocationList(result.data);
				setCitiesError("");
			}
		} catch {
			setLocationList([]);
			setCitiesError("Cities not found");
		} finally {
			setIsLoadingCities(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onSubmit) return onSubmit(e);
		const jobData = {
			title: jobTitle,
			company_name: companyName,
			description,
			location,
			country_id: countryId,
			job_type_id: jobTypeId,
		};
		const { error } = await supabase.from("job_posts").insert([jobData]).select();
		if (error) {
			console.error("Error posting job:", error.message);
		} else {
			await refreshJobs();
			router.push("/dashboard");
			toast.success("Job created", {
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
		}
	};

	const isFormValid =
		!isLoadingCities &&
		jobTitle.trim() !== "" &&
		companyName.trim() !== "" &&
		countryId.trim() !== "" &&
		jobTypeId.trim() !== "" &&
		(locationList.length === 0 || location.trim() !== "");

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-card p-8 rounded shadow-md w-full max-w-lg mx-auto flex flex-col gap-4 text-card"
		>
			<h1 className="text-2xl font-bold text-center mb-4">{submitLabel}</h1>
			<input
				type="text"
				name="title"
				placeholder="Job Title"
				value={jobTitle}
				onChange={e => setJobTitle(e.target.value)}
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<input
				type="text"
				name="company"
				placeholder="Company Name"
				value={companyName}
				onChange={e => setCompanyName(e.target.value)}
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<select
				name="country"
				value={countryId}
				onChange={e => {
					const selected = countriesFilter.find(c => c.id === e.target.value);
					if (selected) {
						onSelectCountry(selected);
					}
				}}
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="" disabled>
					Select Country
				</option>
				{countriesFilter.slice(1).map(c => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<select
				name="location"
				value={location}
				onChange={e => setLocation(e.target.value)}
				disabled={locationList.length === 0}
				required
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-800 disabled:text-gray-500"
			>
				<option value="" disabled>
					{citiesError ? citiesError : "Select Location"}
				</option>
				{locationList.length !== 0 &&
					locationList.map(loc => (
						<option key={loc} value={loc}>
							{loc}
						</option>
					))}
			</select>
			<select
				name="type"
				value={jobTypeId}
				onChange={e => setJobTypeId(e.target.value)}
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			>
				<option value="" disabled>
					Select Job Type
				</option>
				{jobTypeFilter.slice(1).map(j => (
					<option key={j.id} value={j.id}>
						{j.type}
					</option>
				))}
			</select>
			<textarea
				name="description"
				placeholder="Job Description"
				value={description}
				onChange={e => setDescription(e.target.value)}
				className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
				required
			/>
			<button
				type="submit"
				className={`bg-blue-600 text-white py-2 rounded font-semibold mt-2 transition-colors ${
					!isFormValid ? "opacity-50 cursor-not-allowed hover:bg-blue-600" : "hover:bg-blue-700"
				}`}
				disabled={!isFormValid}
			>
				{submitLabel}
			</button>
		</form>
	);
};

export default JobForm;
