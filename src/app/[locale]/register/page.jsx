"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { options } from "@/option/dropDownOptions";
import Dropdown from "@/components/Dropdown";
import { Link, useRouter } from "@/i18n/routing";
export default function Register() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    gender: "Male",
    fullName: "Jaikishan Suthar",
    fatherName: "Omprakash",
    motherName: "Laxmi Devi",
    mobile: "9001505613",
    whatsapp: "9001505613",
    email: "jksuthar2022@gmail.com",
    age: "18",
    dob: "",
    caste: "suthar",
    subCaste: "kulriya",
    motherSubCaste: "motiyar",
    qualification: "none",
    occupation: "labour",
    manglik: "No",
    divyang: "No",
    siblings: {
      brothers: ["Ayush", "Ravi"],
      sisters: ["Neha", "Simran"],
      older: "1",
      younger: "2",
      married: "3",
      unmarried: "4",
    },
    paternalUncle: ["Uncle1", "Uncle2"],
    paternalAunt: ["Aunt1", "Aunt2"],
    maternalUncle: ["Uncle3", "Uncle4"],
    maternalAunt: ["Aunt3", "Aunt4"],
    state: "rajasthan",
    city: "bikaner",
    pincode: "334004",
    address: "Near Old Shiv temple bangla nagar",
    password: "12345678",
    confirmPassword: "12345678",
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
  const [loading, setLoading] = useState(false);

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
    const { name, value, type, checked } = e.target;

    if (name.includes("siblings")) {
      const siblingKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        siblings: {
          ...prevData.siblings,
          [siblingKey]: value,
        },
      }));
    } else if (
      name.includes("paternalUncle") ||
      name.includes("paternalAunt") ||
      name.includes("maternalUncle") ||
      name.includes("maternalAunt")
    ) {
      const key = name;
      const arrayValue = value.split(",").map((item) => item.trim());

      setFormData((prevData) => ({
        ...prevData,
        [key]: arrayValue,
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePic: reader.result, // Store base64 image data
        }));
      };
    }
  };
  // Function to add new sibling (brother or sister)
  const handleAddSibling = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      siblings: {
        ...prevData.siblings,
        [type]: [...prevData.siblings[type], ""], // Adding an empty string as a new sibling input
      },
    }));
  };

  // Function to add new uncle or aunt (paternal or maternal)
  const handleAddUncleAunt = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ""], // Adding an empty string as a new uncle/aunt input
    }));
  };

  // Function to remove a sibling
  const handleRemoveSibling = (type, index) => {
    const updatedSiblings = [...formData.siblings[type]];
    updatedSiblings.splice(index, 1); // Removing the sibling at the specified index
    setFormData((prevData) => ({
      ...prevData,
      siblings: {
        ...prevData.siblings,
        [type]: updatedSiblings,
      },
    }));
  };

  // Function to remove an uncle or aunt
  const handleRemoveUncleAunt = (type, index) => {
    const updatedUnclesAunts = [...formData[type]];
    updatedUnclesAunts.splice(index, 1); // Removing the uncle/aunt at the specified index
    setFormData((prevData) => ({
      ...prevData,
      [type]: updatedUnclesAunts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData("");
        router.push("/");
        window.location.reload();
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      setError(t("Registration Failed"));
      alert("Error registering user: " + error.message);
    } finally {
      setLoading(false);
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

          <div className="md:h-[350px] lg:h-[500px] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Pic */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.profilePic")}
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
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
                <label className="block font-bold text-pink-600 mb-2">
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
                <label className="block font-bold text-pink-600 mb-2">
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
                <label className="block font-bold text-pink-600 mb-2">
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
                <label className="block font-bold text-pink-600 mb-2">
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
              {/* Email */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.email")}
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("Register.fields.enterEmail")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.age")}
                </label>
                <input
                  type="number"
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
                <label className="block font-bold text-pink-600 mb-2">
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
                  label={t("Filters.fields.caste.selectSubCaste")}
                />
              </div>
              {/*Mother Sub Caste */}
              <div>
                <Dropdown
                  options={subCasteOptions}
                  selectedValue={motherSubCaste}
                  onChange={setMotherSubCaste}
                  label={t("Register.fields.motherSubCaste")}
                />
              </div>

              {/* Siblings Section */}
              <div>
                <h3 className="text-lg font-bold text-pink-600 mb-4">
                  {t("Register.fields.sibling")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-medium mb-2">
                      {t("Register.fields.siblings.brothers")}
                    </label>
                    <div>
                      {formData.siblings.brothers.map((brother, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            name="siblings.brothers"
                            value={brother}
                            placeholder={t(
                              "Register.fields.siblings.enterBrothersName"
                            )}
                            onChange={(e) => {
                              const updatedBrothers = [
                                ...formData.siblings.brothers,
                              ];
                              updatedBrothers[index] = e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                siblings: {
                                  ...prevData.siblings,
                                  brothers: updatedBrothers,
                                },
                              }));
                            }}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSibling("brothers", index)
                            }
                            className="ml-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddSibling("brothers")}
                        className="mt-2 text-blue-500"
                      >
                        Add Brother
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-2">
                      {t("Register.fields.siblings.sisters")}
                    </label>
                    <div>
                      {formData.siblings.sisters.map((sister, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            name="siblings.sisters"
                            value={sister}
                            placeholder={t(
                              "Register.fields.siblings.enterSistersName"
                            )}
                            onChange={(e) => {
                              const updatedSisters = [
                                ...formData.siblings.sisters,
                              ];
                              updatedSisters[index] = e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                siblings: {
                                  ...prevData.siblings,
                                  sisters: updatedSisters,
                                },
                              }));
                            }}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSibling("sisters", index)
                            }
                            className="ml-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddSibling("sisters")}
                        className="mt-2 text-blue-500"
                      >
                        Add Sister
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-2">
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
                    <label className="block text-gray-400 font-medium mb-2">
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
                    <label className="block text-gray-400 font-medium mb-2">
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
                    <label className="block text-gray-400 font-medium mb-2">
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
                  <label className="block text-gray-400 font-medium mb-2">
                    {t("Register.fields.paternalUncle")}
                  </label>
                  <div>
                    {formData.paternalUncle.map((uncle, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          name="paternalUncle"
                          value={uncle}
                          placeholder={t(
                            "Register.fields.enterPaternalUncleName"
                          )}
                          onChange={(e) => {
                            const updatedUncles = [...formData.paternalUncle];
                            updatedUncles[index] = e.target.value;
                            setFormData((prevData) => ({
                              ...prevData,
                              paternalUncle: updatedUncles,
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveUncleAunt("paternalUncle", index)
                          }
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddUncleAunt("paternalUncle")}
                      className="mt-2 text-blue-500"
                    >
                      Add Paternal Uncle
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    {t("Register.fields.paternalAunt")}
                  </label>
                  <div>
                    {formData.paternalAunt.map((aunt, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          name="paternalAunt"
                          value={aunt}
                          placeholder={t(
                            "Register.fields.enterPaternalAuntName"
                          )}
                          onChange={(e) => {
                            const updatedAunts = [...formData.paternalAunt];
                            updatedAunts[index] = e.target.value;
                            setFormData((prevData) => ({
                              ...prevData,
                              paternalAunt: updatedAunts,
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveUncleAunt("paternalAunt", index)
                          }
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddUncleAunt("paternalAunt")}
                      className="mt-2 text-blue-500"
                    >
                      Add Paternal Aunt
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    {t("Register.fields.maternalUncle")}
                  </label>
                  <div>
                    {formData.maternalUncle.map((uncle, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          name="maternalUncle"
                          value={uncle}
                          placeholder={t(
                            "Register.fields.enterMaternalUncleName"
                          )}
                          onChange={(e) => {
                            const updatedUncles = [...formData.maternalUncle];
                            updatedUncles[index] = e.target.value;
                            setFormData((prevData) => ({
                              ...prevData,
                              maternalUncle: updatedUncles,
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveUncleAunt("maternalUncle", index)
                          }
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddUncleAunt("maternalUncle")}
                      className="mt-2 text-blue-500"
                    >
                      Add Maternal Uncle
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    {t("Register.fields.maternalAunt")}
                  </label>
                  <div>
                    {formData.maternalAunt.map((aunt, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          name="maternalAunt"
                          value={aunt}
                          placeholder={t(
                            "Register.fields.enterMaternalAuntName"
                          )}
                          onChange={(e) => {
                            const updatedAunts = [...formData.maternalAunt];
                            updatedAunts[index] = e.target.value;
                            setFormData((prevData) => ({
                              ...prevData,
                              maternalAunt: updatedAunts,
                            }));
                          }}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveUncleAunt("maternalAunt", index)
                          }
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddUncleAunt("maternalAunt")}
                      className="mt-2 text-blue-500"
                    >
                      Add Maternal Aunt
                    </button>
                  </div>
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
                <label className="block text-pink-600 font-bold mb-2">
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
                <label className="block text-pink-600 font-bold mb-2">
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
                <label className="block text-pink-600 font-bold mb-2">
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
              <div className="grid md:grid-cols-3 gap-4">
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
                  <label className="block text-pink-600 font-bold mb-2">
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
                <label className="block text-pink-600 font-bold mb-2">
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
                <label className="block text-pink-600 font-bold mb-2">
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
                className={`w-full bg-pink-600 text-white py-3 rounded-lg font-semibold ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-pink-500"
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
                  t("Register.buttons.continue")
                )}
              </button>
            </form>
            <p className="text-center mt-4">
              {t("Register.buttons.alreadyAccount")}{" "}
              <Link
                href="/login"
                className="text-pink-600 font-semibold underline"
              >
                {t("Register.buttons.login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
