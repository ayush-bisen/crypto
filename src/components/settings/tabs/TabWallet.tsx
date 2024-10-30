import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import InfoCard from "@/components/InfoCard";
import IMG_SOL from "@/assets/images/sol.png";
import { SettingProps } from "@/types/setting";
import IMG_Copy from "@/assets/images/copy.svg";
const TabWallet = (props: SettingProps) => {
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

  return (
    <>
      <div className="mt-[3px] pb-4 px-2">
        <div className="flex items-center gap-2 py-3 relative">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Withdraw Funds</p>
        </div>
        <p className="text-[12px] font-bold text-gray-400">Amount</p>
        <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="flex items-center gap-1 px-2 w-fit">
            <Image src={IMG_SOL} width={25} height={25} alt="image" />
          </div>
          <div className="h-6 w-[2px] bg-[#404040]"></div>

          <div className="w-full px-1">
            <input
              type="number"
              className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
              value="0"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 py-1 mt-[16px]">
          <p className="text-[12px] font-bold text-gray-400">
            Withdraw Address (SOL only)
          </p>
        </div>
        <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="w-full px-1">
            <input
              type="text"
              className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
              value=""
            />
          </div>
        </div>
        <div className="h-[50px] bg-gradient-to-r from-[#28A7CF] to-[#9283EE] hover:bg-custom-hover-gradient py-3  flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="w-full  px-1 text-center flex justify-center  items-center text-white">
            Withdraw
          </div>
        </div>
        <div className="bg-white w-full h-[1px] my-[30px]"></div>
        <div className="flex items-center gap-2  relative my-4">
          <p className="text-[14px] font-bold text-[#FFFFFF]">Deposit Funds</p>
        </div>
        <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-full h-[38px]  gap-1  rounded-[12px] items-center mt-[8px]">
          <div className="flex items-center gap-1 px-2 w-fit">
            <Image src={IMG_Copy} width={25} height={25} alt="image" />
          </div>
          <div className="h-6 w-[2px] bg-[#404040]"></div>

          <div className="w-full px-1">
            <input
              type="text"
              className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
              value=""
            />
          </div>
        </div>
        <div className="my-[20px] text-[#858686] text-[12px]">
          Make sure to deposit SOL using the Solana blockchain
        </div>
      </div>
    </>
  );
};

export default TabWallet;
