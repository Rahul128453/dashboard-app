import { useState } from "react";

import Sidebar from "./Sidebar";
import DashboardPage from "../../features/dashboard/DashboardPage";
import ManageMenuPage from "../../features/dashboard/ManageMenuPage";
import FoodOrderPage from "../../features/dashboard/FoodOrderPage";
import Header from "./Header";



const MainLayout = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const renderPage = () => {

        switch (activeTab) {

            case "food-order":
                return <FoodOrderPage />;

            case "manage-menu":
                return <ManageMenuPage />;
            case "dashboard":
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F5F5F5]">

            {/* Sidebar */}
            <Sidebar
                active={activeTab}
                onChange={setActiveTab}
            />

            {/* Right Section */}
            <div className="flex-1 flex flex-col">

                {/* Common Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {renderPage()}
                </main>

            </div>
        </div>
    );
};

export default MainLayout;