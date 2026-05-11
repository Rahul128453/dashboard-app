import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
    // Try to rehydrate from localStorage
    const stored = localStorage.getItem("authState");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored auth state", e);
        }
    }
    return {
        token: null,
        user: null,
        isAuthenticated: false,
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
            // Persist to localStorage
            localStorage.setItem("authState", JSON.stringify(state));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            // Clear from localStorage
            localStorage.removeItem("authState");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
