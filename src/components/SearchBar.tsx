"use client";
import React, { useState } from "react";
import { useJobs } from "@/context/JobContext";

const SearchBar = ({}) => {
	const [search, setSearch] = useState("");
	const {
		countriesFilter,
		jobTypeFilter,
		setSelectedCountryFilter,
		setSelectedJobTypeFilter,
		setSearchFilter,
		setSelectedLocationFilter,
	} = useJobs();

	const [selectedCountryId, setSelectedCountryId] = useState<string>("");
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [locationList, setLocationList] = useState<string[]>([]);
	const [isLoadingCities, setIsLoadingCities] = useState(false);
	const [selectedJobTypeId, setSelectedJobTypeId] = useState<string>("");

	const onSearch = () => {
		setSearchFilter(search);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const [showFilters, setShowFilters] = useState(false);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSearch();
		}
	};

	React.useEffect(() => {
		const selectedCountry = countriesFilter.find(c => c.id === selectedCountryId);
		const countryName = selectedCountry?.name || "";
		if (!countryName || countryName === "All" || countryName === "Remote") {
			setLocationList([]);
			setSelectedLocation("");
			setIsLoadingCities(false);
			return;
		}
		setIsLoadingCities(true);
		fetch("https://countriesnow.space/api/v0.1/countries/cities", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ country: countryName.trim() }),
		})
			.then(res => res.json())
			.then(result => {
				if (result.error || !result.data || !Array.isArray(result.data) || result.data.length === 0) {
					setLocationList([]);
				} else {
					setLocationList(result.data);
				}
			})
			.catch(() => {
				setLocationList([]);
			})
			.finally(() => setIsLoadingCities(false));
	}, [selectedCountryId, countriesFilter]);

	React.useEffect(() => {
		setSelectedLocationFilter("");
		setSearchFilter("");
		setSelectedCountryFilter("");
		setSelectedJobTypeId("");
		setSelectedJobTypeFilter("");
	}, [setSelectedLocationFilter, setSearchFilter, setSelectedCountryFilter, setSelectedJobTypeFilter]);

	React.useEffect(() => {
		if (!selectedCountryId && countriesFilter[0]?.id) {
			setSelectedCountryId(countriesFilter[0].id);
		}
	}, [countriesFilter, selectedCountryId]);

	return (
		<div className={"w-full flex flex-col mb-8"}>
			<div className="flex w-full">
				<input
					type="text"
					value={search}
					onChange={onChange}
					onKeyDown={handleKeyDown}
					placeholder="Search jobs or company"
					className="flex-1 px-4 py-2 rounded-l bg-card text-card border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-600"
				/>
				<button
					onClick={onSearch}
					className="px-6 py-2 rounded-r bg-blue-600 text-white font-semibold hover:bg-blue-700 transition border border-blue-600 border-l-0"
					type="button"
				>
					Search
				</button>
				{/* Reset Filters Button */}
				{countriesFilter[0]?.id &&
					selectedCountryId &&
					(search || selectedCountryId !== countriesFilter[0].id || selectedLocation || selectedJobTypeId) && (
						<button
							onClick={() => {
								setSearch("");
								setSelectedCountryId(countriesFilter[0]?.id || "");
								setSelectedLocation("");
								setSelectedLocationFilter("");
								setSearchFilter("");
								setSelectedCountryFilter("");
								setSelectedJobTypeId("");
								setSelectedJobTypeFilter("");
							}}
							className="ml-2 px-4 py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition border border-gray-600"
							style={{ minWidth: 0 }}
							type="button"
						>
							Reset Filters
						</button>
					)}
			</div>
			<div className="block md:hidden mt-4">
				<button
					onClick={() => setShowFilters(prev => !prev)}
					className="w-full bg-transparent border border-blue-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-blue-900/20 transition"
					type="button"
				>
					<span>Filters</span>
					<svg
						className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
			</div>
			<div className={`flex-col md:flex-row gap-4 mt-4 ${showFilters ? "flex" : "hidden"} md:flex`}>
				<div className="flex flex-col flex-1 min-w-[180px]">
					<label htmlFor="country" className="mb-1 text-sm text-gray-300">
						Country
					</label>
					<select
						id="country"
						className="border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
						value={selectedCountryId}
						onChange={e => {
							setSelectedCountryId(e.target.value);
							if (e.target.value === countriesFilter[0].id) {
								setSelectedCountryFilter("");
							} else {
								setSelectedCountryFilter(e.target.value);
							}
						}}
					>
						{countriesFilter.map(c => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col flex-1 min-w-[180px]">
					<label htmlFor="location" className="mb-1 text-sm text-gray-300">
						Location
					</label>
					<select
						id="location"
						className={`border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600 w-full disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed ${
							!selectedCountryId ||
							countriesFilter.find(c => c.id === selectedCountryId)?.name === "All" ||
							countriesFilter.find(c => c.id === selectedCountryId)?.name === "Remote" ||
							isLoadingCities ||
							locationList.length === 0
								? "opacity-60"
								: ""
						}`}
						value={selectedLocation}
						onChange={e => {
							setSelectedLocation(e.target.value);
							setSelectedLocationFilter(e.target.value);
						}}
						disabled={
							!selectedCountryId ||
							countriesFilter.find(c => c.id === selectedCountryId)?.name === "All" ||
							countriesFilter.find(c => c.id === selectedCountryId)?.name === "Remote" ||
							isLoadingCities ||
							locationList.length === 0
						}
					>
						<option value="">
							{isLoadingCities
								? "Loading..."
								: locationList.length === 0
								? "No cities for selected country"
								: "Select location"}
						</option>
						{locationList.map(city => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col flex-1 min-w-[180px]">
					<label htmlFor="jobType" className="mb-1 text-sm text-gray-300">
						Job Type
					</label>
					<select
						id="jobType"
						className="border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
						value={selectedJobTypeId}
						onChange={e => {
							setSelectedJobTypeId(e.target.value);
							if (e.target.value === jobTypeFilter[0].id) {
								setSelectedJobTypeFilter("");
							} else {
								setSelectedJobTypeFilter(e.target.value);
							}
						}}
					>
						{jobTypeFilter.map(j => (
							<option key={j.id} value={j.id}>
								{j.type}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
