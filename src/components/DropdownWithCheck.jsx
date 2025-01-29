"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const DropdownWithCheck = ({
  options,
  selectedValues,
  onChange,
  label,
  loggedInUserSubCaste,
  loggedInUserMotherSubCaste,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const t = useTranslations("Options");

  const handleSelect = (value) => {
    console.log("Clicked Value:", value);
    console.log("Logged-in User SubCaste:", loggedInUserSubCaste);
    console.log("Logged-in User Mother SubCaste:", loggedInUserMotherSubCaste);
    console.log("kulriya" === "kulriya"); // Should be true
    console.log("kulriya" === loggedInUserSubCaste);
    if (
      value === loggedInUserSubCaste ||
      value === loggedInUserMotherSubCaste
    ) {
      return;
    }

    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    onChange(updatedValues);
  };

  const handleSelectAll = () => {
    const selectableOptions = options
      .map((option) => option.value)
      .filter(
        (value) =>
          value !== loggedInUserSubCaste && value !== loggedInUserMotherSubCaste
      );

    if (selectedValues.length === selectableOptions.length) {
      onChange([]);
    } else {
      onChange(selectableOptions);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine the label to show in the dropdown header
  const getLabelText = () => {
    if (selectedValues.length === options.length) {
      return `${t("selectAll")}`; // All are selected
    } else if (selectedValues.length === 0) {
      return `${t("selectOption")}`; // None selected
    } else {
      return `${selectedValues.length} ${t("selected")}`; // Some selected
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <span className="font-bold text-pink-600">{label}</span>
      <div
        className="p-3 mt-2 border-2 rounded-lg w-full bg-white cursor-pointer flex justify-between items-center focus:ring-pink-500 focus:border-pink-500"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span>{getLabelText()}</span>
        <FaAngleDown
          color="#D81B60"
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {isOpen && (
        <ul
          className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10 
                     max-h-60 min-h-10 overflow-y-auto"
        >
          {/* Select All Option */}
          <li
            className="p-3 flex items-center space-x-2 hover:bg-pink-100 cursor-pointer"
            onClick={handleSelectAll}
          >
            <input
              type="checkbox"
              checked={selectedValues.length === options.length}
              onChange={handleSelectAll}
              className="accent-pink-600"
            />
            <span>{t("selectAll")}</span>
          </li>

          {options.map((option) => (
            <li
              key={option.value}
              className="p-3 flex items-center space-x-2 hover:bg-pink-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleSelect(option.value)}
                className="accent-pink-600"
              />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownWithCheck;
