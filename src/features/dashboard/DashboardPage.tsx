import MostOrderedFoodApp from "./components/MostOrderedFood";
import OrdersCard from "./components/OrdersCard";
import OrderTimeCard from "./components/OrderTimeCard";
import RatingChart from "./components/RatingCard";
import RevenueCard from "./components/RevenueCard";

const DashboardPage = () => {
    return (
        <div className="grid grid-cols-3 gap-[24px]">

            <div className="col-span-2">
                <RevenueCard />
            </div>

            <OrderTimeCard />

            <RatingChart />

            <MostOrderedFoodApp />

            <OrdersCard />

        </div>
    );
};

export default DashboardPage;