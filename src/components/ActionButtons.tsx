import React from "react";

interface EditButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, className }) => (
	<button
		onClick={onClick}
		className={`text-blue-600 hover:underline text-sm font-medium mr-2 ${className || ""}`}
		type="button"
	>
		Edit
	</button>
);

interface DeleteButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className }) => (
	<button
		onClick={onClick}
		className={`text-red-600 hover:underline text-sm font-medium ${className || ""}`}
		type="button"
	>
		Delete
	</button>
);
