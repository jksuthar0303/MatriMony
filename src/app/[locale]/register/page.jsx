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
      brothers: {
        older: {
          married: 0,
          unmarried: 0,
        },
        younger: {
          married: 0,
          unmarried: 0,
        },
      },
      sisters: {
        older: {
          married: 0,
          unmarried: 0,
        },
        younger: {
          married: 0,
          unmarried: 0,
        },
      },
      paternals: [
        {
          uncle: [
            {
              name: "",
              spouseName: "",
            },
          ],
          aunt: [
            {
              name: "",
              spouseName: "",
            },
          ],
        },
      ],
      maternals: [
        {
          uncle: [
            {
              name: "",
              spouseName: "",
            },
          ],
          aunt: [
            {
              name: "",
              spouseName: "",
            },
          ],
        },
      ],
    },
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSiblingsChange = (e, siblingType, relationType) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedSiblings = { ...prevData.siblings };
      // Dynamically update the nested property using siblingType and relationType
      updatedSiblings[siblingType][relationType][name] = value;

      return {
        ...prevData,
        siblings: updatedSiblings,
      };
    });
  };

  const handleFamilyChange = (
    e,
    familyType,
    familyIndex,
    relationType,
    relationIndex,
    fieldType
  ) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedFamily = [...prevData.siblings[familyType]];

      // Update the specific uncle or aunt inside the paternals/maternals array
      updatedFamily[familyIndex][relationType][relationIndex][fieldType] =
        value;

      return {
        ...prevData,
        siblings: {
          ...prevData.siblings,
          [familyType]: updatedFamily,
        },
      };
    });
  };

  // Add a new paternal/maternal entry
  const addRelative = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      siblings: {
        ...prevState.siblings,
        [type]: [
          ...prevState.siblings[type],
          { uncleName: "", spouseName: "" },
        ],
      },
    }));
  };

  // Remove a paternal/maternal entry
  const removeRelative = (type, index) => {
    setFormData((prevState) => {
      const updatedRelatives = [...prevState.siblings[type]];
      updatedRelatives.splice(index, 1);
      return {
        ...prevState,
        siblings: {
          ...prevState.siblings,
          [type]: updatedRelatives,
        },
      };
    });
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
                <div className="grid grid-cols-1 gap-4">
                  {/* Brothers Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>{t("Register.fields.siblings.brothers")}</span>
                      <span>Married</span>
                      <span>Unmarried</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        Younger
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.brothers.younger.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "younger")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        name="married"
                        value={formData.siblings.brothers.younger.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "younger")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        Older
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.brothers.older.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "older")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        name="married"
                        value={formData.siblings.brothers.older.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "older")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sisters Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>{t("Register.fields.siblings.sisters")}</span>
                      <span>Married</span>
                      <span>Unmarried</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        Younger
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.sisters.younger.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "younger")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        name="married"
                        value={formData.siblings.sisters.younger.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "younger")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        Older
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.sisters.older.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "older")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        name="married"
                        value={formData.siblings.sisters.older.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "older")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Paternals Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>Paternals</span>
                      <span>Name</span>
                      <span>Spouse's Name</span>
                    </div>

                    {formData.siblings.paternals.map((paternal, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 w-full"
                      >
                        <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                          Uncle
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.siblings.paternals[0].uncle[0].name}
                          placeholder="Enter Name"
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "paternals",
                              0,
                              "uncle",
                              0,
                              "name"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />

                        <input
                          type="text"
                          name="spouseName"
                          placeholder="Enter Name"
                          value={
                            formData.siblings.paternals[0].uncle[0].spouseName
                          }
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "paternals",
                              0,
                              "uncle",
                              0,
                              "spouseName"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}

                    {formData.siblings.paternals.map((paternal, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 w-full"
                      >
                        <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                          Aunt
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          value={formData.siblings.paternals[0].aunt[0].name}
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "paternals",
                              0,
                              "aunt",
                              0,
                              "name"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />

                        <input
                          type="text"
                          name="spouseName"
                          placeholder="Enter Name"
                          value={
                            formData.siblings.paternals[0].aunt[0].spouseName
                          }
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "paternals",
                              0,
                              "aunt",
                              0,
                              "spouseName"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  {/* maternals Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>Maternals</span>
                      <span>Name</span>
                      <span>Spouse's Name</span>
                    </div>

                    {formData.siblings.maternals.map((maternal, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 w-full"
                      >
                        <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                          Uncle
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          value={formData.siblings.maternals[0].uncle[0].name}
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "maternals",
                              0,
                              "uncle",
                              0,
                              "name"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />

                        <input
                          type="text"
                          name="spouseName"
                          placeholder="Enter Name"
                          value={
                            formData.siblings.maternals[0].uncle[0].spouseName
                          }
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "maternals",
                              0,
                              "uncle",
                              0,
                              "spouseName"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}

                    {formData.siblings.maternals.map((maternal, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 w-full"
                      >
                        <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                          Aunt
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          value={formData.siblings.maternals[0].aunt[0].name}
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "maternals",
                              0,
                              "aunt",
                              0,
                              "name"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />

                        <input
                          type="text"
                          name="spouseName"
                          placeholder="Enter Name"
                          value={
                            formData.siblings.maternals[0].aunt[0].spouseName
                          }
                          onChange={(e) =>
                            handleFamilyChange(
                              e,
                              "maternals",
                              0,
                              "aunt",
                              0,
                              "spouseName"
                            )
                          }
                          className="p-2  border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}
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
                  checked={formData.agree || false} // Ensures it's either true or false
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agree: e.target.checked, // Sets the value to a boolean (true or false)
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md"
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
