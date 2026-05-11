import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
    const dispatch = useAppDispatch();

    const { user, isAuthenticated } = useAppSelector(
        (state: { auth: any; }) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-white px-6 py-4 mb-5 shadow-sm flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#5A6ACF]">
                Dashboard
            </h1>

            {isAuthenticated && user ? (
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">
                        Welcome, {user.name}
                    </p>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 text-sm">
                    Not Logged In
                </p>
            )}
        </header>
    );
};

export default Header;