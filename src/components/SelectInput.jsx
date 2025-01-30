import React from 'react';

export const SelectInput = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const Input = ({ value, placeholder, onChange, icon }) => (
  <div className="relative">
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
    />
    <div className="absolute left-3 top-1/2 -translate-y-1/2">
      {icon}
    </div>
  </div>
);