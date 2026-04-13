import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthFormShell, { AuthInlineLink } from "@/components/authentication/AuthFormShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import authenticationService from "@/services/authentication";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await authenticationService.register(payload);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      eyebrow="New Account"
      title="Open your profile"
      description="Create your account to access digital banking features with a clean, secure onboarding flow."
      footer={
        <>
          Already registered? <AuthInlineLink to="/auth">Sign in instead</AuthInlineLink>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Amina"
          autoComplete="given-name"
          required
        />
        <Field
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Njoroge"
          autoComplete="family-name"
          required
        />
        </div>

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
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
        

        <Field
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
        />

        <Button className="h-12 w-full rounded-2xl" loading={loading} type="submit">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthFormShell>
  );
}
