"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import IMAGE_COPY from '@/assets/images/copy.svg';
import IMAGE_SOL from '@/assets/images/solana.svg';
import IMAGE_WALLET from '@/assets/images/Wallet.svg';
import Bttn from '@/assets/images/Bttn.svg';
import Bttns from '@/assets/images/Bttns.svg';
import Bttnss from '@/assets/images/BttnYes.svg';
import Bttnsss from '@/assets/images/Bttnsss.svg';
import BttnsssA from '@/assets/images/BttnSSSS.svg';
import loding from '@/assets/images/loding.svg';
import Errorr from '@/assets/images/Error.svg';
import Keyee from '@/assets/images/Keyee.svg';
import Coins from '@/assets/images/Coins.svg';
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import sleep from "@/utils/time";

interface CurrentProps {
  currentStep: number;
  bbt_public_key: string;
  bbt_private_key: string;
}

interface NextProps {
  nextStep: any;
  bbt_public_key: string;
  bbt_private_key: string;
}

interface RestartProps {
  restartSteps: any;
  bbt_public_key: string;
  bbt_private_key: string;
}

// Step Progress Bar Component
const StepProgressBar = (props: CurrentProps) => {
  const { currentStep } = props; // Accept onStepChange to handle clicks
  const steps = [
    { step: 1, label: "Generate Trade Wallet" },
    { step: 2, label: "Copy Private Key" },
    { step: 3, label: "Deposit Funds" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 pt-[30px]">
      {/* Step Circles and Connecting Lines */}
      <div className="flex items-center gap-3">
        {steps.map((stepObj, index) => (
          <div key={index} className="flex items-center w-full">
            {/* Radio button */}
            <div className="relative">
            <input
  type="radio"
  id={`step-${stepObj.step}`}
  name="step"
  checked={currentStep === stepObj.step || currentStep > stepObj.step}
  // onClick={() => onStepChange(stepObj.step)} // Call the onStepChange function on click
  className={`appearance-none w-[30px] h-[30px] rounded-full border border-gray-400 cursor-pointer
    ${currentStep === stepObj.step ? 'bg-[linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)] border-[linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)]' : ''}
    ${currentStep > stepObj.step ? 'border-2 border-linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)]' : ''}  // Use border instead of background color for a circle
  `}
/>

              {/* Done checkmark */}
              {currentStep > stepObj.step && (
                <label
                  htmlFor={`step-${stepObj.step}`}
                  className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                >
                  <div
    className={`w-5 h-5 rounded-full border-2 mb-1 
      ${currentStep === stepObj.step ? 'bg-[linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)] border-transparent' : ''}
      ${currentStep > stepObj.step ? 'border-linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)] bg-[linear-gradient(90deg,#28A7CF_0%,#9283EE_100%)]' : 'border-gray-400'}
    `}
  />
                </label>
              )}
            </div>

            {/* Line connecting the steps (skip for the last step) */}
            {index < steps.length - 1 && (
  <div
    className="h-[2px] pl-2 w-[100px]"
    style={{
      background: currentStep > stepObj.step 
        ? 'linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)' 
        : 'gray'
    }}
  ></div>
)}

          </div>
        ))}
      </div>

      {/* Labels for the steps */}
      <div className="flex justify-between w-full max-w-[380px]">
        {steps.map((stepObj, index) => (
          <span
            key={index}
            className={`text-sm ${
              currentStep >= stepObj.step ? 'text-[#A04BF5]' : 'text-gray-500'
            } text-center`}
            style={{
              background:
                currentStep >= stepObj.step
                  ? 'linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)'
                  : 'none',
              WebkitBackgroundClip:
                currentStep >= stepObj.step ? 'text' : 'none',
              color: currentStep >= stepObj.step ? 'transparent' : 'white', // Use transparent color for gradient text
            }}
          >
            {stepObj.label}
          </span>
        ))}
      </div>
    </div>
  );
};




//onClick={nextStep} Card Content for Step 1 with buttons
const Step1 = (props: NextProps) => {
  const nextStep = props.nextStep;
  const [showNextCard, setShowNextCard] = useState(false);
  // const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  const [copied, setCopied] = useState(false);

  const handleGenerateClick = () => {
    setShowNextCard(true); // Switch to next card
  };

  const summarize = (public_key: string) => {
    return public_key ? `${public_key.slice(0, 6)}.....${public_key.slice(-6)}` : '.....';
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  return (
    <div>
      {!showNextCard ? (
        <>
          <div className="">
            <div className="top-[115px]  absolute left-[47%]">
              <Image alt="sss" src={IMAGE_WALLET} width={70} height={70} className=" rounded-lg" style={{
                background: " linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)"
              }} />
              <div className="p-2 text-gray-500">
                Step - 1
              </div>
            </div>
            <div
              className="rounded-[48px]  justify-center mt-[40px] md:mt-[40px] pb-10 flex flex-col md:flex-row text-white w-[90%] md:w-[600px] mx-auto"
              style={{
                background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
                backgroundBlendMode: "lighten"
              }}
            >
              <div className="py-2 px-6">

                <div className="text-[20px] md:text-[25px] mt-[44px] font-normal text-center mb-4">Your   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                  trading wallet
                </span> address is</div>
                <div className="mb-4 text-[24px] md:text-[30px] font-bold flex justify-center mt-[16px]">
                  {summarize(bbt_public_key)}
                </div>
                <div className="text-[14px] font-normal text-center mx-auto text-center">
                  Click <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                    Generate
                  </span> to take control over your Trading wallet and private keys
                </div>
                <button
                  onClick={handleGenerateClick}
                  className="mt-4"
                 
                >
                  <Image src={BttnsssA} alt="fff"/>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="top-[115px]  absolute left-[47%]">
            <Image alt="sss" src={Keyee} width={70} height={70} className=" rounded-lg" style={{
              background: " linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)"
            }} />
            <div className="p-2 text-gray-500">
              Step - 2
            </div>
          </div>
          <div
            className="rounded-[48px] mt-[40px] text-white w-full max-w-[800px] w-[90%] md:w-[600px]  pb-10 mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
              backgroundBlendMode: "lighten",
            }}
          >
            <div className="px-5 pt-[60px] w-full">
              <div className="text-[18px] md:text-[20px] font-bold mb-4 text-center md:text-center">
                BLOCKBIT TRADING WALLET
              </div>
              <div className="flex  w-full  md:flex-row justify-between bg-[#9292921A] rounded-[25px] py-[16px] px-[20px] mt-[22px] w-full md:w-full  mx-auto md:mx-0">
                <div className="text-[14px] md:text-[15px] font-normal break-words px-[20px]">{bbt_public_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="img"
                  className="cursor-pointer "
                  onClick={onCopyButton}
                />
              </div>
              <div className="mb-4 text-[16px] md:text-[18px] font-bold mt-[20px] text-center md:text-center">
                TRADING WALLET PRIVATE KEY
              </div>

              <div className="text-[12px] md:text-[14px] font-normal text-[#9F9F9F] text-center md:text-center">
                Please copy the below private key and add it to your wallet as a new account.
              </div>

            </div>

            <div className="  mt-[20px] ">

              <button
                onDoubleClick={nextStep}
                className="m-5"
              >
                <Image src={Bttn} alt="gtt" />
              </button>
            </div>
            <div className="text-[10px] flex flex-row justify-center md:text-[14px] font-bold text-[#D9A900] text-center md:text-center gap-3">
              <Image src={Errorr} alt="gtt" />  Your private key will NOT be shown again.<Image src={Errorr} alt="gtt" />
            </div>
          </div>

        </>
      )}
    </div>
  );
};

// Card Content for Step 2 without buttons
const Step2 = (props: NextProps) => {
  const nextStep = props.nextStep;
  const [showPopup, setShowPopup] = useState(false);
  const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  const [copied, setCopied] = useState(false);

  const handleContinue = () => {
    // Handle the next step
    console.log("Proceed to the next step");
    setShowPopup(false);
  };

  const onCopyPrivateButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_private_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  const onCopyPublicButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  return (
    <div className="">
      <div className="top-[115px]  absolute left-[47%]">
        <Image alt="sss" src={Keyee} width={70} height={70} className=" rounded-lg" style={{
          background: " linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)"
        }} />
        <div className="p-2 text-gray-500">
          Step - 3
        </div>
      </div>
      <div className="">
        <div
        >
          <div className="rounded-[48px] mt-[40px] text-white w-full max-w-[800px] w-[90%] md:w-[600px] pb-10 mx-auto "
            style={{
              background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
              backgroundBlendMode: "lighten",
            }}>

            <div className="px-6  pt-[60px] ">
              <div className="text-[18px] text-center sm:text-[20px] font-bold mb-4">BLOCKBIT TRADING WALLET</div>
              <div className="flex justify-between  bg-[#9292921A] rounded-[15px] sm:rounded-[25px] py-[12px] px-[20px] mt-[12px]">
                <div className="text-[14px] sm:text-[15px] font-normal break-words">{bbt_public_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="Copy"
                  className="cursor-pointer"
                  onClick={onCopyPublicButton}
                />
              </div>

              <div className="mb-2 text-[16px] text-center sm:text-[18px] font-bold mt-[12px]">TRADING WALLET PRIVATE KEY</div>

              <div className="text-[12px] sm:text-[14px] font-normal text-[#9F9F9F]">
                Please copy the below private key and add it to your wallet as a new account.
              </div>

              <div className="flex justify-between  bg-[#9292921A] rounded-[15px] sm:rounded-[25px] py-[12px] px-[20px] mt-[12px]">
                <div className="text-[14px] sm:text-[15px] font-normal break-words">{bbt_private_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="Copy"
                  className="cursor-pointer"
                  onClick={onCopyPublicButton}
                />
              </div>
            </div>
            <div className="text-[12px] mt-2 flex flex-row justify-center md:text-[14px] font-bold text-[#D9A900] text-center md:text-center gap-3">
              <Image src={Errorr} alt="gtt" />   Your private key will NOT be shown again.<Image src={Errorr} alt="gtt" />
            </div>
            <div className="mt-[20px] ">

              <button
                onClick={() => setShowPopup(true)}
className="mx-5"
              >
                <Image src={Bttns} alt="gtt" />
              </button>
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
              backgroundBlendMode: 'lighten',
              backdropFilter: 'blur(10px)', 
            }}>
               
              <div
               style={{
                background: 'linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
                backgroundBlendMode: 'lighten',
                backdropFilter: 'blur(10px)', 
              }}
                className="text-white items-center rounded-[16px] sm:rounded-[30] p-6 sm:p-8 w-full max-w-[800px] sm:max-w-[90%] md:max-w-[600px] h-auto text-center  "
              >
               <div className="relative">
                <Image src={Errorr} alt="gtt" width={60} height={60}  className="absolute bottom-[10px] left-[45%]"/> 
                </div>
                <div className="text-[18px] sm:text-[16px] md:text-[22px] px-4  pt-[20px] sm:pt-[30px] mb-2">
                  Are you sure you saved your <strong>Private key?</strong>
                </div>

                <div className="text-[12px] sm:text-[12px] md:text-[12px] px-4 sm:px-10 md:px-20 p">
                Your private key will NOT be shown again.
                </div>

                <div className="flex flex-col sm:flex-row justify-between h-full gap-4 md:gap-8 mt-6 sm:mt-10">
  {/* Dismiss button */}
  <button
    onClick={() => setShowPopup(false)}
    className="w-full sm:w-1/2 bg-[#4b4b4b] text-[14px] sm:text-[12px] md:text-[12px] text-white font-bold rounded-[10px]  hover:opacity-85"
  >
    No! Take me back
  </button>

  {/* Continue button */}
  <button
    onClick={nextStep}
    className="w-full sm:w-1/2 flex justify-center"
  >
    <Image src={Bttnss} alt="fff" />
  </button>
</div>

              </div>
            </div>
          )}

        </div>
      </div>

    </div>

  );
};

// Card Content for Step 3 with some other functionalities (e.g., confirmation)
const Step3 = (props: RestartProps) => {
  // const restartSteps = props.restartSteps;
  // const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  // const [showNextCard, setShowNextCard] = useState(false);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const connection = new Connection('https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getWalletBalance();
    const intervalId = setInterval(getWalletBalance, 1000);
    return () => clearInterval(intervalId);
  }, [bbt_public_key]);

  const getWalletBalance = async () => {
    if (bbt_public_key) {
      const balance = await connection.getBalance(new PublicKey(bbt_public_key));
      setBalance(balance / LAMPORTS_PER_SOL);
    }

    if (balance > 0) {
      setRefreshing(false);
    }
  }

  const getUpdateWalletCopied = async () => {
    const response = await apiService.post(
      apiRoutes.wallet.update_copied,
      {},
      bbt_public_key
    );

    // if (response.is_wallet_not_copied === 0) {
    //   await router.push('/settings?tab=general');
    //   return;
    // }
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  const onRefreshBalance = async () => {
    setRefreshing(true);
    await getWalletBalance();
    await sleep(1000);
  };

  return (
    <div className="relative">
      <div className="top-[5px]  absolute left-[46%]">
        <Image alt="sss" src={Coins} width={70} height={70} className=" rounded-lg" style={{
          background: " linear-gradient(90deg, #28A7CF 0%, #9283EE 100%)"
        }} />
        <div className="p-2 text-gray-500">
          Step -3
        </div>
      </div>
      <div
        className="rounded-[48px] items-center mt-[30px] text-white w-full max-w-[800px]  w-[90%] md:w-[600px]  pt-10 pb-10 mx-auto"
        style={{
          background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
          backgroundBlendMode: "lighten"
        }}
      >
        <div className="text-center pt-10 ">
          <div className="text-[38px] sm:text-[20px] md:text-[30px] font-bold mb-2">Your current Balance</div>
          <div className="flex justify-center items-center gap-2">
          <Image src={IMAGE_SOL} width={30} height={30} alt="img" className="w-[30px] h-[30px] ml-2 mt-[6px]" />

            <div className="text-[32px] sm:text-[30px] font-normal">{balance}</div>
          </div>
          <div className="text-[14px] sm:text-[12px] font-bold text-[#9F9F9F]">PLEASE DEPOSIT FUNDS TO YOUR TRADING WALLET USING THIS ADDRESS</div>
        </div>
        <div className="px-10 pt-3">
          <div className=" flex justify-between w-full max-w-[545px] bg-[#9292921A] rounded-[25px] py-[10px] px-[20px] mt-[2px] mx-auto">
            <div className="text-[15px] font-normal">{bbt_public_key}</div>
            <Image
              src={IMAGE_COPY}
              width={20}
              height={20}
              alt="img"
              className="cursor-pointer"
              onClick={onCopyButton}
            />
          </div>

          {balance > 0 ? (
            <button
              className=" flex justify-center w-full max-w-[545px] text-center mt-[16px] text-white text-[18px] sm:text-[20px] font-bold rounded-[42px] py-[18px] hover:opacity-85 mx-auto"
              style={{
                background: "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)"
              }}
              onClick={getUpdateWalletCopied}
            >
              Continue to the app
            </button>
          ) : (
            <button
              className="flex justify-center w-full max-w-[545px] text-center mt-[16px] text-white text-[18px] sm:text-[20px] font-bold rounded-[42px] py-[18px] hover:opacity-85 mx-auto"

              onClick={onRefreshBalance}
            >
              <Image src={Bttnsss} alt="dff" />
            </button>

          )}
        </div>
      </div>

      {refreshing && balance === 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex h-[200px] flex-col items-center justify-center text-white rounded-[32px] bg-gray-900 py-4 px-2 w-[80%] max-w-[500px] text-center">
            <Image src={loding} alt="dff"  className="my-3"/>
            <div className="text-[20px] sm:text-[20px] my-2 font-bold">
              Scanning the Blockchain  
              Please Wait...
            </div>
          </div>
        </div>

      ) : null}
    </div>

  );
};

export default function Page() {
  const router = useRouter();
  const wallet = useWallet();

  const [currentStep, setCurrentStep] = useState(1);
  const publicKey = wallet.publicKey?.toString();
  const [bbt_private_key, setBBTPrivateKey] = useState("");
  const [bbt_public_key, setBBTPublicKey] = useState("");

  // Auto-advance logic for step 2
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Restart the steps from the beginning
  const restartSteps = () => {
    setCurrentStep(1);
  };

  const loadWallet = async () => {
    const response = await apiService.get(
      apiRoutes.wallet.data,
      publicKey
    );



    setBBTPrivateKey(response.bbt_private_key);
    setBBTPublicKey(response.bbt_public_key)
  };

  useEffect(() => {
    if (publicKey) {
      loadWallet();
    }
  }, [publicKey]);

  // Automatically move from step 2 to step 3 after 5 seconds
  return (
    <div
      className="w-full h-full"
    // style={{
    //   background: `
    //       radial-gradient(177.06% 84.54% at 140% 15.46%, #063F69 20.1%, #1A0D40 40.1%, #0F0F0F 67.1%),
    //       radial-gradient(67.66% 67.66% at 10.18% 91.4%, rgba(5, 0, 235, 0.34) 0%, rgba(0, 179, 235, 0.104615) 32%, rgba(0, 38, 235, 0) 82.5%)
    //     `,
    //   backgroundBlendMode: 'overlay',
    // }}
    >
      <StepProgressBar
        currentStep={currentStep}
        bbt_public_key={bbt_public_key}
        bbt_private_key={bbt_private_key}
      />

      {/* Step Card with dynamic content */}
      <div className="px-8 text-white mt-4 items-center flex justify-center mx-auto">
        {currentStep === 1 &&
          <Step1
            nextStep={nextStep}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
        {currentStep === 2 &&
          <Step2
            nextStep={nextStep}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
        {currentStep === 3 &&
          <Step3
            restartSteps={restartSteps}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
      </div>
    </div>
  )
}
