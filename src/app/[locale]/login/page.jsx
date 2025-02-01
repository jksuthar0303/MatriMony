"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const t = useTranslations("Login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/");
        window.location.reload();
      } else {
        setError(result.message || t("invalidCredentials"));
      }
    } catch (error) {
      setError(t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row">
        {/* Welcome Section */}
        <div className="lg:w-1/3 bg-pink-600 text-white p-6 rounded-lg mb-8 lg:mb-0 lg:mr-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{t("welcomeBack")}</h2>
          <p className="text-lg">{t("introText")}</p>
        </div>

        {/* Login Form */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
            {t("loginToAccount")}
          </h1>
          <p className="text-center text-gray-700 mb-8">
            {t("enterCredentials")}
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("fields.emailID")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("fields.enterEmail")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("fields.password")}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("fields.enterPassword")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-pink-600 text-white py-3 rounded-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-500"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                      className="opacity-25"
                    />
                    <path
                      fill="none"
                      strokeWidth="4"
                      d="M4 12a8 8 0 1 1 16 0 8 8 0 1 1-16 0"
                      className="opacity-75"
                    />
                  </svg>
                </div>
              ) : (
                t("buttons.login")
              )}
            </button>

            <p className="text-center mt-4">
              {t("buttons.noAccount")}{" "}
              <Link href="/register" className="text-pink-600 font-semibold underline">
                {t("buttons.createAccount")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
