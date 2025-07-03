"use client";
import React, { useState } from "react";
import { useJobs } from "@/context/JobContext";

const CREATED_AT = [
	{ value: "newest", label: "Newest" },
	{ value: "oldest", label: "Oldest" },
];

const SearchBar = ({}) => {
	const [search, setSearch] = useState("");
	const { countriesFilter, jobTypeFilter } = useJobs();

	const onSearch = () => {
		alert(`Searching for: ${search}`);
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

	return (
		<div className={"w-full flex flex-col mb-8"}>
			<div className="flex w-full">
				<input
					type="text"
					value={search}
					onChange={onChange}
					onKeyDown={handleKeyDown}
					placeholder="Search jobs..."
					className="flex-1 px-4 py-2 rounded-l bg-card text-card border border-[#333] focus:outline-none focus:ring-2 focus:ring-blue-600"
				/>
				<button
					onClick={onSearch}
					className="px-6 py-2 rounded-r bg-blue-600 text-white font-semibold hover:bg-blue-700 transition border border-blue-600 border-l-0"
					type="button"
				>
					Search
				</button>
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
				<div className="flex flex-col flex-1">
					<label htmlFor="country" className="mb-1 text-sm text-gray-300">
						Country
					</label>
					<select
						id="country"
						className="border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						{countriesFilter.map(c => (
							<option key={c.id} value={c.name}>
								{c.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col flex-1">
					<label htmlFor="jobType" className="mb-1 text-sm text-gray-300">
						Job Type
					</label>
					<select
						id="jobType"
						className="border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						{jobTypeFilter.map(j => (
							<option key={j.id} value={j.type}>
								{j.type}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col flex-1">
					<label htmlFor="createdAt" className="mb-1 text-sm text-gray-300">
						Created At
					</label>
					<select
						id="createdAt"
						className="border rounded px-4 py-2 bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						{CREATED_AT.map(opt => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
