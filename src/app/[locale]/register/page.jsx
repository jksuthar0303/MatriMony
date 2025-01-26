"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";

export default function Register() {
  const t = useTranslations("Register");

  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    agree: false,
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");
const router = useRouter();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Prepare data to send to the API
    const data = {
      name: formData.fullName,
      gender: formData.gender,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dob,
      agree: formData.agree,
    };
  
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "same-origin", // Ensures cookies are sent and stored
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success message
        setSuccess(result.message);
  
        // Clear form fields
        setFormData({
          gender: "",
          fullName: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
          dob: "",
          maritalStatus: "",
          agree: false,
        });
  
        // Redirect to homepage after successful registration
        setTimeout(() => {
          router.push("/");  // Make sure the redirect happens after the success message
        }, 1500);  // Adding a small delay before the redirect to show the success message
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (error) {
      setError("Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row">
        {/* Welcome Section */}
        <div className="lg:w-1/3 bg-pink-600 text-white p-6 rounded-lg mb-8 lg:mb-0 lg:mr-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{t('welcomeText')}</h2>
          <p className="text-lg">{t("introText")}</p>
        </div>

        {/* Registration Form */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
            {t("createAccount")}
          </h1>
          <p className="text-center text-gray-700 mb-8">{t("matchmakingService")}</p>

          {/* Error and Success Messages */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.gender")}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="accent-pink-600"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    required
                  />
                  {t("genderOptions.male")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="accent-pink-600"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    required
                  />
                  {t("genderOptions.female")}
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.fullName")}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t("fields.enterFullName")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.mobileNo")}</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder={t("fields.enterMobileNo")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.email")}</label>
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
              <label className="block text-gray-700 font-medium mb-2">{t("fields.createPassword")}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("fields.enterCreatePassword")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.confirmPassword")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("fields.enterConfirmPassword")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.dob")}</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              />
            </div>

            {/* Marital Status
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("fields.maritalStatus")}</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              >
                <option value="">{t("maritalStatusOptions.select")}</option>
                <option value="Single">{t("maritalStatusOptions.single")}</option>
                <option value="Married">{t("maritalStatusOptions.married")}</option>
                <option value="Divorced">{t("maritalStatusOptions.divorced")}</option>
                <option value="Widowed">{t("maritalStatusOptions.widowed")}</option>
              </select>
            </div> */}

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                className="accent-pink-600"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <span className="ml-2 text-gray-700">
                {t("agreeTerms.agreeTerms")}{" "}
                <a href="#" className="text-pink-600 underline">
                  {t("agreeTerms.termsAndConditions")}
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-500 transition-all"
            >
              {t("buttons.continue")}
            </button>

            <p className="text-center mt-4">
              {t("buttons.alreadyAccount")}{" "}
              <Link href="/login" className="text-pink-600 font-semibold">
                {t("buttons.login")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
