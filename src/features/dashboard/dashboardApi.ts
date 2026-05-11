import { baseApi } from "../../services/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/orders",
        }),
        getRevenue: builder.query({
            query: () => "/revenue",
        }),
        getOrderTime: builder.query({
            query: () => "/orderTime",
        }),
        getRatings: builder.query({
            query: () => "/ratings",
        }),
        getMostOrderedFood: builder.query({
            query: () => "/mostOrderedFood",
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetRevenueQuery,
    useGetOrderTimeQuery,
    useGetRatingsQuery,
    useGetMostOrderedFoodQuery,
} = dashboardApi;