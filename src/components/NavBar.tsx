"use client";
import Link from "next/link";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RenderIf from "@/utils/RenderIf";
import "@/app/globals.css";

const NavBar = () => {
	const router = useRouter();
	const { user, loading, signOut } = useAuth();

	const closeMenu = () => {
		const menuToggle = document.getElementById("menu-toggle") as HTMLInputElement;
		if (menuToggle) menuToggle.checked = false;
	};

	const handleSignOut = () => {
		closeMenu();
		signOut();
		router.push("/");
		toast.warn("You have been signed out", {
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
	};

	return (
		<nav className="bg-[#1a1a1a] shadow-md py-4 px-8 flex justify-between items-center relative h-18">
			<Link href="/" className="text-2xl font-bold text-white">
				Mini Job Board
			</Link>
			<input id="menu-toggle" type="checkbox" className="peer hidden" />
			<label
				htmlFor="menu-toggle"
				className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer z-50"
			>
				<span className="block h-0.5 w-6 bg-white mb-1 transition-all peer-checked:rotate-45 peer-checked:translate-y-2"></span>
				<span className="block h-0.5 w-6 bg-white mb-1 transition-all peer-checked:opacity-0"></span>
				<span className="block h-0.5 w-6 bg-white transition-all peer-checked:-rotate-45 peer-checked:-translate-y-2"></span>
			</label>
			<RenderIf isTrue={!loading}>
				<div className="md:flex gap-4 items-center hidden md:flex flex-col md:flex-row absolute md:static top-16 right-8 bg-[#202020] md:bg-transparent shadow-lg md:shadow-none rounded md:rounded-none p-6 md:p-0 z-40 w-48 md:w-auto peer-checked:flex">
					<Link
						href="/"
						className="hover:text-blue-400 w-full md:w-auto text-center whitespace-nowrap text-white"
						onClick={closeMenu}
					>
						Home
					</Link>
					<RenderIf isTrue={user !== null}>
						<Link
							href="/post-job"
							className="hover:text-blue-400 w-full md:w-auto text-center whitespace-nowrap text-white"
							onClick={closeMenu}
						>
							Post Job
						</Link>
						<Link
							href="/dashboard"
							className="hover:text-blue-400 w-full md:w-auto text-center whitespace-nowrap text-white"
							onClick={closeMenu}
						>
							Dashboard
						</Link>
						<button
							onClick={handleSignOut}
							className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold w-full md:w-auto text-center whitespace-nowrap"
						>
							Logout
						</button>
					</RenderIf>
					<RenderIf isTrue={user === null}>
						<Link
							href="/signin"
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto text-center whitespace-nowrap"
							onClick={closeMenu}
						>
							Sign In
						</Link>
						<Link
							href="/signup"
							className="border border-blue-400 text-blue-400 px-4 py-2 rounded hover:bg-blue-900 w-full md:w-auto text-center whitespace-nowrap"
							onClick={closeMenu}
						>
							Sign Up
						</Link>
					</RenderIf>
				</div>
			</RenderIf>
		</nav>
	);
};

export default NavBar;
