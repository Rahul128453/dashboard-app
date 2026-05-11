import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import Card from "../../../components/ui/Card";
import { useGetOrderTimeQuery } from "../dashboardApi";

const COLORS = ["#5A6ACF", "#8B9AFB", "#C7CEFF"];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;

        return (
            <div className="bg-[#2F2F4A] text-white px-4 py-3 rounded-lg shadow-md text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-300">{item.timeRange}</p>
                <p className="mt-1 font-semibold">
                    {item.orders.toLocaleString()} orders
                </p>
            </div>
        );
    }
    return null;
};

const OrderTimeCard = () => {
    const { data, isLoading, isError } = useGetOrderTimeQuery(null);

    if (isLoading) {
        return <div className="bg-white p-5 rounded-xl">Loading...</div>;
    }

    if (isError) {
        return <div className="bg-white p-5 rounded-xl">Error loading data</div>;
    }

    return (
        <Card title="Order Time">
            {/* Subtext */}
            <p className="text-xs text-gray-400 mb-4">
                From 1–6 Dec, 2020
            </p>

            {/* Donut Chart */}
            <div className="w-full h-[180px] flex justify-center">
                <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data?.map((_entry: any, index: number) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>

                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
                {data?.map((item: any, index: number) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                        />
                        <span>{item.name}</span>
                        <span className="text-gray-400">{item.value}%</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default OrderTimeCard;