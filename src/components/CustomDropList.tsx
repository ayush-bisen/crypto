import React, { useState, FC } from "react";

interface CustomDropdownList {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDroplist: FC<CustomDropdownList> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[140px] mt-[8px]">
      <div
        className="bg-[#0F0F0F] border  border-[#7A7A7A] gap-1 flex w-full h-[30px] rounded-[20px] items-center mt-[8px] text-[14px] px-4 py-1"
        // bg-transparent border border-[#7A7A7A] flex h-[40px] items-center p-2 cursor-pointer rounded-[8px] justify-between
        onClick={(e) => {
          e.stopPropagation;
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="text-white w-[85px]">{value}</span>
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="white"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-[#1F1F1F] border border-[#7A7A7A] rounded-md w-full text-left mt-1">
          {options.map((option) => (
            <div
              key={option}
              className="text-white hover:bg-[#2C2C2C] py-1 px-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation;
                handleOptionClick(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Usage Example
// const MyComponent: FC = () => {
//   const [selectedValue, setSelectedValue] = useState("0.1");

//   const handleChange = (value: string) => {
//     setSelectedValue(value);
//     // You can also handle setting the value in your settings here
//   };

//   return (
//     <CustomDropdown
//       options={["0.1", "0.5", "1", "2", "5"]}
//       value={selectedValue}
//       onChange={handleChange}
//     />
//   );
// };

export default CustomDroplist;
