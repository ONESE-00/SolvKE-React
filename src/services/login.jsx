import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import AuthFormShell, { AuthInlineLink } from "@/components/authentication/AuthFormShell";
import authenticationService from "./authentication";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

function getAccessToken(response) {
  return (
    response?.data?.accessToken ||
    response?.data?.token ||
    response?.accessToken ||
    response?.token ||
    response?.tokens?.accessToken ||
    null
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await authenticationService.login(formData);
      const accessToken = getAccessToken(response);

      if (accessToken && typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
      }

      navigate("/solv-banking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      title="Welcome back"
      description="Sign in to continue managing your accounts, transfers, and profile in one secure workspace."
      footer={
        <>
          New to SolvKE? <AuthInlineLink to="/auth/signup">Create an account</AuthInlineLink>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Field
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-end">
          <Link
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
            to="/auth/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="h-12 w-full rounded-2xl" loading={loading} type="submit">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthFormShell>
  );
}
