import {
    LayoutDashboard,
    ShoppingCart,
    Menu,
    MessageCircle,
    Settings,
    CreditCard,
    User,
    HelpCircle,
} from "lucide-react";

const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { label: "Food Order", key: "food-order", icon: ShoppingCart },
    { label: "Manage Menu", key: "manage-menu", icon: Menu },
    { label: "Customer Review", key: "customer-review", icon: MessageCircle },
];

const otherItems = [
    { label: "Settings", key: "settings", icon: Settings },
    { label: "Payment", key: "payment", icon: CreditCard },
    { label: "Accounts", key: "accounts", icon: User },
    { label: "Help", key: "help", icon: HelpCircle },
];

type Props = {
    active: string;
    onChange?: (key: string) => void;
};

const Sidebar = ({ active, onChange }: Props) => {

    const handleClick = (key: string) => {
        onChange?.(key);
    };

    const renderItem = (item: any) => {
        const Icon = item.icon;
        const isActive = active === item.key;

        return (
            <div
                key={item.key}
                onClick={() => handleClick(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
          ${isActive ? "bg-[#EEF2FF] text-[#5A6ACF]" : "text-gray-400 hover:bg-gray-100"}
        `}
            >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
            </div>
        );
    };

    return (
        <div className="w-[240px] bg-white h-fullS p-6 flex flex-col justify-between">

            <div>

                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-full bg-[#5A6ACF] text-white flex items-center justify-center text-sm font-bold">
                        G
                    </div>
                    <span className="font-semibold text-gray-700 tracking-wide">
                        GOODFOOD
                    </span>
                </div>


                <p className="text-xs text-gray-400 mb-3">MENU</p>
                <div className="space-y-2 mb-6">
                    {menuItems.map(renderItem)}
                </div>


                <p className="text-xs text-gray-400 mb-3">OTHERS</p>
                <div className="space-y-2">
                    {otherItems.map(renderItem)}
                </div>
            </div>


            <div className="text-xs text-gray-300">
                © 2026 GoodFood
            </div>
        </div>
    );
};

export default Sidebar;