import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import React from "react";

import InstagramCheckMarK from "@/assets/images/InstagramCheckMark.svg";
import IMAGE_BHOOT from "@/assets/images/Default.svg";
import IMAGE_TABLEIMG from "@/assets/images/landing1.png";
import IS_Main from "@/assets/images/SolanaMain.svg";
import IMAGE_Main from "@/assets/images/image.png";
import SearchIcon from "@/assets/images/searchIcon.png";
import IMAGE_SEARCH from "@/assets/images/VectorSearch.svg";
import ICON from "@/assets/images/Icon.svg";
import IMAGE_SFRAMEB from "@/assets/images/Frame5614.svg";
import IMAGE_SFRAME from "@/assets/images/Frame5617.svg";
import IMAGE_SFRAMEC from "@/assets/images/Frame5619.svg";
import IMAGE_SFRAMEA from "@/assets/images/Frame5618.svg";
import IMAGE_TABLE from "@/assets/images/MoreThan.svg";
import IMAGE_TABLEA from "@/assets/images/Maskgroup.png";
import IMAGE_DISCORDWHITE from "@/assets/images/discordwhite.svg";
import ADSS from "@/assets/images/bhoot.svg";
import ADS from "@/assets/images/Frame5498.svg";
import ASD from "@/assets/images/Group97.svg";
import ASDE from "@/assets/images/Discord.png";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import LampImage from "@/assets/images/Lamp.png";
import GradientIMG from "@/assets/images/gradient.png";

export default function Home() {
  const router = useRouter();

  const { publicKey } = useWallet();
  const [agreeTerms, setAgreeTerms] = useState(true);
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const onClickAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  useEffect(() => {
    if (publicKey) {
      // router.push("/settings?tab=general");
    }
  }, [publicKey]);

  const onClickWalletConnect = useCallback(() => {
    if (!connected) {
      setVisible(true); // Manually trigger the wallet connection modal
    } else {
      console.log("Wallet already connected");
    }
  }, [connected, setVisible]);

  return (
    <>
      <div className="relative w-full h-full overflow-x-hidden custom-scrollbar p-4">
        <div className="flex justify-center relative z-10">
          <div className="mt-[105px] w-[1060px]">
            <p className="font-bold text-center px-2">
              {/* w-[1248px] */}
              <span className="w-[1248px] text-[24px]  md:text-[48px] xl:text-[58px] font-bold text-center text-white">
                Trade Smarter With
              </span>
              <br />
              <span className="w-[1248px] text-[48px] md:text-[72px] xl:text-[82px] font-bold text-center text-white">
                Blockbit{" "}
              </span>
              <span className="w-[1248px] text-[48px] md:text-[72px] xl:text-[82px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#E8DFFF] via-[#A945F3] via-[#DC52BA] to-[#FFFFFF]">
                Solana Sniper Bot
              </span>
            </p>
            ;
            <div
              className="text-[20px] mt-[36px] flex justify-center font-normal
              bg-clip-text text-[#C2C2C2]"
            >
              Start Trading Today For Free
            </div>
          </div>
        </div>
        <div className="flex justify-center relative z-10">
          <div className="relative inline-block mt-[36px] p-[3px] rounded-[48px] bg-gradient-to-r from-[#1E90FF] to-[#0000CD] hover:bg-radial-gradient hover:from-[#2593F9] hover:to-[#155B9B]">
            <button
              onClick={onClickWalletConnect}
              className="flex items-center justify-center  px-[48px] py-[16px] rounded-[48px] text-white text-[20px] font-bold bg-[#171717] w-full h-full hover:bg-gradient-to-r hover:from-[#1E90FF] hover:to-[#155B9B] hover:text-[#FFFF]"
            >
              <Image
                alt="Launch Icon"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                src={ADSS}
                className="hover:brightness-125"
              />
              <div className="text-[20px] font-bold">Connect Wallet</div>
            </button>
          </div>
        </div>
        {/* <div className='flex justify-center relative z-10'>

          <button
            onClick={onClickWalletConnect}
          >
            <Image src={IMAGE_BHOOT} height={32} width={32} className="flex items-center justify-center gap-2 px-[48px] py-[16px]
                rounded-[48px] text-white text-[20px] font-bold  w-full h-full
                
              " alt="Launch Icon" />
          </button>
        </div> */}
        <div
          className="flex items-center justify-center mt-[36px] space-x-2
          cursor-pointer relative z-20"
          onClick={onClickAgreeTerms}
        >
          <Image
            src={InstagramCheckMarK}
            height={20}
            width={20}
            alt="Launch Icon"
          />
          <span className="text-[#989898] text-[15px] font-normal">
            By connecting, I agree to the Terms & Privacy
          </span>
        </div>
        <div className="flex justify-center mt-[29px] relative z-10">
          <Image
            src={IMAGE_Main}
            alt="img"
            layout="responsive"
            width={1332}
            height={751}
            className="max-w-[1332px] h-auto"
          />
        </div>
        {/* section-1 completed here */}
        {/* section-2 start from here */}

        <div
          className=" flex flex-col justify-between items-start mt-[100px] lg:flex-row md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center w-full max-w-[1332px] m-auto gap-4 lg:gap-52 px-[20px]"
          // px-[20px] md:px-[50px] lg:px-[169px] md:px-[80px] h-[700px]
          style={{
            backgroundImage: `url('./assets/images/Lamp.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 999,
          }}
        >
          {/* image for the background  */}
          <Image
            src={LampImage}
            alt="IMAGE"
            className="absolute top-[-30%] lg:top-[-100%]"
          />
          {/* div for the line */}
          <div
            className="absolute self-stretch flex-grow-0 flex-shrink-0 w-[0.4px] bg-gray-600  h-[500px] left-[20px] sm:bottom-[138px] xs:bottom-0 md:bottom-[265px] lg:bottom-[-90px]"
            style={{
              width: "6px",
              clipPath: "polygon(50% 0%, 40% 20%, 60% 80%, 50% 100%)",
            }}
          />
          {/* div for the icon, auto scan, and button */}
          <div className="flex flex-col justify-center items-start max-w-[402px] relative gap-4">
            <Image src={SearchIcon} width={40} height={40} alt="IMAGE" />
            <p className="self-stretch flex-grow-0 flex-shrink-0  max-w-[402px] text-[32px] sm:text-[48px] md:text-[48px] font-bold text-left text-white">
              Auto Scan
            </p>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
              <div
                className="self-stretch flex-grow-0 flex-shrink-0 w-1"
                style={{
                  background:
                    "linear-gradient(to bottom, #2593f9 18.6%, #00ffd1 100%)",
                }}
              />
              <p className="flex-grow max-w-[382px] text-[14px] sm:text-[20px] md:text-[20px] font-normal text-left text-[#d7f6f3]">
                Scan the Solana blockchain and discover new tokens based on your
                filters
              </p>
            </div>
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 sm:h-[62px] gap-2 sm:pl-9 sm:pr-7 sm:py-6 pl-6 pr-4 py-3 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-[14px] sm:text-[20px] md:text-[20px] font-bold text-center text-white z-10">
                Start Trading
              </p>
              <Image
                src={IMAGE_TABLE}
                width={20}
                height={20}
                alt="GRW"
                className="z-10"
              />
              {/* Border with gradient and hover effect */}
              <div className="absolute inset-0 rounded-[42px] border-[2px] border-transparent bg-gradient-to-r from-[#28a7cf] to-[#9283ee] p-[1px] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]">
                {/* Button Background that changes on hover */}
                <div className="h-full w-full rounded-[42px] bg-[#171717] group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]"></div>
              </div>
            </div>
          </div>
          {/* div for the image  */}
          <div className=" w-full max-w-[902px]">
            <Image
              src={IMAGE_SFRAME}
              alt="img"
              layout="responsive"
              width={902}
              height={418}
              className="w-full h-auto"
            />

            {/* This is the relative container */}
            <div className="relative w-[30%] ml-4">
              {/* w-[100px] ml-6 xs:w-[130px] sm:w-[150px] md:w-[180px] lg:w-[200px] */}
              {/* Image positioned absolutely in the bottom-left */}
              <Image
                src={IS_Main}
                alt="img"
                layout="responsive"
                width={50}
                height={50}
                className="absolute bottom-[-30px] left-[-50px]  lg:left-[-100px]"
              />
            </div>
          </div>
        </div>
        {/* section-2  Auto Buy & Sell */}
        <div
          className="flex flex-col justify-between items-start mt-[100px] lg:flex-row md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center w-full max-w-[1332px] m-auto gap-4 lg:gap-12 xl:gap-[52px] px-[20px]"
          // style={{ backgroundImage: `url('./assets/images/Lamp.svg')` }}
        >
          {/* div for the line */}
          <div
            className="absolute self-stretch flex-grow-0 flex-shrink-0 w-[0.4px] bg-gray-600  h-[500px] left-[20px] sm:bottom-[138px] xs:bottom-0 md:bottom-[265px] lg:bottom-[-90px] lg:hidden"
            style={{
              width: "6px",
              clipPath: "polygon(50% 0%, 40% 20%, 60% 80%, 50% 100%)",
            }}
          />
          {/* div for the content and it shows when the screen size is less than 1024px */}
          <div className="flex flex-col justify-center items-start max-w-[402px] relative gap-4 lg:hidden">
            <Image src={ICON} width={40} height={40} alt="IMAGE" />
            <p className="self-stretch flex-grow-0 flex-shrink-0  max-w-[402px] text-[32px] sm:text-[48px] md:text-[48px] font-bold text-left text-white">
              Auto Buy & Sell
            </p>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
              <div
                className="self-stretch flex-grow-0 flex-shrink-0 w-1"
                style={{
                  background:
                    "linear-gradient(to bottom, #2593f9 18.6%, #00ffd1 100%)",
                }}
              />
              <p className="flex-grow max-w-[382px] text-[14px] sm:text-[20px] md:text-[20px] font-normal text-left text-[#d7f6f3]">
                Auto buy & sell based on your strategy setup.
              </p>
            </div>
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 sm:h-[62px] gap-2 sm:pl-9 sm:pr-7 sm:py-6 pl-6 pr-4 py-3 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-[18px] sm:text-[20px] md:text-[20px] font-bold text-center text-white z-10">
                Start Trading
              </p>
              <Image
                src={IMAGE_TABLE}
                width={20}
                height={20}
                alt="GRW"
                className="z-10"
              />
              {/* Border with gradient and hover effect */}
              <div className="absolute inset-0 rounded-[42px] border-[2px] border-transparent bg-gradient-to-r from-[#28a7cf] to-[#9283ee] p-[1px] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]">
                {/* Button Background that changes on hover */}
                <div className="h-full w-full rounded-[42px] bg-[#171717] group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]"></div>
              </div>
            </div>
          </div>
          {/* div for the section image  */}
          <div className="w-full ">
            <Image
              src={IMAGE_SFRAMEA}
              alt="img"
              layout="responsive"
              width={902}
              height={418}
              className="w-full h-auto"
            />
          </div>

          {/* div for the content and it shows when the screen size is more than 1024px */}

          <div className="flex flex-col justify-center items-start max-w-[402px] relative  hidden lg:block">
            {/* div for the line */}
            <div
              className="absolute self-stretch flex-grow-0 flex-shrink-0 w-[0.4px] bg-gray-600  h-[500px]  sm:bottom-[138px] xs:bottom-0 md:bottom-[265px] lg:bottom-[-90px] lg:block"
              style={{
                width: "6px",
                clipPath: "polygon(50% 0%, 40% 20%, 60% 80%, 50% 100%)",
              }}
            />
            <div className="flex flex-col justify-center items-start max-w-[402px] relative gap-4">
              <Image src={ICON} width={40} height={40} alt="IMAGE" />
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-[402px] text-5xl font-bold text-left text-white">
                Auto Buy & Sell
              </p>
              <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
                <div
                  className="self-stretch flex-grow-0 flex-shrink-0 w-1"
                  style={{
                    background:
                      "linear-gradient(to bottom, #2593f9 18.6%, #00ffd1 100%)",
                  }}
                />
                <p className="flex-grow w-[382px] text-xl text-left text-[#d7f6f3]">
                  Auto buy & sell based on your strategy setup.
                </p>
              </div>
              <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 sm:h-[62px] gap-2 sm:pl-9 sm:pr-7 sm:py-6 pl-6 pr-4 py-3 rounded-[42px] transition-all duration-300 ease-in-out">
                <p className="flex-grow-0 flex-shrink-0 text-[14px] sm:text-[20px] md:text-[20px] font-bold text-center text-white z-10">
                  Start Trading
                </p>
                <Image
                  src={IMAGE_TABLE}
                  width={20}
                  height={20}
                  alt="GRW"
                  className="z-10"
                />
                {/* Border with gradient and hover effect */}
                <div className="absolute inset-0 rounded-[42px] border-[2px] border-transparent bg-gradient-to-r from-[#28a7cf] to-[#9283ee] p-[1px] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]">
                  {/* Button Background that changes on hover */}
                  <div className="h-full w-full rounded-[42px] bg-[#171717] group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Trading Today For Free */}
        {/* Extreme Speed - section-3 */}
        <div
          className="flex flex-col justify-between items-start mt-[100px] lg:flex-row md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center   w-full max-w-[1332px] m-auto gap-4 lg:gap-52 px-[20px]"
          style={{ backgroundImage: `url('./assets/images/Lamp.svg')` }}
        >
          {/* div for the line */}
          <div
            className="absolute self-stretch flex-grow-0 flex-shrink-0 w-[0.4px] bg-gray-600  h-[500px] left-[20px] sm:bottom-[138px] xs:bottom-0 md:bottom-[265px] lg:bottom-[-90px]"
            style={{
              width: "6px",
              clipPath: "polygon(50% 0%, 40% 20%, 60% 80%, 50% 100%)",
            }}
          />
          {/* div for the content  */}
          <div className="flex flex-col justify-center items-start max-w-[402px] relative gap-4">
            <Image src={IMAGE_SFRAMEB} width={40} height={40} alt="IMAGE" />

            <p className="self-stretch flex-grow-0 flex-shrink-0  max-w-[402px] text-[32px] sm:text-[48px] md:text-[48px] font-bold text-left text-white">
              Extreme Speed
            </p>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
              <div
                className="self-stretch flex-grow-0 flex-shrink-0 w-1 "
                style={{
                  background:
                    "linear-gradient(to bottom, #2593f9 18.6%, #00ffd1 100%)",
                }}
              />
              <p className="flex-grow max-w-[382px] text-[14px] sm:text-[20px] md:text-[20px] font-normal text-left text-[#d7f6f3]">
                Execute trades in Seconds.
              </p>
            </div>
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 h-[62px] gap-2 pl-9 pr-7 py-6 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-[14px] sm:text-[20px] md:text-[20px] font-bold text-center text-white z-10">
                Start Trading
              </p>
              <Image
                src={IMAGE_TABLE}
                width={20}
                height={20}
                alt="GRW"
                className="z-10"
              />
              {/* Border with gradient and hover effect */}
              <div className="absolute inset-0 rounded-[42px] border-[2px] border-transparent bg-gradient-to-r from-[#28a7cf] to-[#9283ee] p-[1px] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]">
                {/* Button Background that changes on hover */}
                <div className="h-full w-full rounded-[42px] bg-[#171717] group-hover:bg-gradient-to-r group-hover:from-[#28a7cf] group-hover:to-[#9283ee]"></div>
              </div>
            </div>
          </div>
          {/* div for the image  */}
          <div className="w-full max-w-[902px]">
            <Image
              src={IMAGE_SFRAMEC}
              alt="img"
              layout="responsive"
              width={902}
              height={418}
              className="w-full h-auto"
            />

            {/* This is the relative container */}
            <div className="relative  w-[20%] h-[100%]">
              {/* w-[60px] xs:w-[130px] sm:w-[150px] md:w-[180px] lg:w-[200px] */}
              {/* Image positioned absolutely in the bottom-left */}
              <Image
                src={IMAGE_TABLEA}
                alt="img"
                layout="responsive"
                width={50}
                height={50}
                className="absolute bottom-[-30px] right-[-415%]"
              />
            </div>
          </div>
        </div>
        {/* Join our community */}
        <div className=" relative z-10 mt-[120px] pb-32 w-full max-w-[1332px] m-auto px-[20px] hidden">
          <div className="flex justify-center gap-3">
            <div className="mt-[105px] ">
              <div className="relative">
                <Image src={ASD} alt="ASD" className="absolute left-[200px] " />
              </div>
              <a href="https://discord.gg/pbbkRCG2kf" target="_blank ">
                <div className="flex justify-end mt-[150px] ml-[250px]">
                  <Image src={ADS} color="white" alt="Launch Icon" />
                </div>
              </a>
            </div>
            <div className="mt-[85px]">
              <Image src={ASDE} alt="ASDE" />
            </div>
          </div>
        </div>
        {/* new  */}
        <div className="w-full max-w-[1332px] mt-[100px] mb-[100px] m-auto px-[20px]">
          <div className="flex w-full mx-auto justify-center gap-4">
            {/* <div className="relative flex flex-col justify-between w-full"> */}
            <div className=" flex items-end">
              <a href="https://discord.gg/pbbkRCG2kf" target="_blank ">
                <Image src={ADS} color="white" alt="Launch Icon" className="" />
              </a>
            </div>
            {/* </div> */}

            {/* sdfdsfj */}
            <div>
              <div className="relative xs:max-w-[400px]">
                <Image
                  src={ASD}
                  alt="ASD"
                  className="absolute left-[-70%] top-[10px] xs:top-[10px] "
                />
              </div>
              <div className="max-w-[500px]">
                <Image src={ASDE} alt="ASDE" className="" />
              </div>
            </div>
          </div>
        </div>
        {/* terms and conditions */}
        <div className="flex flex-col justify-between items-center w-full max-w-[1332px] m-auto">
          <p className="flex-grow-0 flex-shrink-0 text-base text-center text-white">
            All rights reserved to Blockbit 2024 ©
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-[15px] text-center text-white">
            Terms of use | Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
}
