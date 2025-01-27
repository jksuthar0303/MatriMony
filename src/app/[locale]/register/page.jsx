"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { options } from "@/option/dropDownOptions";
import Dropdown from "@/components/Dropdown";
export default function Register() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    age: "",
    dob: "",
    caste: "",
    subCaste: "",
    motherSubCaste: "",
    qualification: "",
    occupation: "",
    manglik: "",
    divyang: "",
    siblings: {
      brothers: "",
      sisters: "",
      older: "",
      younger: "",
      married: "",
      unmarried: "",
    },
    paternalUncle: "",
    paternalAunt: "",
    maternalUncle: "",
    maternalAunt: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false,
    profilePic: null,
  });
  const [caste, setCaste] = useState("suthar");
  const [subCaste, setSubCaste] = useState("kulriya");
  const [motherSubCaste, setMotherSubCaste] = useState("motiyar");
  const [qualification, setQualification] = useState("none");
  const [occupation, setOccupation] = useState("labour");
  const [state, setState] = useState("rajasthan");
  const [city, setCity] = useState("bikaner");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    cities,
    casteOptions,
    subCasteOptions,
    qualificationOptions,
    occupationOptions,
    stateOptions,
  } = options(t);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else if (name.includes(".")) {
      // Handle nested fields
      const keys = name.split(".");
      setFormData((prev) => {
        const updatedData = { ...prev };
        let nested = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!nested[keys[i]]) nested[keys[i]] = {}; // Create the object if it doesn't exist
          nested = nested[keys[i]];
        }
        nested[keys[keys.length - 1]] = type === "checkbox" ? checked : value;

        return updatedData;
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
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
    const data = { ...formData, siblings: { ...formData.siblings } };

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "same-origin",
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);

        // Clear form fields
        setFormData({
          gender: "",
          fullName: "",
          fatherName: "",
          motherName: "",
          mobile: "",
          whatsapp: "",
          email: "",
          age: "",
          dob: "",
          caste: "",
          subCaste: "",
          motherSubCaste: "",
          qualification: "",
          occupation: "",
          manglik: "",
          divyang: "",
          siblings: {
            brothers: "",
            sisters: "",
            older: "",
            younger: "",
            married: "",
            unmarried: "",
          },
          paternalUncle: "",
          paternalAunt: "",
          maternalUncle: "",
          maternalAunt: "",
          state: "",
          city: "",
          pincode: "",
          address: "",
          password: "",
          confirmPassword: "",
          agree: false,
          profilePic: null,
        });

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (error) {
      setError("Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl lg:h-[700px]  bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row">
        {/* Welcome Section */}
        <div className="lg:w-1/3 bg-pink-600 text-white p-6 rounded-lg mb-8 lg:mb-0 lg:mr-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("Register.welcomeText")}
          </h2>
          <p className="text-lg">{t("Register.introText")}</p>
        </div>

        {/* Registration Form */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
            {t("Register.createAccount")}
          </h1>
          <p className="text-center text-gray-700 mb-8">
            {t("Register.matchmakingService")}
          </p>

          {/* Error and Success Messages */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mb-4">{success}</div>
          )}

          <div className="md:h-[350px] lg:h-[500px] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Pic */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.profilePic")}
                </label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.fullName")}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterFullName")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.fatherName")}
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterFatherName")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Mother Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.motherName")}
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterMotherName")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.gender")}
                </label>
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
                    {t("Register.genderOptions.male")}
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
                    {t("Register.genderOptions.female")}
                  </label>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.mobileNo")}
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterMobileNo")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.age")}
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterAge")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.dob")}
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Caste */}
              <div>
                <Dropdown
                  options={casteOptions}
                  selectedValue={caste}
                  onChange={setCaste}
                  label={t("Filters.fields.caste.selectCaste")}
                />
              </div>

              {/* Sub Caste */}
              <div>
                <Dropdown
                  options={subCasteOptions}
                  selectedValue={subCaste}
                  onChange={setSubCaste}
                  label="Select SubCaste"
                />
              </div>

              {/* Siblings Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {t("Register.fields.sibling")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.brothers")}
                    </label>
                    <input
                      type="number"
                      name="siblings.brothers"
                      value={formData.siblings.brothers}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterBrothersCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.sisters")}
                    </label>
                    <input
                      type="number"
                      name="siblings.sisters"
                      value={formData.siblings.sisters}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterSistersCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.older")}
                    </label>
                    <input
                      type="number"
                      name="siblings.older"
                      value={formData.siblings.older}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterOlderSiblingsCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.younger")}
                    </label>
                    <input
                      type="number"
                      name="siblings.younger"
                      value={formData.siblings.younger}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterYoungerSiblingsCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.married")}
                    </label>
                    <input
                      type="number"
                      name="siblings.married"
                      value={formData.siblings.married}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterMarriedSiblingsCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("Register.fields.siblings.unmarried")}
                    </label>
                    <input
                      type="number"
                      name="siblings.unmarried"
                      value={formData.siblings.unmarried}
                      onChange={handleChange}
                      placeholder={t(
                        "Register.fields.siblings.enterUnmarriedSiblingsCount"
                      )}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Uncle and Aunt Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("Register.fields.paternalUncle")}
                  </label>
                  <input
                    type="text"
                    name="paternalUncle"
                    value={formData.paternalUncle}
                    onChange={handleChange}
                    placeholder={t("Register.fields.enterPaternalUncleName")}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("Register.fields.paternalAunt")}
                  </label>
                  <input
                    type="text"
                    name="paternalAunt"
                    value={formData.paternalAunt}
                    onChange={handleChange}
                    placeholder={t("Register.fields.enterPaternalAuntName")}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("Register.fields.maternalUncle")}
                  </label>
                  <input
                    type="text"
                    name="maternalUncle"
                    value={formData.maternalUncle}
                    onChange={handleChange}
                    placeholder={t("Register.fields.enterMaternalUncleName")}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("Register.fields.maternalAunt")}
                  </label>
                  <input
                    type="text"
                    name="maternalAunt"
                    value={formData.maternalAunt}
                    onChange={handleChange}
                    placeholder={t("Register.fields.enterMaternalAuntName")}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              {/* Qualification Section */}
              <div>
                <Dropdown
                  options={qualificationOptions}
                  selectedValue={qualification}
                  onChange={setQualification}
                  label={t("Filters.fields.qualification")}
                />
              </div>

              {/* Occupation Section */}
              <div>
                <Dropdown
                  options={occupationOptions}
                  selectedValue={occupation}
                  onChange={setOccupation}
                  label={t("Filters.fields.occupation")}
                />
              </div>

              {/* Manglik Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.manglik")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="manglik"
                      value="Yes"
                      className="accent-pink-600"
                      checked={formData.manglik === "Yes"}
                      onChange={handleChange}
                    />
                    {t("Register.fields.yes")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="manglik"
                      value="No"
                      className="accent-pink-600"
                      checked={formData.manglik === "No"}
                      onChange={handleChange}
                    />
                    {t("Register.fields.no")}
                  </label>
                </div>
              </div>

              {/* Divyang Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.divyang")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="divyang"
                      value="Yes"
                      className="accent-pink-600"
                      checked={formData.divyang === "Yes"}
                      onChange={handleChange}
                    />
                    {t("Register.fields.yes")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="divyang"
                      value="No"
                      className="accent-pink-600"
                      checked={formData.divyang === "No"}
                      onChange={handleChange}
                    />
                    {t("Register.fields.no")}
                  </label>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.address")}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterAddress")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>

              {/* State, City, Pincode Section */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Dropdown
                    options={stateOptions}
                    selectedValue={state}
                    onChange={setState}
                    label={t("Filters.fields.location.state")}
                  />
                </div>
                <div>
                  <Dropdown
                    options={cities}
                    selectedValue={city}
                    onChange={setCity}
                    label={t("Filters.fields.location.city")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("Register.fields.pincode")}
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder={t("Register.fields.enterPincode")}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                    min="0"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.password")}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterPassword")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Confirm Password Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t("Register.fields.confirmPassword")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("Register.fields.confirmPassword")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Agree to Terms */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="accent-pink-600"
                  required
                />
                <span>{t("Register.agreeTerms.agreeTerms")}</span>
                <span className="text-pink-600 underline cursor-pointer">
                  {t("Register.agreeTerms.termsAndConditions")}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition duration-300"
              >
                {t("Register.buttons.continue")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
