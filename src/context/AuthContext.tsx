"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/supabase/client";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	error: AuthError | null;
	signIn: (email: string, password: string) => void;
	signUp: (email: string, password: string) => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<AuthError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const { data } = await supabase.auth.getUser();
		setUser(data?.user || null);
		setLoading(false);
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error as AuthError);
		} else {
			setUser(data?.user || null);
		}
	};

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setError(error as AuthError);
		} else {
			setUser(data?.user || null);
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			setError(error as AuthError);
		} else {
			setUser(null);
		}
	};

	const value = {
		user,
		loading,
		error,
		signIn,
		signUp,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
