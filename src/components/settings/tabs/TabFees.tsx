import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import InfoCard from "@/components/InfoCard";
import IMG_SOL from "@/assets/images/sol.png";
import { SettingProps } from "@/types/setting";

const TabFees = (props: SettingProps) => {
  const setting = props.setting;
  const onChangeSettingValue = props.onChangeSettingValue;

  const [isOpen, setIsOpen] = useState(false);
  const [infoPop, setInfoPop] = useState(false);

  const togglePop = () => setInfoPop(!infoPop);

  const options = [
    { value: "5" },
    { value: "10" },
    { value: "20" },
    { value: "50" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (e: any, option: any) => {
    onChangeSettingValue(e, "slippage", option.value);
    setIsOpen(false);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    <>
      <div className="mt-[3px] pb-4 px-2">
        <div className="flex items-center gap-2 py-3 relative">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Priority Fee</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Priority Fee"
                content="Fee paid to prioritize transactions on the Solana blockchain."
              />
            </div>
          </div>
        </div>
        <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="flex items-center gap-1 px-2 w-fit">
            <Image src={IMG_SOL} width={25} height={25} alt="image" />
          </div>
          <div className="h-6 w-[2px] bg-[#404040]"></div>

          <div className="w-full px-1">
            <input
              type="text"
              className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
              value="Optemized"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 py-1 mt-[16px]">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Bribery Fee</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Bribery Fee"
                content="Fee paid to Jito validators for faster transaction processing."
              />
            </div>
          </div>
        </div>
        <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="flex items-center gap-1 px-2 w-fit">
            <Image src={IMG_SOL} width={25} height={25} alt="image" />
          </div>
          <div className="h-6 w-[2px] bg-[#404040]"></div>

          <div className="w-full px-1">
            <input
              type="text"
              className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
              value="Optemized"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 py-1 mt-[16px]">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Slippage</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Slippage"
                content="Defines the acceptable slippage percentage for each transaction."
              />
            </div>
          </div>
        </div>

        <div
          ref={dropdownRef}
          className="relative inline-block text-left mt-[8px]"
        >
          <div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex justify-between w-[140px] rounded-md shadow-sm px-4 py-2 bg-[#0F0F0F] text-sm font-medium text-[#7A7A7A] focus:outline-none border border-[#7A7A7A]"
            >
              {setting?.slippage}%
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="origin-top-right absolute mt-2 w-[140px] rounded-md shadow-lg bg-[#333333] text-[#C0C0C0] ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {options.map((option: any) => (
                  <button
                    key={option.value}
                    onClick={(e) => handleSelect(e, option)}
                    className={`${
                      option.locked ? "text-[#C0C0C0]" : "text-[#C0C0C0]"
                    } group flex justify-between items-center px-4 py-2 text-sm w-full`}
                    disabled={option.locked}
                  >
                    {option.value}%
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row w-full gap-2 mt-6 ">
          <button
            // onClick={onUpdateSetting}
            className="flex-1 text-transparent bg-gradient-to-r from-[#28A7CF] to-[#9283EE] hover:bg-custom-hover-gradient rounded-[7px] px-4 py-2 text-white text-base font-bold"
          >
            Update
          </button>
          <button
            // onClick={onCancelSetting}
            className="flex-1 bg-[#202020] hover:bg-[#2c2c2c] border border-[#7A7A7A] rounded-[7px] px-4 py-2 text-white text-base font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default TabFees;
