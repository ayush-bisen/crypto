import AutoBuyText from "@/components/settings/description/AutoBuyText";
import FeesText from "@/components/settings/description/FeesText";
import GeneralText from "@/components/settings/description/GeneralText";
import PendingPoolText from "@/components/settings/description/PendingPoolText";
import TpSlText from "@/components/settings/description/TpSlText";
import InfoSquared from '../../assets/images/InfoSquared.svg'
import TabAutoBuy from "@/components/settings/tabs/TabAutoBuy";
import TabFees from "@/components/settings/tabs/TabFees";
import TabGeneral from "@/components/settings/tabs/TabGeneral";
import TabPendingPool from "@/components/settings/tabs/TabPendingPool";
import TabTpSl from "@/components/settings/tabs/TabTpSl";
import TabWallet from "@/components/settings/tabs/TabWallet";
import { useUpdateSetting } from "@/components/settings/UpdateSettingProvider";
import ConnectComponent from "@/components/wallet/connect";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { defaultSettingInfo } from "@/types/setting";
import { useWallet } from "@solana/wallet-adapter-react";

import { Copy, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const router = useRouter();

  const [dynamicCategory, setDynamicCategory] = useState('fees');
  const [settingInfo, setSettingInfo]: any = useState(defaultSettingInfo);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");
  const [settingBackupInfo, setSettingBackupInfo]: any = useState(defaultSettingInfo);
  // const [loadedSetting, setLoadedSetting] = useState(false);
  const [profileImageData, setProfileIamgeData] = useState();
  const { triggerUpdateSetting } = useUpdateSetting();
  const [checkedLogin, setCheckedLogin] = useState(false);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [copied, setCopied] = useState(false);

  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(publicKey ?? '');
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

  const onCopyBBTButton = async () => {
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

  const loadSetting = async () => {
    const response = await apiService.get(
      apiRoutes.settings.list,
      publicKey
    );

    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }

    if (response === 401) {
      // await router.push('');
      return;
    }

    setSettingInfo(response.setting);
    setBBTPublicKey(response.bbt_public_key);
    setSettingBackupInfo(response.setting);
    // setLoadedSetting(true);
  };

  useEffect(() => {
    if (publicKey) {
      loadSetting();
    }
  }, [publicKey]);

  const onChangeSettingValue = (e: any, key: string, changedValue = null) => {
    let value = changedValue ? changedValue : e.target.value;
    if (value === 'on'
      || key === 'is_bot_on'
    ) {
      value = settingInfo[key] === 1 ? 0 : 1;
    }

    if (value === '') {
      value = 0;
    }

    const newSettingInfo: any = { ...settingInfo };
    newSettingInfo[key] = value;
    setSettingInfo(newSettingInfo);
  }



  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckedLogin(true);
      if (!publicKeyRef.current) {
        // router.push('/');
      }
    }, 1000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    publicKeyRef.current = publicKey!;
    if (publicKey) {
      loadSetting();
      const intervalId = setInterval(loadSetting, 5000);
      return () => clearInterval(intervalId);
    } else {
      if (checkedLogin) {
        // router.push('/');
      }
    }
  }, [publicKey]);

  const onCancelSetting = () => {
    const newSettingInfo: any = { ...settingBackupInfo };
    setSettingInfo(newSettingInfo);
  }

  const onUpdateSetting = () => {
    const settingFormData = new FormData();

    for (const key in settingInfo) {
      const value = settingInfo[key];
      settingFormData.append(key, value);
    }

    if (profileImageData) {
      settingFormData.append('profile_image_data', profileImageData);
    }

    apiService.putFormData(
      apiRoutes.settings.update_setting,
      settingFormData,
      publicKey
    ).then((response) => {
      if (response.message) {
        toast.error(
          <div className="text-[14px] font-bold text-white">
            {response.message}
          </div>,
          {
            position: "top-right",
            // padding: "0px",
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
        return;
      }

      setSettingInfo(response.setting);
      setBBTPublicKey(response.bbt_public_key);
      setSettingBackupInfo(response.setting);
      triggerUpdateSetting();

      toast.success(
        <div className="text-[14px] font-bold text-white">
          Setting is updated successfully
        </div>,
        {
          position: "top-right",
          // padding: "0px",
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
    })
  }

  return (
    <>
      {publicKey ?
        <>
          <div className="max-w-[620px] w-full bg-gray-900 rounded-lg p-4 mx-auto mt-10">
            <div className="text-lg font-bold text-white uppercase">General Settings</div>
            <div className="flex flex-col lg:flex-row items-center gap-5 mt-3 justify-between">
              <div className="text-base font-bold text-gray-500 w-full lg:w-[150px]">
                Trading wallet
              </div>
              <div className="bg-[#23242D] rounded-full p-2 flex items-center justify-between w-full lg:w-1/2 px-4">
                <span className="p-1 text-white">{bbt_public_key}</span>
                <Copy size={24} color="white" className="cursor-pointer" onClick={onCopyBBTButton} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Dynamic Content Section */}
            {dynamicCategory === "fees" && (
              <div className="w-full bg-black p-4 md:p-4 rounded-lg flex flex-col gap-5 mb-4 md:hidden">
                <div className="flex flex-row justify-between text-center">
                <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                  <span className="text-[18px] font-bold text-white text-start md:text-left">What are Fees?</span>
                  <p className="text-blue-400">hide</p>
                </div>
                <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                  TP/SL, which stands for Take Profit and Stop Loss, enables you to establish predefined thresholds for realizing profits or limiting losses on your open positions.
                </p>
              </div>
            )}
            {dynamicCategory === "withdraw" && (
              <div className="w-full bg-black p-4 md:p-4 rounded-lg flex flex-col gap-5 mb-4 md:hidden">
                <div className="flex flex-row justify-between text-center">
                <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                  <span className="text-[18px] font-bold text-white text-start md:text-left">General Setting</span>
                  <p className="text-blue-400">hide</p>
                </div>
                <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                  In the General Settings section, you have the ability to personalize your profile picture, define the operating hours of the application, and manage the primary on/off switch for the Bot.
                </p>
              </div>
            )}
            {dynamicCategory === "general" && (
              <div className="w-full bg-black p-4 md:p-4 rounded-lg flex flex-col gap-5 mb-4 md:hidden">
                <div className="flex flex-row justify-between text-center">
                <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                  <span className="text-[18px] font-bold text-white text-start md:text-left">General Setting</span>
                  <p className="text-blue-400">hide</p>
                </div>
                <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                  In the General Settings section, you have the ability to personalize your profile picture, define the operating hours of the application, and manage the primary on/off switch for the Bot.
                </p>
              </div>
            )}

            <div className="max-w-[620px] relative w-full rounded-lg mx-auto mt-1">
              {/* Dynamic Navbar */}
              <div className="flex flex-row flex-wrap items-center   bg-gray-900 justify-center gap-4 w-full py-1">
                {['fees', 'withdraw', 'general'].map(category => (
                  <div
                    key={category}
                    className={`w-full lg:w-[31%] flex justify-center items-center gap-1 cursor-pointer w-full rounded-md ${dynamicCategory === category ? "bg-[#23242D] text-white" : "text-[#858686]"}`}
                    onClick={() => setDynamicCategory(category)}
                  >
                    <p className="text-center py-3 text-[14px] w-full font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                  </div>
                ))}
              </div>

              {/* Sidebar for Information */}
              <div className="max-w-[300px] w-full absolute right-[-302px] top-[0px] hidden md:block ">
                {dynamicCategory === "fees" && (
                  <div className="bg-[#2593F90D] p-4 rounded-lg flex flex-col gap-5">
                      <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                    <span className="text-[18px] font-bold text-white text-start md:text-left">What are Fees?</span>
                    <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                      This section allows you to configure fee limits that will be applied to every transaction executed by the bot, ensuring optimal cost management.
                    </p>
                  </div>
                )}
                {dynamicCategory === "withdraw" && (
                  <div className="bg-[#2593F90D] p-4 rounded-lg flex flex-col gap-5">
                       <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                    <span className="text-[18px] font-bold text-white text-start md:text-left">General Setting</span>
                    <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                      In the General Settings section, you have the ability to personalize your profile picture, define the operating hours of the application, and manage the primary on/off switch for the Bot.
                    </p>
                  </div>
                )}
                {dynamicCategory === "general" && (
                  <div className="bg-[#2593F90D] p-4 rounded-lg flex flex-col gap-5">
                        <Image src={InfoSquared} width={"20"} height="20" alt="ddd"/>
                    <span className="text-[18px] font-bold text-white text-start md:text-left">General Setting</span>
                    <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
                      In the General Settings section, you have the ability to personalize your profile picture, define the operating hours of the application, and manage the primary on/off switch for the Bot.
                    </p>
                  </div>
                )}
              </div>

              {/* Render Dynamic Tabs */}
              <div className=" bg-gray-900 ">
              {dynamicCategory === "fees" && (
                <TabFees setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
              )}
              {dynamicCategory === "withdraw" && (
                <TabWallet setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
              )}
              {dynamicCategory === "general" && (
                <TabGeneral setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
              )}

              <div className="flex flex-row w-full gap-2 mt-4 p-2">
                <button
                  onClick={onUpdateSetting}
                  className="flex-1 text-transparent bg-gradient-to-r from-[#28A7CF] to-[#9283EE] rounded-[7px] px-4 py-2 text-white text-base font-bold"
                >
                  Update
                </button>
                <button
                  onClick={onCancelSetting}
                  className="flex-1 bg-[#202020] hover:bg-[#2c2c2c] border border-[#7A7A7A] rounded-[7px] px-4 py-2 text-white text-base font-bold"
                >
                  Cancel
                </button>
              </div>
              </div>

            </div>

            {/* Sidebar for Information */}
            <div className="max-w-[300px] w-full absolute right-[105px] hidden md:block">

            </div>
          </div>

          <style jsx>{`
        @media (max-width: 768px) {
          .max-w-[620px] {
            max-width: 400px;
          }
        }
      `}</style>
        </>


        :
        //<ConnectComponent />
        null
      }
    </>
  );
};

export default Settings;