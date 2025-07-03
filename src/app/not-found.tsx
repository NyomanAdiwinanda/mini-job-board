import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-page">
			<div className="bg-card rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md">
				<h1 className="text-6xl font-extrabold text-[#FAFAFA] mb-4">404</h1>
				<h2 className="text-2xl font-semibold mb-2 text-[#FFFFFF]">Page Not Found</h2>
				<p className="text-[#B4B4B4] mb-6 text-center">
					Sorry, the page you are looking for does not exist or has been moved.
				</p>
				<Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
					Go Home
				</Link>
			</div>
		</div>
	);
}
