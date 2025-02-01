"use client"

import { useState } from "react";
import Dropdown from "./Dropdown";
import DropdownWithCheck from "./DropdownWithCheck";
import { options } from "../option/dropDownOptions";
import { useTranslations } from "next-intl";

const Filters = ({
loggedInUserSubCaste,
loggedInUserMotherSubCaste
}) => {
  const t = useTranslations();
  const {
    cities,
    gender,
    minAgeOptions,
    maxAgeOptions,
    casteOptions,
    subCasteOptions,
    qualificationOptions,
    occupationOptions,
    stateOptions,
  } = options(t);

    const [lookingFor, setLookingFor] = useState("bride");
    const [minAge, setMinAge] = useState("18");
    const [maxAge, setMaxAge] = useState("30");
    const [caste, setCaste] = useState("suthar");
    const [subCaste, setSubCaste] = useState([]);
    const [qualification, setQualification] = useState(
      qualificationOptions.map((qualification) => qualification.value)
    );
    const [occupation, setOccupation] = useState(
      occupationOptions.map((occupation) => occupation.value)
    );
    const [state, setState] = useState(["rajasthan"]);
    const [city, setCity] = useState(cities.map((city) => city.value));
    const [manglik, setManglik] = useState("No");
    const [divyang, setDivyang] = useState("No");
    const [secondMarriage, setSecondMarriage] = useState("No");

    const handleChange = (setter, updatedValues) => {
      setter(updatedValues); 
    };

  return (
    <div>
      {/* Dropdown Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Dropdown
            options={gender}
            selectedValue={lookingFor}
            onChange={setLookingFor}
            label={t("Filters.fields.lookingFor")}
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center space-x-6">
            <Dropdown
              options={minAgeOptions}
              selectedValue={minAge}
              onChange={setMinAge}
              label={t("Filters.fields.minAge")}
            />
            <span className="text-gray-400 font-bold mt-6">To</span>
            <Dropdown
              options={maxAgeOptions}
              selectedValue={maxAge}
              onChange={setMaxAge}
              label={t("Filters.fields.maxAge")}
            />
          </div>
        </div>

        <div>
          <Dropdown
            options={casteOptions}
            selectedValue={caste}
            onChange={setCaste}
            label={t("Filters.fields.caste.selectCaste")}
          />
        </div>
        <div>
          <DropdownWithCheck
            options={subCasteOptions}
            selectedValues={subCaste}
            onChange={(updatedValues) => handleChange(setSubCaste, updatedValues)}
            loggedInUserSubCaste={loggedInUserSubCaste}
            loggedInUserMotherSubCaste={loggedInUserMotherSubCaste}
            label={t("Filters.fields.caste.selectSubCaste")}
          />
        </div>
        <div>
          <DropdownWithCheck
            options={qualificationOptions}
            selectedValues={qualification}
            onChange={(updatedValues) => handleChange(setQualification, updatedValues)}
            label={t("Filters.fields.qualification")}
          />
        </div>

        <div>
          <DropdownWithCheck
            label={t("Filters.fields.occupation")}
            options={occupationOptions}
            selectedValues={occupation}
            onChange={(updatedValues) => handleChange(setOccupation, updatedValues)}
          />
        </div>
        <div>
          <DropdownWithCheck
            options={stateOptions}
            selectedValues={state}
            onChange={setState}
            label={t("Filters.fields.location.state")}
          />
        </div>
        <div>
          <DropdownWithCheck
            options={cities}
            selectedValues={city}
            onChange={(updatedValues) => handleChange(setCity, updatedValues)}
            label={t("Filters.fields.location.city")}
          />
        </div>
      </div>

      {/* Radio Button Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-2">
        {/* Manglik */}
        <div className="flex items-center justify-between lg:justify-start md:justify-start space-x-4">
          <span className="font-semibold text-pink-600">
            {t("Filters.fields.preferences.manglik")}:
          </span>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="manglik"
              value="Yes"
              className="accent-pink-600"
              checked={manglik === "Yes"}
              onChange={() => setManglik("Yes")}
            />
            <span>{t("Options.preferences.manglik.yes")}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="manglik"
              value="No"
              className="accent-pink-600"
              checked={manglik === "No"}
              onChange={() => setManglik("No")}
            />
            <span>{t("Options.preferences.manglik.no")}</span>
          </label>
        </div>

        {/* Divyang */}
        <div className="flex items-center justify-between lg:justify-start md:justify-start space-x-4">
          <span className="font-semibold text-pink-600">
            {t("Filters.fields.preferences.divyang")}:
          </span>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="divyang"
              value="Yes"
              className="accent-pink-600"
              checked={divyang === "Yes"}
              onChange={() => setDivyang("Yes")}
            />
            <span>{t("Options.preferences.divyang.yes")}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="divyang"
              value="No"
              className="accent-pink-600"
              checked={divyang === "No"}
              onChange={() => setDivyang("No")}
            />
            <span>{t("Options.preferences.divyang.no")}</span>
          </label>
        </div>

        {/* Second Marriage */}
        <div className="flex items-center justify-between lg:justify-start md:justify-start space-x-4">
          <span className="font-semibold text-pink-600">
            {t("Filters.fields.preferences.secondMarriage")}:
          </span>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="secondMarriage"
              value="Yes"
              className="accent-pink-600"
              checked={secondMarriage === "Yes"}
              onChange={() => setSecondMarriage("Yes")}
            />
            <span>{t("Options.preferences.secondMarriage.yes")}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="secondMarriage"
              value="No"
              className="accent-pink-600"
              checked={secondMarriage === "No"}
              onChange={() => setSecondMarriage("No")}
            />
            <span>{t("Options.preferences.secondMarriage.no")}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
