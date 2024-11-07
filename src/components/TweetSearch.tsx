import {
  FaMagnifyingGlass,
  FaMagnifyingGlassArrowRight,
} from "react-icons/fa6";

import React from "react";

interface TweetSearchProps {
  modelValue: string;
  placeholder: string;
  disabled: boolean;
  onSearch: (value: string) => void;
  onUpdateModelValue: (value: string) => void;
}

const TweetSearch: React.FC<TweetSearchProps> = ({
  modelValue,
  placeholder,
  disabled,
  onSearch,
  onUpdateModelValue,
}) => {
  return (
    <div className="relative border-b">
      <input
        type="text"
        className="w-full pl-16 pr-32 py-4 bg-card"
        placeholder={placeholder}
        value={modelValue}
        onChange={(e) => onUpdateModelValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(modelValue)}
      />
      <div
        className={`absolute left-0 inset-y-0 flex items-center justify-center pl-8 pr-2`}
      >
        <FaMagnifyingGlass />
      </div>
      <div className="absolute right-0 inset-y-0 flex items-center pr-8">
        <button
          className={`rounded-full px-4 py-1 font-semibold ${
            !disabled
              ? "bg-purple-400 text-white"
              : "bg-purple-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!modelValue || disabled}
          onClick={() => onSearch(modelValue)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TweetSearch;
