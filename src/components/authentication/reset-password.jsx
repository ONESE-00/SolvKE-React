import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import AuthFormShell, { AuthInlineLink } from "@/components/authentication/AuthFormShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import authenticationService from "@/services/authentication";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    token: searchParams.get("token") || "",
    email: searchParams.get("email") || "",
    newPassword: "",
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

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        token: formData.token,
        email: formData.email,
        newPassword: formData.newPassword,
      };

      await authenticationService.completePasswordReset(payload);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      eyebrow="Update Password"
      title="Choose a new password"
      description="Complete the reset with the token or code you received, then set a fresh password for your account."
      footer={
        <>
          Need to restart? <AuthInlineLink to="/auth/forgot-password">Request another reset</AuthInlineLink>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Reset Token"
          name="token"
          value={formData.token}
          onChange={handleChange}
          placeholder="Paste the token or code"
          required
        />

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
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
          autoComplete="new-password"
          required
        />

        <Field
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          required
        />

        <Button className="h-12 w-full rounded-2xl" loading={loading} type="submit">
          {loading ? "Updating password..." : "Update password"}
        </Button>
      </form>
    </AuthFormShell>
  );
}
