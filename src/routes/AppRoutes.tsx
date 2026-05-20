import { Routes, Route } from "react-router-dom";
import LoginPage from '../features/auth/LoginPage';
import MainLayout from '../components/layout/MainLayout';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <MainLayout />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;