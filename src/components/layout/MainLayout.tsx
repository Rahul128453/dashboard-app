import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1">
                {/* You can later switch pages based on activeTab */}
                {children}
            </div>
        </div>
    );
};

export default MainLayout;