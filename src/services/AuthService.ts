import { supabase } from "@/supabase/client";
import { AuthResponse, AuthError, UserResponse } from "@supabase/supabase-js";

export class AuthService {
	static async signUp(email: string, password: string): Promise<AuthResponse> {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) throw error;

			return {
				data,
				error: null,
			};
		} catch (error) {
			return {
				data: {
					user: null,
					session: null,
				},
				error: error as AuthError,
			};
		}
	}

	static async signIn(email: string, password: string): Promise<{ error: AuthError | null }> {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			return {
				error: null,
			};
		} catch (error) {
			return {
				error: error as AuthError,
			};
		}
	}

	static async signOut(): Promise<{ error: AuthError | null }> {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return {
				error: error as AuthError,
			};
		}

		return {
			error: null,
		};
	}

	static async getUser(): Promise<UserResponse> {
		try {
			const { data, error } = await supabase.auth.getUser();
			if (error) throw error;
			return { data, error: null };
		} catch (error) {
			return {
				data: {
					user: null,
				},
				error: error as AuthError,
			};
		}
	}
}
