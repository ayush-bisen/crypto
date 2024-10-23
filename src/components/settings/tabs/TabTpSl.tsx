import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import InfoCard from "@/components/InfoCard";
import { SettingProps } from "@/types/setting";

const TabTpSl = (props: SettingProps) => {
  const setting = props.setting;
  const onChangeSettingValue = props.onChangeSettingValue;

  const [isChecked, setIsChecked] = useState(true);
  const [isChecked1, setIsChecked1] = useState(true);
  const [infoPop, setInfoPop] = useState(false);

  const toggleDropdown = () => setInfoPop(!infoPop);

  return (
    <>
      <div className="mt-[3px] pb-4 px-2">
        <div className="flex items-center gap-2 py-1 relative">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Take Profits</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Take Profits"
                content="Sets take profit parameters, including amount and percentage change."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-[8px] w-full justify-between">
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                ROI%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.tp_percent_1}
                onChange={(e: any) => onChangeSettingValue(e, "tp_percent_1")}
                max={100}
              />
            </div>
          </div>
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex   h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                Amt%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.tp_percent_1}
                onChange={(e: any) => onChangeSettingValue(e, "tp_percent_1")}
                max={100}
              />
            </div>
          </div>

        </div>
        <div className="flex items-center gap-5 mt-[8px] w-full justify-between">
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                ROI%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.tp_percent_1}
                onChange={(e: any) => onChangeSettingValue(e, "tp_percent_1")}
                max={100}
              />
            </div>
          </div>
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex   h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                Amt%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.tp_percent_1}
                onChange={(e: any) => onChangeSettingValue(e, "tp_percent_1")}
                max={100}
              />
            </div>
          </div>

        </div>


        <div className="flex items-center gap-1 py-1 mt-[16px] ">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Stop Loss</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Stop Loss"
                content="Configures stop loss parameters based on amount and percentage change."
              />
            </div>
          </div>

          <label className="inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={setting?.tsl_on === 0}
              onChange={(e: any) => onChangeSettingValue(e, "tsl_on")}
            />
            <div
              className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
            ></div>
          </label>
        </div>

        <div className="flex items-center gap-5 mt-[8px]">
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-full h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                ROI%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.sl_percent_1}
                onChange={(e: any) => onChangeSettingValue(e, "sl_percent_1")}
                max={100}
              />
            </div>
          </div>

        </div>

        <div className="flex items-center gap-1 py-1 mt-[16px] ">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Trailing Stop Loss</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Trailing Stop Loss"
                content="Stop-loss order that moves with the price of an asset to help lock in profits at higher levels."
              />
            </div>
          </div>

          <label className="inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={setting?.tsl_on === 1}
              onChange={(e: any) => onChangeSettingValue(e, "tsl_on")}
            />
            <div
              className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
            ></div>
          </label>
        </div>

        <div className="flex items-center gap-5 mt-[8px]">
          <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-full h-[40px] rounded-[8px] items-center">
            <div className="flex items-center gap-1">
              <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                ROI%
              </span>
              <div className="h-6 w-[2px] bg-[#404040]"></div>
            </div>
            <div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.tsl_percent}
                onChange={(e: any) => onChangeSettingValue(e, "tsl_percent")}
                max={100}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 py-1 mt-[16px] ">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Auto-Sell</p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Auto - Sell"
                content="Auto - Sell means set timmer to sell auto "
              />
            </div>
          </div>
        </div>

        <div className=" gap-5 mt-[8px] ">
            <div className="flex flex-row  justify-between gap-4">
              <span className="text-white text-sm font-medium rounded-l-[8px] w-full mt-2">
                Auto - Sell the full position after
              </span>
              <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[200px] h-[30px] gap-1 rounded-[12px] items-center mt-[8px]">
              <div className="w-full px-1">
                <select
                  className="text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                  value={setting?.buy_initial_invest_sol}
                  onChange={(e: any) => onChangeSettingValue(e, "buy_initial_invest_sol")}
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
    </>
  );
};

export default TabTpSl;
