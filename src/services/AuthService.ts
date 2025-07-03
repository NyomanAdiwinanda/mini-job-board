import { supabase } from "@/supabase/client";
import { User } from "@supabase/supabase-js";

export const AuthService = {
	getUser: async (): Promise<User | null> => {
		const { data } = await supabase.auth.getUser();
		return data?.user || null;
	},

	signIn: async (email: string, password: string) => {
		return await supabase.auth.signInWithPassword({ email, password });
	},

	signUp: async (email: string, password: string) => {
		return await supabase.auth.signUp({ email, password });
	},

	signOut: async () => {
		return await supabase.auth.signOut();
	},
};
