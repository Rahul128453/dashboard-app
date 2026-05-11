import { baseApi } from "../../services/baseApi";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
