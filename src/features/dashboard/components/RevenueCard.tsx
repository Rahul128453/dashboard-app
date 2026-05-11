import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Card from "../../../components/ui/Card";
import { useGetRevenueQuery } from "../dashboardApi";
import type { RevenueData } from "../types";

const RevenueCard = () => {
    const { data: revenueData, isLoading, error } = useGetRevenueQuery(null);

    if (isLoading) return <Card title="Revenue"><div>Loading...</div></Card>;
    if (error) return <Card title="Revenue"><div>Error loading data</div></Card>;

    const data: RevenueData[] = revenueData || [];

    // Calculate total revenue
    const totalRevenue = data.reduce((sum: number, item: RevenueData) => sum + item.current, 0);

    // Calculate percentage change
    const currentTotal = data.reduce((sum: number, item: RevenueData) => sum + item.current, 0);
    const lastTotal = data.reduce((sum: number, item: RevenueData) => sum + item.last, 0);
    const percentageChange = lastTotal > 0 ? ((currentTotal - lastTotal) / lastTotal) * 100 : 0;

    // Format currency (assuming IDR)
    const formatCurrency = (amount: number) => `IDR ${amount.toLocaleString()}`;

    return (
        <Card title="Revenue">
            {/* Top Section */}
            <div className="mb-4">
                <h2 className="text-[22px] font-semibold text-gray-800">
                    {formatCurrency(totalRevenue)}
                </h2>

                <p className="text-sm mt-1">
                    <span className={`font-medium ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(1)}%
                    </span>
                    <span className="text-gray-400 ml-1">vs last week</span>
                </p>

                <p className="text-xs text-gray-400 mt-2">
                    Sales from 1–12 Dec, 2020
                </p>
            </div>

            {/* Chart */}
            <div className="w-full h-[220px]">
                <ResponsiveContainer>
                    <BarChart data={data} barGap={4}>
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12, fill: "#A0AEC0" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                            }}
                        />

                        {/* Last Week */}
                        <Bar
                            dataKey="last"
                            fill="#E5E7EB"
                            radius={[4, 4, 0, 0]}
                            barSize={6}
                        />

                        {/* Current */}
                        <Bar
                            dataKey="current"
                            fill="#5A6ACF"
                            radius={[4, 4, 0, 0]}
                            barSize={6}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#5A6ACF] rounded-full" />
                    Last 6 days
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full" />
                    Last Week
                </div>
            </div>
        </Card>
    );
};

export default RevenueCard;