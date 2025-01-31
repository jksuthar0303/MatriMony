"use client";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { options } from "@/option/dropDownOptions";
import Dropdown from "@/components/Dropdown";
import { Link, useRouter } from "@/i18n/routing";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import { Slider } from "@/components/Slider";
import { Dialog } from "@/components/Dailog";
export default function Register() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    email: "",
    age: "",
    dob: "",
    caste: "",
    subCaste: "",
    motherSubCaste: "",
    qualification: "none",
    occupation: "none",
    manglik: "No",
    divyang: "No",
    remarriage: "No",
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
    state: "Rajasthan",
    city: "",
    pincode: "334004",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false,
    profilePic: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);

  const {
    cities,
    casteOptions,
    subCasteOptions,
    qualificationOptions,
    occupationOptions,
    stateOptions,
  } = options(t);
  const router = useRouter();

  const handleChange = (eOrValue, name) => {
    if (typeof eOrValue === "object" && eOrValue.target) {
      const { name, value } = eOrValue.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: eOrValue }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 300 * 1024) {
        alert("Profile picture size must not exceed 300KB.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result, 
        }));

        setErrors((prev) => ({
          ...prev,
          profilePic: "",
        }));

        setShowCropModal(true);
      };
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      agree: e.target.checked,
    }));

    // Clear error when checkbox is checked
    setErrors((prev) => ({
      ...prev,
      agree: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSiblingsChange = (e, siblingType, relationType) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedSiblings = { ...prevData.siblings };
      updatedSiblings[siblingType][relationType][name] = value;

      return {
        ...prevData,
        siblings: updatedSiblings,
      };
    });
  };

  const handleFamilyChange = (
    e,
    relationType,
    index,
    role,
    subIndex,
    field
  ) => {
    const updatedSiblings = { ...formData.siblings };
    updatedSiblings[relationType][index][role][subIndex][field] =
      e.target.value;
    setFormData({
      ...formData,
      siblings: updatedSiblings,
    });
  };

  const addFamilyMember = (relationType, index, role) => {
    const updatedSiblings = { ...formData.siblings };
    updatedSiblings[relationType][index][role].push({
      name: "",
      spouseName: "",
    });
    setFormData({
      ...formData,
      siblings: updatedSiblings,
    });
  };

  const removeFamilyMember = (relationType, index, role, subIndex) => {
    const updatedSiblings = { ...formData.siblings };
    updatedSiblings[relationType][index][role].splice(subIndex, 1);
    setFormData({
      ...formData,
      siblings: updatedSiblings,
    });
  };

  const onCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImageUrl);
    },
    [imageSrc]
  );

  const handleSave = () => {
    setFormData((prevData) => ({
      ...prevData,
      profilePic: croppedImage,
    }));
    setShowCropModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Focus on the first invalid field
    if (Object.keys(validationErrors).length > 0) {
      for (let field in validationErrors) {
        switch (field) {
          case "gender":
            genderRef.current.focus();
            break;
          case "fullName":
            fullNameRef.current.focus();
            break;
          case "fatherName":
            fatherNameRef.current.focus();
            break;
          case "motherName":
            motherNameRef.current.focus();
            break;
          case "mobile":
            mobileRef.current.focus();
            break;
          case "email":
            emailRef.current.focus();
            break;
          case "age":
            ageRef.current.focus();
            break;
          case "dob":
            dobRef.current.focus();
            break;
          case "caste":
            casteRef.current.focus();
            break;
          case "subCaste":
            subCasteRef.current.focus();
            break;
          case "motherSubCaste":
            motherSubCasteRef.current.focus();
            break;
          case "address":
            addressRef.current.focus();
            break;
          case "city":
            cityRef.current.focus();
            break;
          case "pincode":
            pincodeRef.current.focus();
            break;
          case "password":
            passwordRef.current.focus();
            break;
          case "confirmPassword":
            confirmPasswordRef.current.focus();
            break;
          case "agree":
            agreeRef.current.focus();
            break;
          case "profilePic":
            profilePicRef.current.focus();
            break;
          default:
            break;
        }
        break; // Stop after focusing the first invalid field
      }
      return; // Prevent form submission
    }

    // Form is valid, proceed with submission
    console.log("Form is valid, submitting...");

    setLoading(true);
    setError(""); // Reset any previous error state

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
        setFormData(""); // Clear form after successful registration
        router.push("/"); // Redirect to home page
        window.location.reload(); // Reload the page
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      setError(t("Registration Failed"));
      alert("Error registering user: " + error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const profilePicRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const genderRef = useRef(null);
  const fatherNameRef = useRef(null);
  const motherNameRef = useRef(null);
  const mobileRef = useRef(null);
  const ageRef = useRef(null);
  const dobRef = useRef(null);
  const casteRef = useRef(null);
  const subCasteRef = useRef(null);
  const motherSubCasteRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const agreeRef = useRef(null);

  const validateForm = () => {
    const errors = {};

    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.fatherName) errors.fatherName = "Father Name is required";
    if (!formData.motherName) errors.motherName = "Mother Name is required";
    if (!formData.mobile) errors.mobile = "Mobile Number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.dob) errors.dob = "D.O.B is required";

    if (!formData.caste) errors.caste = "Caste is required";
    if (!formData.subCaste) errors.subCaste = "SubCaste is required";
    if (!formData.motherSubCaste)
      errors.motherSubCaste = "Mother's SubCaste is required";

    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.pincode) errors.pincode = "Pincode is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.agree)
      errors.agree = "Please Agree to the Terms and Conditions";
    if (!formData.profilePic) errors.profilePic = "Profile Picture is required";
    return errors;
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
                {t("Register.fields.profilepic")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={profilePicRef}
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
                {errors.profilePic && (
                  <span style={{ color: "red" }}>{errors.profilePic}</span>
                )}
                {showCropModal && (
                  <Dialog
                    open={showCropModal}
                    onClose={() => setShowCropModal(false)}
                  >
                    <div className="relative w-full h-96">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={setZoom}
                      />
                      <button
                        className="bg-pink-500 text-white p-2 rounded"
                        onClick={handleSave}
                      >
                        Save Cropped Image
                      </button>
                    </div>
                  </Dialog>
                )}

                {croppedImage && (
                  <div className="mt-4">
                    <img
                      src={croppedImage}
                      alt="Cropped Preview"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.fullName")}
                </label>
                <input
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(value) => handleChange(value, "fullName")}
                  placeholder={t("Register.fields.enterFullName")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <span style={{ color: "red" }}>{errors.fullName}</span>
                )}
              </div>

              {/* Father Name */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.fatherName")}
                </label>
                <input
                  ref={fatherNameRef}
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleChange(e, "fatherName")} // Added onChange for fatherName
                  placeholder={t("Register.fields.enterFatherName")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.fatherName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fatherName && (
                  <span style={{ color: "red" }}>{errors.fatherName}</span>
                )}
              </div>

              {/* Mother Name */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.motherName")}
                </label>
                <input
                  ref={motherNameRef}
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleChange(e, "motherName")} // Added onChange for motherName
                  placeholder={t("Register.fields.enterMotherName")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.motherName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.motherName && (
                  <span style={{ color: "red" }}>{errors.motherName}</span>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.gender")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      ref={genderRef}
                      type="radio"
                      name="gender"
                      value="Male"
                      className="accent-pink-600"
                      checked={formData.gender === "Male"}
                      onChange={(e) => handleChange(e, "gender")} // Added onChange for gender
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
                      onChange={(e) => handleChange(e, "gender")} // Added onChange for gender
                    />
                    {t("Register.genderOptions.female")}
                  </label>
                </div>
                {errors.gender && (
                  <span style={{ color: "red" }}>{errors.gender}</span>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.mobileNo")}
                </label>
                <input
                  ref={mobileRef}
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleChange(e, "mobile")} // Added onChange for mobile
                  placeholder={t("Register.fields.enterMobileNo")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobile && (
                  <span style={{ color: "red" }}>{errors.mobile}</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.email")}
                </label>
                <input
                  ref={emailRef}
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")} // Added onChange for email
                  placeholder={t("Register.fields.enterEmail")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.age")}
                </label>
                <input
                  ref={ageRef}
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleChange(e, "age")} // Added onChange for age
                  placeholder={t("Register.fields.enterAge")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.age && (
                  <span style={{ color: "red" }}>{errors.age}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block font-bold text-pink-600 mb-2">
                  {t("Register.fields.dob")}
                </label>
                <input
                  ref={dobRef}
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) => handleChange(e, "dob")} // Added onChange for dob
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dob && (
                  <span style={{ color: "red" }}>{errors.dob}</span>
                )}
              </div>

              {/* Caste */}
              <div>
                <Dropdown
                  ref={casteRef}
                  options={casteOptions}
                  selectedValue={formData.caste}
                  onChange={(value) => handleChange(value, "caste")}
                  label={t("Filters.fields.caste.selectCaste")}
                />
                {errors.caste && (
                  <span style={{ color: "red" }}>{errors.caste}</span>
                )}
              </div>

              {/* Sub Caste */}
              <div>
                <Dropdown
                  ref={subCasteRef}
                  options={subCasteOptions}
                  selectedValue={formData.subCaste}
                  onChange={(value) => handleChange(value, "subCaste")}
                  label={t("Filters.fields.caste.selectSubCaste")}
                />
                {errors.subCaste && (
                  <span style={{ color: "red" }}>{errors.subCaste}</span>
                )}
              </div>

              {/*Mother Sub Caste */}
              <div>
                <Dropdown
                  ref={motherSubCasteRef}
                  options={subCasteOptions}
                  selectedValue={formData.motherSubCaste}
                  onChange={(value) => handleChange(value, "motherSubCaste")}
                  label={t("Register.fields.motherSubCaste")}
                />
                {errors.motherSubCaste && (
                  <span style={{ color: "red" }}>{errors.motherSubCaste}</span>
                )}
              </div>

              {/*Siblings Section */}
              <div>
                <h3 className="text-lg font-bold text-pink-600 mb-4">
                  {t("Register.fields.sibling")}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Brothers Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>{t("Register.fields.siblings.brothers")}</span>
                      <span>{t("Register.fields.siblings.married")}</span>
                      <span>{t("Register.fields.siblings.unMarried")}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        {t("Register.fields.siblings.younger")}
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.brothers.younger.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "younger")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <select
                        name="unmarried"
                        value={formData.siblings.brothers.younger.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "younger")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        {t("Register.fields.siblings.older")}
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.brothers.older.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "older")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <select
                        name="unmarried"
                        value={formData.siblings.brothers.older.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "brothers", "older")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sisters Section */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex text-white p-2 rounded-lg font-bold justify-between bg-pink-600">
                      <span>{t("Register.fields.siblings.sisters")}</span>
                      <span> {t("Register.fields.siblings.married")}</span>
                      <span> {t("Register.fields.siblings.unMarried")}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        {t("Register.fields.siblings.younger")}
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.sisters.younger.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "younger")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <select
                        name="unmarried"
                        value={formData.siblings.sisters.younger.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "younger")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <span className="flex  text-pink-600 justify-center items-center rounded-lg font-bold">
                        {t("Register.fields.siblings.older")}
                      </span>
                      <select
                        name="married"
                        value={formData.siblings.sisters.older.married}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "older")
                        }
                        className="p-2 border border-gray-300 focus:border-pink-600  rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <select
                        name="unmarried"
                        value={formData.siblings.sisters.older.unmarried}
                        onChange={(e) =>
                          handleSiblingsChange(e, "sisters", "older")
                        }
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        {[...Array(11)].map((_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Paternals Section */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between bg-pink-600 text-white p-3 rounded-lg font-bold">
                      <span className="flex-1 text-center">
                        {t("Register.fields.siblings.paternals")}
                      </span>
                    </div>

                    {formData.siblings.paternals.map((paternal, index) => (
                      <div key={index} className="space-y-4">
                        {paternal.uncle.map((uncle, subIndex) => (
                          <div
                            key={subIndex}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                          >
                            <div className="flex justify-between items-center gap-4 lg:col-span-1 md:col-span-2">
                              <span className="text-pink-600 font-bold">
                                {t("Register.fields.siblings.paternalUncle")}
                              </span>
                              <div className="flex space-x-2">
                                <PlusCircleIcon
                                  className="h-6 w-6 text-green-600 cursor-pointer"
                                  onClick={() =>
                                    addFamilyMember("paternals", index, "uncle")
                                  }
                                />
                                {paternal.uncle.length > 1 && (
                                  <MinusCircleIcon
                                    className="h-6 w-6 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      removeFamilyMember(
                                        "paternals",
                                        index,
                                        "uncle",
                                        subIndex
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                name="name"
                                value={uncle.name}
                                placeholder={t(
                                  "Register.fields.siblings.enterName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "paternals",
                                    index,
                                    "uncle",
                                    subIndex,
                                    "name"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="spouseName"
                                value={uncle.spouseName}
                                placeholder={t(
                                  "Register.fields.siblings.enterSpouseName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "paternals",
                                    index,
                                    "uncle",
                                    subIndex,
                                    "spouseName"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}

                        {paternal.aunt.map((aunt, subIndex) => (
                          <div
                            key={subIndex}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                          >
                            <div className="flex justify-between items-center gap-4 lg:col-span-1 md:col-span-2">
                              <span className="text-pink-600 font-bold">
                                {t("Register.fields.siblings.paternalAunt")}
                              </span>
                              <div className="flex space-x-2">
                                <PlusCircleIcon
                                  className="h-6 w-6 text-green-600 cursor-pointer"
                                  onClick={() =>
                                    addFamilyMember("paternals", index, "aunt")
                                  }
                                />
                                {paternal.aunt.length > 1 && (
                                  <MinusCircleIcon
                                    className="h-6 w-6 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      removeFamilyMember(
                                        "paternals",
                                        index,
                                        "aunt",
                                        subIndex
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                name="name"
                                value={aunt.name}
                                placeholder={t(
                                  "Register.fields.siblings.enterName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "paternals",
                                    index,
                                    "aunt",
                                    subIndex,
                                    "name"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="spouseName"
                                value={aunt.spouseName}
                                placeholder={t(
                                  "Register.fields.siblings.enterSpouseName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "paternals",
                                    index,
                                    "aunt",
                                    subIndex,
                                    "spouseName"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Maternals Section */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between bg-pink-600 text-white p-3 rounded-lg font-bold">
                      <span className="flex-1 text-center">
                        {t("Register.fields.siblings.maternals")}
                      </span>
                    </div>

                    {formData.siblings.maternals.map((maternal, index) => (
                      <div key={index} className="space-y-4">
                        {maternal.uncle.map((uncle, subIndex) => (
                          <div
                            key={subIndex}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                          >
                            <div className="flex justify-between items-center gap-4 lg:col-span-1 md:col-span-2">
                              <span className="text-pink-600 font-bold">
                                {t("Register.fields.siblings.maternalUncle")}
                              </span>
                              <div className="flex space-x-2">
                                <PlusCircleIcon
                                  className="h-6 w-6 text-green-600 cursor-pointer"
                                  onClick={() =>
                                    addFamilyMember("maternals", index, "uncle")
                                  }
                                />
                                {maternal.uncle.length > 1 && (
                                  <MinusCircleIcon
                                    className="h-6 w-6 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      removeFamilyMember(
                                        "maternals",
                                        index,
                                        "uncle",
                                        subIndex
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                name="name"
                                value={uncle.name}
                                placeholder={t(
                                  "Register.fields.siblings.enterName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "maternals",
                                    index,
                                    "uncle",
                                    subIndex,
                                    "name"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="spouseName"
                                value={uncle.spouseName}
                                placeholder={t(
                                  "Register.fields.siblings.enterSpouseName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "maternals",
                                    index,
                                    "uncle",
                                    subIndex,
                                    "spouseName"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}

                        {maternal.aunt.map((aunt, subIndex) => (
                          <div
                            key={subIndex}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                          >
                            <div className="flex justify-between items-center gap-4 lg:col-span-1 md:col-span-2">
                              <span className="text-pink-600 font-bold">
                                {t("Register.fields.siblings.maternalAunt")}
                              </span>
                              <div className="flex space-x-2">
                                <PlusCircleIcon
                                  className="h-6 w-6 text-green-600 cursor-pointer"
                                  onClick={() =>
                                    addFamilyMember("maternals", index, "aunt")
                                  }
                                />
                                {maternal.aunt.length > 1 && (
                                  <MinusCircleIcon
                                    className="h-6 w-6 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      removeFamilyMember(
                                        "maternals",
                                        index,
                                        "aunt",
                                        subIndex
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                name="name"
                                value={aunt.name}
                                placeholder={t(
                                  "Register.fields.siblings.enterName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "maternals",
                                    index,
                                    "aunt",
                                    subIndex,
                                    "name"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                name="spouseName"
                                value={aunt.spouseName}
                                placeholder={t(
                                  "Register.fields.siblings.enterSpouseName"
                                )}
                                onChange={(e) =>
                                  handleFamilyChange(
                                    e,
                                    "maternals",
                                    index,
                                    "aunt",
                                    subIndex,
                                    "spouseName"
                                  )
                                }
                                className="p-3 border border-gray-300 rounded-md w-full text-sm sm:text-base focus:border-pink-600 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Qualification Section */}
              <div>
                <Dropdown
                  options={qualificationOptions}
                  selectedValue={formData.qualification}
                  onChange={(value) => handleChange(value, "qualification")}
                  label={t("Filters.fields.qualification")}
                />
              </div>

              {/* Occupation Section */}
              <div>
                <Dropdown
                  options={occupationOptions}
                  selectedValue={formData.occupation}
                  onChange={(value) => handleChange(value, "occupation")}
                  label={t("Filters.fields.occupation")}
                />
              </div>

              <div className="flex justify-between">
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
                {/* Remarrige Section */}
                <div>
                  <label className="block text-pink-600 font-bold mb-2">
                    {t("Register.fields.remarriage")}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="remarriage"
                        value="Yes"
                        className="accent-pink-600"
                        checked={formData.remarriage === "Yes"}
                        onChange={handleChange}
                      />
                      {t("Register.fields.yes")}
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="remarriage"
                        value="No"
                        className="accent-pink-600"
                        checked={formData.remarriage === "No"}
                        onChange={handleChange}
                      />
                      {t("Register.fields.no")}
                    </label>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <label className="block text-pink-600 font-bold mb-2">
                  {t("Register.fields.address")}
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleChange(e, "address")} // Added onChange for address
                  placeholder={t("Register.fields.enterAddress")}
                  className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <span style={{ color: "red" }}>{errors.address}</span>
                )}
              </div>

              {/* State, City, Pincode Section */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Dropdown
                    options={stateOptions}
                    selectedValue={formData.state}
                    onChange={(value) => handleChange(value, "state")}
                    label={t("Filters.fields.location.state")}
                  />
                </div>
                <div>
                  <Dropdown
                    ref={cityRef}
                    options={cities}
                    selectedValue={formData.city}
                    onChange={(value) => handleChange(value, "city")}
                    label={t("Filters.fields.location.city")}
                  />
                  {errors.city && (
                    <span style={{ color: "red" }}>{errors.city}</span>
                  )}
                </div>

                <div>
                  <label className="block text-pink-600 font-bold mb-2">
                    {t("Register.fields.pincode")}
                  </label>
                  <input
                    ref={pincodeRef}
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleChange(e, "pincode")} // Call handleChange with 'pincode'
                    placeholder={t("Register.fields.enterPincode")}
                    className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                    min="0"
                  />
                  {errors.pincode && (
                    <span style={{ color: "red" }}>{errors.pincode}</span>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-pink-600 font-bold mb-2">
                  {t("Register.fields.password")}
                </label>
                <input
                  ref={passwordRef}
                  type={showPasswords ? "text" : "password"} // Controlled by one state
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")} // Handle change
                  placeholder={t("Register.fields.enterPassword")}
                  className={`w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Section with Eye Icon */}
              <div className="relative">
                <label className="block text-pink-600 font-bold mb-2">
                  {t("Register.fields.confirmPassword")}
                </label>
                <input
                  ref={confirmPasswordRef}
                  type={showPasswords ? "text" : "password"} // Controlled by one state
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e, "confirmPassword")} // Handle change
                  placeholder={t("Register.fields.confirmPassword")}
                  className={`w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-pink-500 focus:border-pink-500 outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-12 right-3 text-gray-500"
                >
                  {showPasswords ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Agree to Terms */}
              <div className="flex items-center gap-2">
                <input
                  ref={agreeRef}
                  type="checkbox"
                  name="agree"
                  checked={formData.agree || false}
                  onChange={handleCheckboxChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <span>{t("Register.agreeTerms.agreeTerms")}</span>
                <span className="text-pink-600 underline cursor-pointer">
                  {t("Register.agreeTerms.termsAndConditions")}
                </span>
              </div>

              {/* ✅ Ensure error message is displayed correctly */}
              {errors.agree && <p className="text-red-500">{errors.agree}</p>}

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
