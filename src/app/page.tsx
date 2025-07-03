import React from "react";
import SearchBar from "@/components/SearchBar";
import JobList from "@/components/JobList";

const Home = async () => {
	return (
		<div className="min-h-screen bg-page">
			<main className="max-w-4xl mx-auto py-10 px-4">
				<div className="w-full mb-8">
					<SearchBar />
				</div>
				<div className="flex min-h-[300px] items-center justify-center">
					<div className="w-full grid gap-6 md:grid-cols-2">
						<JobList />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
