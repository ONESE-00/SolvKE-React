import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthFormShell, { AuthInlineLink } from "@/components/authentication/AuthFormShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import authenticationService from "../../services/authentication";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await authenticationService.initiatePasswordReset(email);
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      eyebrow="Password Help"
      title="Reset access"
      description="Enter the email address linked to your profile and we’ll start the password reset process."
      footer={
        <>
          Remembered your password? <AuthInlineLink to="/auth">Back to sign in</AuthInlineLink>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Button className="h-12 w-full rounded-2xl" loading={loading} type="submit">
          {loading ? "Sending link..." : "Send reset instructions"}
        </Button>
      </form>
    </AuthFormShell>
  );
}
