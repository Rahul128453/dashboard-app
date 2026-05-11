import Card from "../../../components/ui/Card";
import { useGetMostOrderedFoodQuery } from "../dashboardApi";
import type { FoodData } from "../types";

const MostOrderedFood = () => {
    const { data: foodData, isLoading, isError } = useGetMostOrderedFoodQuery(null);

    if (isLoading) {
        return (
            <Card title="Most Ordered Food">
                <div className="text-xs text-gray-400">Loading...</div>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card title="Most Ordered Food">
                <div className="text-xs text-gray-400">Error loading food data</div>
            </Card>
        );
    }

    const items: FoodData[] = foodData || [];

    return (
        <Card title="Most Ordered Food">

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mb-4">
                Top trending dishes from recent orders
            </p>

            {/* List */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-none"
                    >

                        {/* Left (image + name) */}
                        <div className="flex items-center gap-3">

                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                            />

                            {/* Name */}
                            <span className="text-sm text-gray-700 font-medium">
                                {item.name}
                            </span>
                        </div>

                        {/* Price */}
                        <span className="text-sm text-gray-400">
                            {item.price}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default MostOrderedFood;