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
import ASDE from "@/assets/images/discord.svg";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

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
      <div className="relative w-full h-full overflow-x-hidden custom-scrollbar">
        <div className="flex justify-center relative z-10">
          <div className="mt-[105px]  ">
            <p className="w-[1248px] font-bold text-center">
              <span className="w-[1248px] text-[58px] font-bold text-center text-white">
                Trade Smarter With
              </span>
              <br />
              <span className="w-[1248px] text-[82px] font-bold text-center text-white">
                Blockbit{" "}
              </span>
              <span className="w-[1248px] text-[82px] font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#E8DFFF] via-[#A945F3] via-[#DC52BA] to-[#FFFFFF]">
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
        <div
          className="md:px-[80px] flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[100px] md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center h-[700px] w-full"
          style={{
            backgroundImage: `url('/assets/images/Lamp.svg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="self-stretch flex-grow-0 flex-shrink-0 w-[0.1px] bg-gray-600  h-[500px] mt-20" />
          <div className="flex flex-col justify-center items-start w-[402px] relative gap-8">
            <Image src={IMAGE_SEARCH} width={40} height={40} alt="IMAGE" />
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[402px] text-5xl font-bold text-left text-white">
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
              <p className="flex-grow w-[382px] text-xl text-left text-[#d7f6f3]">
                Scan the Solana blockchain and discover new tokens based on your
                filters
              </p>
            </div>
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 h-[62px] gap-2 pl-9 pr-7 py-6 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white z-10">
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
          <div className="w-full max-w-[902px]">
            <Image
              src={IMAGE_SFRAME}
              alt="img"
              layout="responsive"
              width={902}
              height={418}
              className="w-full h-auto"
            />

            {/* This is the relative container */}
            <div className="relative w-[200px]">
              {/* Image positioned absolutely in the bottom-left */}
              <Image
                src={IS_Main}
                alt="img"
                layout="responsive"
                width={50}
                height={50}
                className="absolute bottom-[-30px] left-[-100px]"
              />
            </div>
          </div>
        </div>
        <div
          className="md:px-[80px] gap-10 flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[100px] md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center"
          // style={{ backgroundImage: `url('./assets/images/Lamp.svg')` }}
        >
          <div className="w-full max-w-[902px]">
            <Image
              src={IMAGE_SFRAMEA}
              alt="img"
              layout="responsive"
              width={902}
              height={418}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col justify-center items-start w-[402px] relative gap-8">
            <div className="absolute self-stretch flex-grow-0 flex-shrink-0 w-[0.1px] bg-gray-600  h-[500px] mt-20" />
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
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 h-[62px] gap-2 pl-9 pr-7 py-6 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white z-10">
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
        Start Trading Today For Free
        <div
          className="md:px-[80px] flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[100px] md:mt-[100px] lg:mt-[200px] relative z-10 bg-cover bg-center"
          style={{ backgroundImage: `url('./assets/images/Lamp.svg')` }}
        >
          <div className="self-stretch flex-grow-0 flex-shrink-0 w-[0.1px] bg-gray-600  h-[500px] mt-20" />
          <div className="flex flex-col justify-center items-start w-[402px] relative gap-8">
            <Image src={IMAGE_SFRAMEB} width={40} height={40} alt="IMAGE" />

            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[402px] text-5xl font-bold text-left text-white">
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
              <p className="flex-grow w-[382px] text-xl text-left text-[#d7f6f3]">
                Execute trades in Seconds.
              </p>
            </div>
            <div className="relative group flex justify-center items-center flex-grow-0 flex-shrink-0 h-[62px] gap-2 pl-9 pr-7 py-6 rounded-[42px] transition-all duration-300 ease-in-out">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white z-10">
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
            <div className="relative w-[150px] h-[100%]">
              {/* Image positioned absolutely in the bottom-left */}
              <Image
                src={IMAGE_TABLEA}
                alt="img"
                layout="responsive"
                width={50}
                height={50}
                className="absolute bottom-[-30px] right-[-530px]"
              />
            </div>
          </div>
        </div>
        <div className=" relative z-10 mt-[120px] pb-32">
          <div className="flex justify-start">
            <div className="mt-[105px] ">
              <div className="relative  w-[600px]">
                <Image src={ASD} alt="ASD" className="absolute left-[200px] " />
              </div>
              <a href="https://discord.gg/pbbkRCG2kf" target="_blank ">
                <div className="flex justify-end mt-[200px] w-[400px] ml-[250px]">
                  <Image src={ADS} color="white" alt="Launch Icon" />
                </div>
              </a>
            </div>
            <div className="mt-[85px] w-[600px]">
              <Image src={ASDE} alt="ASDE" />
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-10  items-center w-[1248px] relative">
          <p className="flex-grow-0 flex-shrink-0 text-base text-center text-white">
            All rights reserved to Blockbit 2024 ©
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-[15px] text-center text-white">
            Terms of use | Privacy Policy
          </p>
        </div>
        ;
      </div>
    </>
  );
}
