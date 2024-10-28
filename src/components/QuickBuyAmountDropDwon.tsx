import React, { useState, FC, useRef, useEffect } from "react";
import IMG_SOL from "@/assets/images/sol.png";
import Image from "next/image";

interface QuickBuyAmountDropDown {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const QuickBuyAmountDropDown: FC<QuickBuyAmountDropDown> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const handleOptionClick = (option: string) => {
  //   onChange(option);
  //   setIsOpen(false);
  // };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative  ">
      <div
        className="bg-[#0F0F0F] border border-[#7A7A7A] gap-2 flex w-full h-[30px] rounded-[20px] items-center justify-center text-[14px] px-4 py-1"
        onClick={(e) => {
          e.stopPropagation;
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="text-white">{value}</span>
        <Image src={IMG_SOL} width={15} height={15} alt="image" />
        <svg
          className="-ml-1 h-5 w-5"
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
        <div className="absolute z-10 bg-[#1F1F1F] border border-[#7A7A7A] rounded-md w-full text-left mt-1 text-[14px]">
          {options.map((option) => (
            <div
              key={option}
              className="text-white hover:bg-[#2C2C2C] py-1 px-2 cursor-pointer"
              onClick={(e) => {
                onChange(option);
                setIsOpen(false);
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

export default QuickBuyAmountDropDown;
