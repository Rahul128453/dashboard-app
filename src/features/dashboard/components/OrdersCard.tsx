
import Card from "../../../components/ui/Card";

import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useGetOrdersQuery } from "../dashboardApi";

const OrdersCard = () => {
    const { data, isLoading, isError } = useGetOrdersQuery(null);

    if (isLoading) {
        return <div className="bg-white p-5 rounded-xl">Loading...</div>;
    }

    if (isError) {
        return <div className="bg-white p-5 rounded-xl">Error loading data</div>;
    }

    if (!data) return <div>No data</div>;


    const totalOrders =
        data?.reduce((sum: any, item: { current: any; }) => sum + item.current, 0) || 0;

    const lastOrders =
        data?.reduce((sum: any, item: { last: any; }) => sum + item.last, 0) || 0;

    const percentageChange = lastOrders
        ? ((totalOrders - lastOrders) / lastOrders) * 100
        : 0;

    const isPositive = percentageChange >= 0;


    return (
        <Card title="Order">
            <h2 className="text-[22px] font-semibold text-gray-800">
                {totalOrders.toLocaleString()}
            </h2>

            <p className="text-sm mt-1">
                <span
                    className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"
                        }`}
                >
                    {isPositive ? "↑" : "↓"} {Math.abs(percentageChange).toFixed(1)}%
                </span>

                <span className="text-gray-400 ml-1">vs last week</span>
            </p>

            <p className="text-xs text-gray-400 mt-2">
                Sales from {data?.[0]?.day}–{data?.[data.length - 1]?.day} Dec, 2025
            </p>

            {/* Chart */}
            <div className="w-full h-[180px]">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <XAxis dataKey="day" />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="last"
                            stroke="#E5E7EB"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#5A6ACF"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default OrdersCard;