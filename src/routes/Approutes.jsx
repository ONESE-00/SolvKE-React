import { Route, Routes} from "react-router-dom";
import ForgotPassword from "@/components/authentication/forgot-password";
import Login from "@/components/authentication/login";
import ResetPassword from "@/components/authentication/reset-password";
import Signup from "@/components/authentication/signup";
import SolvBankingLayout from "@/components/solv-banking/Solv-Banking-Layout";
import Dashboard  from "@/components/solv-banking/Dashboard";
import AccountDetails from "@/components/solv-banking/Account-Details";
import MyProfile from "@/components/solv-banking/My-Profile";
export default function AppRoutes() {
    return (
        <Routes>

            {/* Authentication Routes */}
            <Route path='' element={<Login />} />
            <Route path='/auth/signup' element={<Signup />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/auth/reset-password' element={<ResetPassword />} />

            {/* Solv Banking Routes */}
            <Route path='/solv-banking/*' element={<SolvBankingLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='account' element={<AccountDetails />} />
                <Route path='profile' element={<MyProfile />} />
                {/* Wildcard route */}
                <Route path='*' element={<Dashboard />} />
            </Route>
        </Routes>
    )
}