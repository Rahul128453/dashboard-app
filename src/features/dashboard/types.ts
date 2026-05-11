export interface RevenueData {
    day: string;
    current: number;
    last: number;
}

export interface RevenueSummary {
    total: number;
    percentageChange: number;
    period: string;
}

export interface RatingData {
    label: string;
    percentage: number;
    color: string;
    top: string;
    left: string;
    size: string;
}

export interface FoodData {
    name: string;
    price: string;
    image: string;
}