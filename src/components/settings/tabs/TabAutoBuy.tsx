import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import IMG_SOL from "@/assets/images/sol.png";
import InfoCard from "@/components/InfoCard";
import { SettingProps } from "@/types/setting";
import CustomDropdown from "@/components/customdropdown";
import CustomDroplist from "@/components/CustomDropList";

const TabAutoBuy = (props: SettingProps) => {
  const setting = props.setting;
  const onChangeSettingValue = props.onChangeSettingValue;
  const handleChange = (value: string) => {
    onChangeSettingValue(null, "buy_initial_invest_sol", value); // Pass value directly without default
  };
  const [isOpen, setIsOpen] = useState(false);
  const options = ["0.2", "0.5", "1", "3", "5"];

  const handleOptionClick = (option: string) => {
    handleChange(option);
    setIsOpen(false);
  };
  // const value = setting?.buy_initial_invest_sol;
  return (
    <>
      <div
        className="mt-[3px] sm:mt flex flex-col md:flex-row justify-center text-center gap-10 p-4"
        onClick={(e) => {
          e.stopPropagation;
          setIsOpen(false);
        }}
      >
        {/* pb-4 px-2 */}
        <div className="flex-1 min-w-[300px]">
          <div className="flex items-center gap-1 py-1 justify-between">
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              Auto-Buy Amount :
            </p>

            <div className="relative w-[140px] mt-[8px]">
              {/* bg-[#0F0F0F] border  border-[#7A7A7A] flex w-[100px] h-[30px]  gap-1  rounded-[20px] items-center mt-[8px] text-[12px] */}
              {/* <div className="h-6 w-[2px] bg-[#404040]"></div> */}

              <div
                className="bg-[#0F0F0F] border  border-[#7A7A7A] gap-1 flex w-full h-[30px] rounded-[20px] items-center mt-[8px] text-[14px] px-4 py-1"
                onClick={(e) => {
                  setIsOpen((prev) => !prev);
                }}
              >
                {/* <input
                  type="text"
                  className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
                  value="0"
                  onChange={(e: any) =>
                    onChangeSettingValue(e, "buy_initial_invest_sol")
                  }
                /> */}
                <span className="text-white w-[85px]">1 min</span>
                <div className="flex items-center gap-1 w-fit">
                  <Image src={IMG_SOL} width={25} height={25} alt="image" />
                </div>
                <svg
                  className="ml-1 h-5 w-5"
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
                      onClick={() => handleOptionClick(option)}
                    >
                      {option} min
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Info
              size={20}
              color="white"
              className="cursor-pointer text-transparent bg-gradient-to-r from-[#28A7CF] to-[#9283EE] rounded-xl"
            />
            <p className="text-[10px] md:text-[14px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#28A7CF] to-[#9283EE]">
              Only Buy When all the conditions below are met
            </p>
          </div>
          <div className="flex items-center gap-1 py-1 justify-between">
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              Pool Size (SOL):
            </p>

            {/* <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[100px] h-[30px] gap-1 rounded-[20px] items-center mt-[8px]">
              <div className="w-full px-1">
                <select
                  className="text-white text-[14px] bg-transparent border-none outline-none p-1.5 w-full cursor-pointer"
                  value={setting?.buy_initial_invest_sol}
                  onChange={(e: any) =>
                    onChangeSettingValue(e, "buy_initial_invest_sol")
                  }
                >
                  <option value="0.1">1-1000</option>
                  <option value="0.5">1-1000</option>
                  <option value="1">1-1000</option>
                  <option value="2">1-1000</option>
                  <option value="5">1-1000</option>
                </select>
              </div>
            </div> */}
            <CustomDroplist
              options={["1-1000", "10-1000", "50-1000", "100-1000", "1000+"]}
              value={setting?.buy_initial_invest_sol || "0.1"}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-1 py-1 justify-between">
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              Pool Size (Token):
            </p>

            {/* <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[100px] h-[30px] gap-1 rounded-[20px] items-center mt-[8px]">
              <div className="w-full px-1">
                <select
                  className="text-white text-[14px] bg-transparent border-none outline-none p-1.5 w-full cursor-pointer"
                  value={setting?.buy_initial_invest_sol}
                  onChange={(e: any) =>
                    onChangeSettingValue(e, "buy_initial_invest_sol")
                  }
                >
                  <option value="0.1">1-1000</option>
                  <option value="0.5">1-1000</option>
                  <option value="1">1-1000</option>
                  <option value="2">1-1000</option>
                  <option value="5">1-1000</option>
                </select>
              </div>
            </div> */}
            <CustomDroplist
              options={["0.1", "0.5", "1", "2", "5"]}
              value={setting?.buy_pooled_sol_min || "0.1"}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-1 py-1 justify-between">
            <p className="text-[14px] font-bold text-[#FFFFFF]">24H Change :</p>
            {/* <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[100px] h-[30px] gap-1 rounded-[20px] items-center mt-[8px]">
              <div className="w-full px-1">
                <select
                  className="text-white text-[14px] bg-transparent border-none outline-none p-1.5 w-full cursor-pointer"
                  value={setting?.buy_initial_invest_sol}
                  onChange={(e: any) =>
                    onChangeSettingValue(e, "buy_initial_invest_sol")
                  }
                >
                  <option value="0.1">1-1000</option>
                  <option value="0.5">1-1000</option>
                  <option value="1">1-1000</option>
                  <option value="2">1-1000</option>
                  <option value="5">1-1000</option>
                </select>
              </div>
            </div> */}
            <CustomDroplist
              options={["0.1", "0.5", "1", "2", "5"]}
              value={setting?.buy_initial_invest_sol || "0.1"}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full mt-3">
            <div className="w-full flex justify-between items-center gap-1 cursor-pointer  bg-gray-800 py-5 rounded-md ">
              <p
                className={`text-center  text-white text-[14px] font-bold flex flex-row gap-4 ml-2`}
              >
                <Info
                  size={20}
                  color="white"
                  className="cursor-pointer text-white rounded-xl"
                />
                Auto-Buy
              </p>
              <label className="inline-flex items-center cursor-pointer mr-10">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting?.buy_lp_burned_audit === 1}
                  onChange={(e: any) =>
                    onChangeSettingValue(e, "buy_lp_burned_audit")
                  }
                />
                <div
                  className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                ></div>
              </label>
            </div>
            <div className="w-full flex justify-between items-center gap-1 cursor-pointer   bg-gray-800 py-5 rounded-md">
              <p
                className={`text-center  text-white text-[14px] font-bold flex flex-row gap-4 ml-2`}
              >
                <Info
                  size={20}
                  color="white"
                  className="cursor-pointer text-white rounded-xl"
                />
                Stop Loss & Take Profit
              </p>

              <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[100px] h-[30px] gap-1 rounded-[12px] items-center  mr-2">
                <div className="w-full px-1">
                  <select
                    className="text-white text-[14px] bg-transparent border-none outline-none p-1.5 w-full cursor-pointer"
                    value={setting?.buy_initial_invest_sol}
                    onChange={(e: any) =>
                      onChangeSettingValue(e, "buy_initial_invest_sol")
                    }
                  >
                    <option value="0.1">1-1000</option>
                    <option value="0.5">1-1000</option>
                    <option value="1">1-1000</option>
                    <option value="2">1-1000</option>
                    <option value="5">1-1000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic Navbar */}

        {/* <div className="flex-1 min-w-[300px]">
          <div className="grid gap-y-3">
            <div className="flex items-center gap-1 py-1">
              <p className="text-[14px] font-bold text-[#FFFFFF]">Premium Audits</p>
              <div className="relative group">
                <Info size={20} color="white" className="cursor-pointer" />
                <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                  <InfoCard
                    title="Premium Audits"
                    content="High-level audits to verify token legitimacy before purchasing."
                  />
                </div>
              </div>
            </div>

            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6 rounded-[16px] bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="LP Burned Audit"
                      content="Audit to verify if liquidity in the pool has been burned."
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  LP Burned Audit
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting?.buy_lp_burned_audit === 1}
                  onChange={(e: any) => onChangeSettingValue(e, "buy_lp_burned_audit")}
                />
                <div
                  className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                ></div>
              </label>
            </div>
            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6  rounded-[16px] bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="Whale Check"
                      content="Check if 1 wallet holds more than 50% of the total supply (Not including the LP)"
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  Whale Check
                </p>
              </div>
              <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-[80px] h-[40px] rounded-[8px] items-center">
                <div>
                  <input
                    type="number"
                    className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                    value={setting?.buy_whale_check_percent}
                    onChange={(e: any) => onChangeSettingValue(e, "buy_whale_check_percent")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default TabAutoBuy;
