import React from "react";

interface JobTimeProps {
	createdAt: string;
	updatedAt: string;
}

const JobTime: React.FC<JobTimeProps> = ({ createdAt, updatedAt }) => {
	const created = new Date(createdAt);
	const updated = new Date(updatedAt);
	const isUpdated = updated.getTime() > created.getTime();

	const dateStr = (date: Date) =>
		date.toLocaleDateString(undefined, {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}) +
		" - " +
		date.toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});

	return (
		<div className="text-xs text-gray-400 text-right mt-2">
			{isUpdated ? `Last Updated: ${dateStr(updated)}` : `Created On: ${dateStr(created)}`}
		</div>
	);
};

export default JobTime;
