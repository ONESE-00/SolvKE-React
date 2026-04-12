import { useState } from "react";
import { toast } from "sonner";
import { bankApi } from "@/services/bankApi";



export default function Login() {
    const handleLogin = async (credentials) => {
    const response = await bankApi.login(credentials);
    if(response){
        //route to dashboard
    }
}
    return(<div>Login</div>)
}