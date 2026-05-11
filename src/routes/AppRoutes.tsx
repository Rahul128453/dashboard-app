import { Routes, Route } from "react-router-dom";
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import Header from '../components/layout/Header';
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
                        <MainLayout>
                            <Header />
                            <DashboardPage />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;