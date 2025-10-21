"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type AuthMode = "login" | "signup" | "forgot";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: Record<string, string>) => void;
  onSendCode?: (email: string) => Promise<boolean>; // 注册验证码发送逻辑
}

export default function AuthForm({ mode, onSubmit, onSendCode }: AuthFormProps) {
  const t = useTranslations("Auth");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 倒计时逻辑
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSendCode = async () => {
    if (!formData.email) {
      alert(t("pleaseEnterEmail"));
      return;
    }
    if (sending || countdown > 0) return;
    try {
      setSending(true);
      const success = await onSendCode?.(formData.email);
      if (success) {
        setCountdown(60);
      }
    } catch {
      alert(t("sendFailed"));
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md"
    >
      {/* Email */}
      <div>
        <label className="block mb-1 text-sm font-medium">{t("email")}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Password */}
      {(mode === "login" || mode === "signup") && (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 pr-10 focus:ring-2 focus:ring-primary outline-none"
              placeholder={t("passwordPlaceholder")}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Confirm Password */}
      {mode === "signup" && (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("confirmPassword")}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            placeholder={t("confirmPasswordPlaceholder")}
          />
        </div>
      )}

      {/* Verification Code */}
      {mode === "signup" && (
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("verificationCode")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="code"
              maxLength={6}
              pattern="\d{6}"
              value={formData.code}
              onChange={handleChange}
              required
              className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder={t("verificationCodePlaceholder")}
            />
            <button
              type="button"
              disabled={countdown > 0 || sending}
              onClick={handleSendCode}
              className={`w-32 text-sm rounded-lg border px-3 py-2 ${countdown > 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:opacity-90"
                }`}
            >
              {countdown > 0
                ? `${countdown}s`
                : sending
                  ? t("sending")
                  : t("sendCode")}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="text-left">
          {mode === "login" ? <Link href={'/signup'} className="text-sm text-primary hover:underline">
            {t("signup")}
          </Link> : <Link href={'/login'} className="text-sm text-primary hover:underline">
            {t("login")}
          </Link>}
        </div>
        <div className="text-right">
          <Link href={'/forgot-password'} className="text-sm text-primary hover:underline">
            {t("forgotPassword")}
          </Link>
        </div>
      </div>


      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
      >
        {mode === "login"
          ? t("login")
          : mode === "signup"
            ? t("signup")
            : t("resetPassword")}
      </button>
      <button
        onClick={() => signIn("google")}
        type="button"
        className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
      >
        Google {t("login")}
      </button>
    </form >
  );
}
