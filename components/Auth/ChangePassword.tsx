"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { authClient, changePassword, signOut } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedLogo from "@/components/AnimatedLogo";

import {
  ChangePassFormData,
  ChangePassSchema,
} from "@/lib/validations/changePassSchema";

export default function ChangePassword() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePassFormData>({
    resolver: zodResolver(ChangePassSchema),
  });

  const onSubmit = async (data: ChangePassFormData) => {
    setAuthError(null);
    setLoading(true);
    const { error } = await changePassword({
      newPassword: data.newPassword,
      currentPassword: data.oldPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setAuthError(error.message ?? "Invalid password.");
      setLoading(false);
    } else {
      router.push("/login");
      signOut();
    }
  };

  return session ? (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div>

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Change Password
        </h1>

        <form className="">
          <div className=" relative mb-4">
            <FormInput
              label="Current Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              register={register("oldPassword")}
              error={errors.oldPassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-primary hover:underline absolute right-3 top-9"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className=" relative mb-4">
            <FormInput
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              register={register("newPassword")}
              error={errors.newPassword}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="text-sm text-primary hover:underline absolute right-3 top-9"
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className=" relative mb-4">
            <FormInput
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-sm text-primary hover:underline absolute right-3 top-9"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Auth error */}
          {authError && <p className="text-sm text-brand-red">{authError}</p>}
          <AuthButton
            // type="submit"
            className="w-full bg-brand-red text-white py-2 rounded-lg hover:bg-brand-red/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || loading}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Processing..." : "Change Password"}
          </AuthButton>
        </form>
      </div>
    </div>
  ) : isPending ? (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Loading...
        </h1>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          You are not logged in
        </h1>
        <p className="mb-4 text-center text-gray-400">
          Please log in to change your password.
        </p>
        <AuthButton
          className="w-full bg-brand-red text-white py-2 rounded-lg hover:bg-brand-red/80 transition-colors duration-200"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </AuthButton>
      </div>
    </div>
  );
}
