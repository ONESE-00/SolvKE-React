import { Route, Routes, Navigate } from "react-router-dom";
import ForgotPassword from "../components/authentication/forgot-password";
import Login from "../services/login";
import ResetPassword from "../components/authentication/reset-password";
import Signup from "../components/authentication/signup";
import SolvBankingLayout from "../components/solv-banking/Solv-Banking-Layout";
import Dashboard from "../components/solv-banking/Dashboard";
import AccountDetails from "../components/solv-banking/Account-Details";
import MyProfile from "../components/solv-banking/My-Profile";
import AuthLayout from "../components/authentication/Auth-Layout";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Authentication Routes */}

            {/* Default root redirect */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            <Route path='/auth' element={<AuthLayout />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path='signup' element={<Signup />} />

                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
                <Route path='*' element={<Login />} />
            </Route>


            {/* Solv Banking Routes */}
            <Route path='/solv-banking/*' element={<SolvBankingLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='account' element={<AccountDetails />} />
                <Route path='profile' element={<MyProfile />} />
                {/* Wildcard route */}
                <Route path='*' element={<Dashboard />} />
            </Route>
            {/* Wild Card Route */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    )
}