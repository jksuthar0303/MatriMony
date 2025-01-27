"use client";

import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa"; 

const Dropdown = ({ options, selectedValue, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <span className="font-bold text-pink-600">{label}</span>
      <div
        className="p-3 mt-2 border-2 rounded-lg w-full bg-white cursor-pointer flex justify-between items-center focus:ring-pink-500 focus:border-pink-500"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span>
          {options.find((opt) => opt.value === selectedValue)?.label || "Select an option"}
        </span>
        <FaAngleDown color="#D81B60" className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </div>
      {isOpen && (
        <ul
          className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10 
                     max-h-60 min-h-10 overflow-y-auto"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="p-3 hover:bg-pink-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
