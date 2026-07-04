// src/components/auth/SignUpForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL_REGEX } from "../../utils/constants";




export default function SignUpForm() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email)) errors.email = "Enter a valid email address";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setFormError(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {formError && (
        <div
          role="alert"
          className="rounded-lg border border-alert-500/30 bg-alert-500/10 px-4 py-3 text-sm text-alert-400"
        >
          {formError}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Full name
        </label>
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700" size={16} />
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            className="w-full rounded-lg border border-base-600 bg-base-800 py-2.5 pl-9 pr-3 text-sm text-ink-100
              placeholder:text-ink-700 outline-none transition-colors focus:border-verify-500"
          />
        </div>
        {fieldErrors.fullName && (
          <p id="fullName-error" className="text-xs text-alert-400">
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Email
        </label>
        <div className="relative">
          <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700" size={16} />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-base-600 bg-base-800 py-2.5 pl-9 pr-3 text-sm text-ink-100
              placeholder:text-ink-700 outline-none transition-colors focus:border-verify-500"
          />
        </div>
        {fieldErrors.email && (
          <p id="email-error" className="text-xs text-alert-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Password
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700" size={16} />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            className="w-full rounded-lg border border-base-600 bg-base-800 py-2.5 pl-9 pr-10 text-sm text-ink-100
              placeholder:text-ink-700 outline-none transition-colors focus:border-verify-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-700 hover:text-ink-300"
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
        {fieldErrors.password && (
          <p id="password-error" className="text-xs text-alert-400">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Confirm password
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700" size={16} />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            aria-describedby={fieldErrors.confirmPassword ? "confirmPassword-error" : undefined}
            className="w-full rounded-lg border border-base-600 bg-base-800 py-2.5 pl-9 pr-3 text-sm text-ink-100
              placeholder:text-ink-700 outline-none transition-colors focus:border-verify-500"
          />
        </div>
        {fieldErrors.confirmPassword && (
          <p id="confirmPassword-error" className="text-xs text-alert-400">
            {fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      <Button type="submit" isLoading={isLoading}>
        Create account
      </Button>

      <p className="text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-verify-400 hover:text-verify-300">
          Sign in
        </Link>
      </p>
    </form>
  );

  
}
