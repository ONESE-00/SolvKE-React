import { useState, } from "react";
import * as React from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthFormShell, { AuthInlineLink } from "@/components/authentication/AuthFormShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import authenticationService from "@/services/authentication";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "./userSlice";
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const newUser = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Check the url for query param email if so, await response from getCurrentUser() and prefill those details
  React.useEffect(() => {

    let isMounted = true
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')

    if (!email) return

    const fetchUserDetails = async () => {
      try {
        const userDetails = await authenticationService.getCurrentUser(email)

        if (isMounted && userDetails) {
          setFormData({
            firstName: userDetails?.firstName,
            lastName: userDetails?.lastName,
            email: userDetails?.email,
            password: "",
            confirmPassword: "",
          })


        }
      }
      catch (error) {
        console.warn("Failed to fetch user details for pre-filling the form", error)
        setFormData({
          ...data
        })
        console.log("Prefilled form data with default values due to error:", {
          ...data
        });
        dispatchDefaultUser({
          firstName: "Onese",
          lastName: "Solutions",
          email: "onese.solutions@example.com",
          token: "12345"
        });
      }
    }
    fetchUserDetails()
    return () => {
      isMounted = false
    }
  }, [])

  const data = {
    firstName: 'Onese',
    lastName: 'Solutions',
    email: 'onese.solutions@example.com',
    token: '12345',
    password: 'password123',
    confirmPassword: 'password123',
  }
  const dispatchDefaultUser = (userData) => {
    dispatch(setUser({
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      token: userData.token,
    }));

    console.log("Dispatched default user:", userData);
  };

  const handleChange = (event) => {
    console.log("Input changed:", event.target);
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
