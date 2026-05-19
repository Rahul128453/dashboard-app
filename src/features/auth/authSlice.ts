import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const getInitialState = (): AuthState => {
    // Try to rehydrate from localStorage
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("authState");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                return {
                    ...parsed,
                    loading: false,
                };
            } catch (e) {
                console.error("Failed to parse stored auth state", e);
            }
        }
    }
    return {
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
    };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: User }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
            // Persist to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("authState", JSON.stringify({
                    token: state.token,
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                }));
            }
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            // Clear from localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem("authState");
            }
        },
        rehydrateFromStorage: (state) => {
            if (typeof window !== "undefined") {
                const stored = localStorage.getItem("authState");
                if (stored) {
                    try {
                        const parsed = JSON.parse(stored);
                        state.token = parsed.token;
                        state.user = parsed.user;
                        state.isAuthenticated = parsed.isAuthenticated;
                    } catch (e) {
                        console.error("Failed to rehydrate auth state", e);
                    }
                }
            }
        },
    },
});

export const { setCredentials, logout, rehydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
