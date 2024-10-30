/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from "@nextui-org/table";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import Link from "next/link";
import { getDiffTimeInFormat } from "@/utils/time";
import { coloriseValue } from "@/utils/number";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import IMG_SETTING from "@/assets/images/setting.svg";
import IMG_SOL from "@/assets/images/sol.png";
import IMG_CHECK from "@/assets/images/check.png";
import IMG_CROSS from "@/assets/images/cross.png";
import IMG_EAGLE from "@/assets/images/eagle.png";
import { useWallet } from "@solana/wallet-adapter-react";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";
import ConnectComponent from "@/components/wallet/connect";
import { useRouter } from "next/router";
import { SettingProps } from "@/types/setting";
import CustomDropdown from "@/components/customdropdown";
import CustomDroplist from "@/components/CustomDropList";
import { defaultSettingInfo } from "@/types/setting";
import { useUpdateSetting } from "@/components/settings/UpdateSettingProvider";
import AutoBuyDropdown from "@/components/AutoBuyDropdown";
// import { dummyPools, Pool } from "@/pages/trades/dummydataforpending";
import QuickBuyAmountDropDown from "@/components/QuickBuyAmountDropDwon";

const PendingPools = () => {
  const router = useRouter();
  const [pendingPools, setPendingPools] = useState<Pool[]>([]);
  const [filteredPools, setFilteredPools] = useState<Pool[]>([]);
  const [setting, setSetting]: any = useState(0); //sets setting to zero for dummy data
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedPoolID, setSelectedPoolID] = useState(0);
  const [confirmBuy, setConfirmBuy] = useState(false);
  const [selectedBuyPoolID, setSelectedBuyPoolID] = useState(0);
  const [quick_buy_amount, setQuickBuyAmount] = useState("0.1");
  const [settingInfo, setSettingInfo]: any = useState(defaultSettingInfo);
  const [settingBackupInfo, setSettingBackupInfo]: any =
    useState(defaultSettingInfo);
  const [checkedLogin, setCheckedLogin] = useState(false);
  const wallet = useWallet();
  //TESTING
  const defaultPublicKey = "DefaultMockPublicKey123";
  const publicKey = wallet.publicKey?.toString() || defaultPublicKey;
  const publicKeyRef = useRef(publicKey);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");
  const [profileImageData, setProfileIamgeData] = useState();
  const { triggerUpdateSetting } = useUpdateSetting();

  let token: any = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  // dummy data
  interface Pool {
    id: number;
    pending_pool: {
      pool_name: string;
      pool_url: string;
      pool_open_time: string;
      price_24h: number;
      lp_burned_percent: number;
      pooled_sol: number;
      pooled_token_percent: number;
      token_logo_url: string;
      can_freeze: boolean;
      can_mint: boolean;
      top_10_percent: number;
    };
    status: number;
  }

  const dummyPools: Pool[] = [
    {
      id: 1,
      pending_pool: {
        pool_name: "SOL/USDC",
        pool_url: "/sol-usdc-pool",
        pool_open_time: "2024-09-25T10:00:00Z",
        price_24h: -2.45,
        lp_burned_percent: 96,
        pooled_sol: 120,
        pooled_token_percent: 4,
        token_logo_url: "/path/to/token_logo.png",
        can_freeze: true,
        can_mint: false,
        top_10_percent: 8,
      },
      status: 0, // Waiting
    },
    {
      id: 2,
      pending_pool: {
        pool_name: "BTC/SOL",
        pool_url: "/btc-sol-pool",
        pool_open_time: "2024-09-24T15:00:00Z",
        price_24h: 1.23,
        lp_burned_percent: 50,
        pooled_sol: 20,
        pooled_token_percent: 80.12,
        token_logo_url: "/path/to/btc_logo.png",
        can_freeze: false,
        can_mint: true,
        top_10_percent: 12,
      },
      status: 1, // Buying
    },
    {
      id: 3,
      pending_pool: {
        pool_name: "SOL/USDC",
        pool_url: "/sol-usdc-pool",
        pool_open_time: "2024-09-25T10:00:00Z",
        price_24h: -2.45,
        lp_burned_percent: 96,
        pooled_sol: 120.4532,
        pooled_token_percent: 65.32,
        token_logo_url: "/path/to/token_logo.png",
        can_freeze: true,
        can_mint: false,
        top_10_percent: 8,
      },
      status: 0, // Waiting
    },
    {
      id: 4,
      pending_pool: {
        pool_name: "SOL/USDC",
        pool_url: "/sol-usdc-pool",
        pool_open_time: "2024-09-25T10:00:00Z",
        price_24h: -2.45,
        lp_burned_percent: 96,
        pooled_sol: 120.4532,
        pooled_token_percent: 100,
        token_logo_url: "/path/to/token_logo.png",
        can_freeze: true,
        can_mint: false,
        top_10_percent: 8,
      },
      status: 0, // Waiting
    },
    {
      id: 5,
      pending_pool: {
        pool_name: "SOL/USDC",
        pool_url: "/sol-usdc-pool",
        pool_open_time: "2024-09-25T10:00:00Z",
        price_24h: -2.45,
        lp_burned_percent: 96,
        pooled_sol: 120.4532,
        pooled_token_percent: 65,
        token_logo_url: "/path/to/token_logo.png",
        can_freeze: true,
        can_mint: false,
        top_10_percent: 8,
      },
      status: 0, // Waiting
    },
    // Add more dummy data as needed
  ];
  // console.log(dummyPools.filter((pool) => pool.pending_pool.pooled_sol > 200));
  useEffect(() => {
    setPendingPools(dummyPools);
  }, []);

  const fliterpass = () => {
    console.log(
      dummyPools.filter((pool) => pool.pending_pool.pooled_sol > 200)
    );
  };

  const columns = [
    {
      key: "pool_name",
      label: "Pair",
    },
    {
      key: "time_live",
      label: "Created",
    },
    {
      key: "audit",
      label: "Contract Audit",
    },
    {
      key: "pooled_sol",
      label: "Pooled SOL",
    },
    {
      key: "pooled_token",
      label: "Pooled Token",
    },
    {
      key: "price_24h",
      label: "24H Change (%)",
    },
    {
      key: "lp_burned",
      label: "LP Burned",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const loadPendingPools = async () => {
    const response = await apiService.get(
      apiRoutes.pending_pools.list,
      publicKey
    );
    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }
    if (response === 401) {
      // await router.push('');
      return;
    }
    if (response.pending_pools) {
      setPendingPools(response.pending_pools);
    }
    if (response.setting) {
      setSetting(response.setting);
    }
    setBBTPublicKey(response.bbt_public_key);
  };

  const cancelPool = async () => {
    const delete_url = `${apiRoutes.pending_pools.delete}${selectedPoolID}`;
    await apiService.delete(delete_url, publicKey).then((response) => {
      if (!response.success) {
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
      }
      // loadPendingPools();
      toast.success(
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
    });
  };

  const onCancelPendingPool = async (pool_id: number) => {
    setSelectedPoolID(pool_id);
    setConfirmDelete(true);
  };

  const buyPool = async () => {
    // const buy_url = `${apiRoutes.pending_pools.buy}${selectedBuyPoolID}`;
    // await apiService.post(
    //   buy_url,
    //   { buy_amount: quick_buy_amount },
    //   publicKey
    // ).then((response) => {
    //   if (response.error) {
    //     toast.error(
    //       <div className="text-[14px] font-bold text-white">
    //         {response.message}
    //       </div>,
    //       {
    //         position: "top-right",
    //         // padding: "0px",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         style: {
    //           backgroundColor: "#1a202c",
    //           top: "70px",
    //         },
    //       }
    //     );
    //     return;
    //   }
    //   loadPendingPools();
    //   toast.success(
    //     <div className="text-[14px] font-bold text-white">
    //       {response.message}
    //     </div>,
    //     {
    //       position: "top-right",
    //       // padding: "0px",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       style: {
    //         backgroundColor: "#1a202c",
    //         top: "70px",
    //       },
    //     }
    //   );
    // });
  };

  const onQuickBuyPendingPool = async (pool_id: number) => {
    setSelectedBuyPoolID(pool_id);
    setConfirmBuy(true);
  };

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
    // publicKeyRef.current = publicKey!;
    // if (publicKey) {
    //   loadPendingPools();
    //   const intervalId = setInterval(loadPendingPools, 1000);
    //   return () => clearInterval(intervalId);
    // } else {
    //   if (checkedLogin) {
    //     router.push('/');
    //   }
    // }
  }, [publicKey]);

  const renderCell = (pending_pool: any, columnKey: any) => {
    const cellValue = pending_pool[columnKey];
    const pubKeySlug = bbt_public_key ? `?maker=${bbt_public_key}` : "";
    const pool_url = `${pending_pool.pending_pool.pool_url}${pubKeySlug}`;

    switch (columnKey) {
      case "pool_name":
        return (
          <>
            <Link target="_blank" href={pool_url}>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <img
                  src={pending_pool.pending_pool.token_logo_url}
                  alt=""
                  width="24"
                  className="rounded-full"
                />
                {pending_pool.pending_pool.pool_name}
              </div>
            </Link>
          </>
        );
      case "time_live":
        return (
          <>{getDiffTimeInFormat(pending_pool.pending_pool.pool_open_time)}</>
        );

      case "price_24h":
        return (
          <>
            {coloriseValue(
              pending_pool.pending_pool.price_24h.toFixed(2) + "%",
              pending_pool.pending_pool.price_24h
            )}
          </>
        );
      case "lp_burned":
        return (
          <>
            {pending_pool.pending_pool.lp_burned_percent > 95 ? (
              <div className="flex items-center gap-1">
                <p className="font-bold text-[#FFFFFF] ">Burned</p>
                <Image src={IMG_CHECK} alt="" className="w-[12px] h-[12px]" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <p className="font-bold text-[#FFFFFF] whitespace-nowrap">
                  Not burned
                </p>
                <Image src={IMG_CROSS} alt="" className="w-[12px] h-[12px]" />
              </div>
            )}
          </>
        );
      case "pooled_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {pending_pool.pending_pool.pooled_sol.toFixed(4)}
            </div>
          </>
        );
      case "pooled_token":
        return (
          <>
            {`${pending_pool.pending_pool.pooled_token_percent.toFixed(2)} %`}
          </>
        );
      case "action":
        return (
          <>
            <div className="flex items-center justify-end">
              <Link target="_blank" href={pool_url} className="mr-6">
                <Image
                  src={IMG_EAGLE}
                  alt=""
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                />
              </Link>
              <Button
                size="sm"
                color="success"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF] mr-2"
                onClick={() => onQuickBuyPendingPool(pending_pool.id)}
              >
                Quick Buy
              </Button>
              <Button
                size="sm"
                color="danger"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF]"
                onClick={() => onCancelPendingPool(pending_pool.id)}
              >
                Cancel
              </Button>
            </div>
          </>
        );
      case "status":
        return (
          <>
            {pending_pool.status === 0 ? (
              <p className="font-bold text-[#D9A900]">Waiting...</p>
            ) : (
              <p className="font-bold text-[#17C654]">Buying!</p>
            )}
          </>
        );
      case "audit":
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <p className="font-medium text-[12px]">Can Freeze</p>

                <Image
                  src={
                    pending_pool.pending_pool.can_freeze ? IMG_CROSS : IMG_CHECK
                  }
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <p className="font-medium text-[12px]">Can Mint</p>
                <Image
                  src={
                    pending_pool.pending_pool.can_mint ? IMG_CROSS : IMG_CHECK
                  }
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1 whitespace-nowrap">
                <p className="font-medium text-[12px]">Whale Check</p>

                <Image
                  src={
                    pending_pool.pending_pool.top_10_percent >
                    (setting.buy_whale_check_percent || 0)
                      ? IMG_CROSS
                      : IMG_CHECK
                  }
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>
            </div>
          </>
        );
      default:
        return cellValue;
    }
  };

  const classNames = React.useMemo(
    () => ({
      th: ["text-default-500", "border-b", "border-divider", "text-center"],
      td: ["text-center", "py-3"],
    }),
    []
  );

  let row_index = 0;

  // functions for storing the filters value
  const loadSetting = async () => {
    const response = await apiService.get(apiRoutes.settings.list, publicKey);

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
  const onCancelSetting = () => {
    const newSettingInfo: any = { ...settingBackupInfo };
    setSettingInfo(newSettingInfo);
  };

  const onUpdateSetting = () => {
    const settingFormData = new FormData();

    for (const key in settingInfo) {
      const value = settingInfo[key];
      settingFormData.append(key, value);
    }

    if (profileImageData) {
      settingFormData.append("profile_image_data", profileImageData);
    }

    apiService
      .putFormData(
        apiRoutes.settings.update_setting,
        settingFormData,
        publicKey
      )
      .then((response) => {
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
      });
  };

  // Filter code start from here

  const [selectedSOLSize, setSelectedSOLSize] = useState("1-1000");
  const [selectedTokenPercent, setSelectedTokenPercent] = useState("<5%");
  const [selectedPriceChange, setSelectedPriceChange] = useState("<100%");
  const onChangeSettingValue = (e: any, key: string, changedValue = "") => {
    let value = changedValue ? changedValue : e.target.value;
    if (value === "on" || key === "is_bot_on") {
      value = settingInfo[key] === 1 ? 0 : 1;
    }

    if (value === "") {
      value = 0;
    }

    const newSettingInfo: any = { ...settingInfo };
    newSettingInfo[key] = value;

    setSettingInfo(newSettingInfo);
  };

  const handleChange = (value: string) => {
    onChangeSettingValue({ target: { value } }, "buy_initial_invest_sol"); // Pass value directly without default
  };
  const handleChangeSOL = (value: string) => {
    onChangeSettingValue({ target: { value } }, "buy_pooled_sol_size"); // Pass value directly without default
    setSelectedSOLSize(value);
  };
  const handleChangeTOKEN = (value: string) => {
    onChangeSettingValue({ target: { value } }, "buy_pooled_token"); // Pass value directly without default
    setSelectedTokenPercent(value);
  };
  const handleChange24Hchange = (value: string) => {
    onChangeSettingValue({ target: { value } }, "buy_24h_change"); // Pass value directly without default
    setSelectedPriceChange(value);
  };
  // Filtering Logic
  const filterPools = () => {
    let newFilteredPools = dummyPools;

    // Filter by Pool Size (SOL)
    if (selectedSOLSize) {
      const [minSOL, maxSOL] = selectedSOLSize.split("-").map(Number);
      newFilteredPools = newFilteredPools.filter((pool) => {
        const { pooled_sol } = pool.pending_pool;
        return (
          pooled_sol >= minSOL &&
          (maxSOL === 1000 ? pooled_sol <= Infinity : pooled_sol < maxSOL)
        );
      });
    }

    // Filter by Pool Size (TOKEN)
    if (selectedTokenPercent) {
      const [minPercent, maxPercent] = selectedTokenPercent
        .split("%")
        .map((val, index) => (index === 0 ? Number(val) : Number(val) / 100));
      newFilteredPools = newFilteredPools.filter((pool) => {
        const { pooled_token_percent } = pool.pending_pool;
        return (
          pooled_token_percent >= minPercent &&
          pooled_token_percent < maxPercent
        );
      });
    }

    // Filter by 24H Change
    if (selectedPriceChange) {
      const [minChange, maxChange] = selectedPriceChange.split("%").map(Number);
      newFilteredPools = newFilteredPools.filter((pool) => {
        const { price_24h } = pool.pending_pool;
        return (
          price_24h >= minChange &&
          (maxChange === 1000 ? price_24h <= Infinity : price_24h < maxChange)
        );
      });
    }

    setFilteredPools(newFilteredPools);
  };

  useEffect(() => {
    filterPools();
  }, [selectedSOLSize, selectedTokenPercent, selectedPriceChange]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [showPopup, setShowPopup] = useState(false);
  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };
  console.log(filteredPools);
  console.log(pendingPools);
  return (
    <>
      {publicKey ? (
        <div className="z-[1] h-full flex flex-col">
          {/* div for the confirm Dialog  */}
          <div>
            <ConfirmDialog
              title="Cancel Trade"
              open={confirmDelete}
              onClose={() => setConfirmDelete(false)}
              onConfirm={cancelPool}
            >
              Are you sure you want to cancel this pool?
            </ConfirmDialog>
          </div>
          {/* div for the confirm Dialog  */}
          <div>
            <ConfirmDialog
              title="Buy Trade"
              open={confirmBuy}
              onClose={() => setConfirmBuy(false)}
              onConfirm={buyPool}
            >
              Are you sure you want to buy this pool?
            </ConfirmDialog>
          </div>
          {/* div for the info sections  */}
          <div className="mx-4 mt-10 z-10">
            <h1 className="text-lg font-bold text-white uppercase">
              PENDING POOL
            </h1>
            <p className="text-sm font-bold text-white mt-2 opacity-[0.57]">
              Scanning tokens from the Solana blockchain based on your settings
              and preferences.
            </p>
            {/* div for the filter section which shows above screen size xl  */}
            <div className="hidden flex justify-between items-center mt-6  2xl:block 2xl:flex 2xl:justify-between 2xl:items-center">
              {/* Filter section with POL size and token*/}
              <div className="flex gap-5">
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[14px] font-bold text-[#FFFFFF]">
                    Pool Size (SOL):
                  </p>
                  <CustomDroplist
                    options={[
                      "1-1000",
                      "10-1000",
                      "50-1000",
                      "100-1000",
                      "1000+",
                    ]}
                    value={settingInfo?.buy_pooled_sol_size || "1-1000"}
                    onChange={handleChangeSOL}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[14px] font-bold text-[#FFFFFF]">
                    Pool Size (TOKEN):
                  </p>
                  <CustomDroplist
                    options={[
                      "<5%",
                      "5%-100%",
                      "10%-100%",
                      "25%-100%",
                      "50%-100%",
                      "75%-100%",
                    ]}
                    value={settingInfo?.buy_pooled_token || "<5%"}
                    onChange={handleChangeTOKEN}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[14px] font-bold text-[#FFFFFF]">
                    24H Change :
                  </p>
                  <CustomDroplist
                    options={[
                      "<100%",
                      "100%-1000%",
                      "500%-10,000%",
                      "1000%-10,000%",
                      "5000%-10,000%",
                      "10,000%+",
                    ]}
                    value={settingInfo?.buy_24h_change || "<100%"}
                    onChange={handleChange24Hchange}
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[14px] font-bold text-[#FFFFFF]">
                    Scam Audits
                  </p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settingInfo?.buy_lp_burned_audit === 1}
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
              </div>
              {/* Quick Buy section  */}
              <div>
                <div className="flex items-center gap-2">
                  {/* <div className="relative">
                    <div
                      className="border rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 cursor-pointer mr-6"
                      // onClick={handleButtonClick}
                    >
                      <Image
                        src={IMG_FILTER}
                        alt="Filter"
                        className="w-[16px] h-[16px]"
                      />
                      <span className="text-white font-bold text-[13px]">
                        Filter
                      </span>
                      <Image
                        src={IMG_DROPDOWN}
                        alt="Dropdown"
                        className="mt-1 w-[10px] h-[10px]"
                      />
                    </div>
                  </div> */}

                  <div className="flex items-center">
                    <div className="text-white text-[14px] text-bold mr-2">
                      Quick Buy :
                    </div>
                    {/* <div
                      className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-[150px] h-[34px] gap-1
                    rounded-[20px] items-center px-1"
                    >
                      <div className="flex items-center gap-1 px-2 w-fit">
                        <Image
                          src={IMG_SOL}
                          width={25}
                          height={25}
                          alt="image"
                        />
                      </div>
                      <div className="h-6 w-[2px] bg-[#404040]"></div>

                      <div className="w-full px-1">
                        <input
                          type="number"
                          className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none p-1.5 w-full"
                          step="0.1"
                          min="0"
                          value={quick_buy_amount}
                          onChange={(e) =>
                            setQuickBuyAmount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </div> */}
                    <QuickBuyAmountDropDown
                      options={["0.1", "0.2", "0.3"]}
                      value={quick_buy_amount}
                      onChange={setQuickBuyAmount}
                    />
                  </div>
                  <div
                    className=" cursor-pointer rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 mt-4 sm:mt-0 sm:ml-4"
                    style={{
                      background:
                        "linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)",
                    }}
                  >
                    <span className="text-white text-[14px] font-bold">
                      Buy Custome token +
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* div for the mobile view  */}
            <div className="block 2xl:hidden">
              <div className="flex flex-col md:flex-row xss:flex-col justify-between mt-3 gap-3">
                <div
                  onClick={toggleModal}
                  className="border w-full md:w-[300px] cursor-pointer rounded-[12px] flex xss:w-[100px] justify-center px-2 items-center py-1 bg-[#202020]"
                >
                  <Image
                    src={IMG_SETTING}
                    alt=""
                    className="max-w-[24px] max-h-[17px]"
                  />
                  <span className="text-white text-[12px] font-bold">
                    Filters
                  </span>
                </div>
                <div>
                  {/* Quick Buy section  */}
                  <div>
                    <div className="flex items-center justify-between gap-2 ">
                      {/* <div className="relative">
                  <div
                    className="border rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 cursor-pointer mr-6"
                  // onClick={handleButtonClick}
                  >
                    <Image
                      src={IMG_FILTER}
                      alt="Filter"
                      className="w-[16px] h-[16px]"
                    />
                    <span className="text-white font-bold text-[13px]">Filter</span>
                    <Image
                      src={IMG_DROPDOWN}
                      alt="Dropdown"
                      className="mt-1 w-[10px] h-[10px]"
                    />
                  </div>
                </div> */}

                      <div className="flex items-center">
                        <div className="text-white text-[14px] text-bold mr-2">
                          Quick Buy :
                        </div>
                        {/* <div
                      className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-[150px] h-[34px] gap-1
                    rounded-[20px] items-center px-1"
                    >
                      <div className="flex items-center gap-1 px-2 w-fit">
                        <Image
                          src={IMG_SOL}
                          width={25}
                          height={25}
                          alt="image"
                        />
                      </div>
                      <div className="h-6 w-[2px] bg-[#404040]"></div>

                      <div className="w-full px-1">
                        <input
                          type="number"
                          className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none p-1.5 w-full"
                          step="0.1"
                          min="0"
                          value={quick_buy_amount}
                          onChange={(e) =>
                            setQuickBuyAmount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </div> */}
                        <QuickBuyAmountDropDown
                          options={["0.1", "0.2", "0.3"]}
                          value={quick_buy_amount}
                          onChange={setQuickBuyAmount}
                        />
                      </div>
                      <div
                        className=" cursor-pointer rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 "
                        style={{
                          background:
                            "linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)",
                        }}
                        onClick={togglePopUp}
                      >
                        <span className="text-white text-[14px] font-bold">
                          Buy Custome token +
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* div for the table  */}
          <div className="overflow-auto mt-5 mx-4  flex-1 custom-scrollbar relative h-full  ">
            {/* z-40 overflow-auto min-w-[1200px] custom-scrollbar */}
            {/* style={{ overflowX: "auto", overflowY: "hidden" }}
            <div className="overflow-x-auto max-h-screen"> */}
            {/* commentng for filteriing  */}
            <Table
              aria-label="Pending Pools"
              color="primary"
              isStriped
              removeWrapper
              classNames={classNames}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    className="text-[#858686] leading-3
                      border-t border-[#515151] text-left
                      bg-[#121212] h-[45px] text-[13px] font-bold"
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>

              <TableBody items={pendingPools}>
                {(item: any) => (
                  <TableRow
                    key={item.id}
                    className={`leading-6 cursor-pointer h-[70px]
                      ${row_index++ % 2 == 0 ? "bg-[#141414]" : "bg-[#0F0F0F]"}
                      `}
                  >
                    {(columnKey) => (
                      <TableCell
                        className="text-white text-[13px] font-bold
                          uppercase gap-1 text-left"
                      >
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* add table for checkng  */}
            {/* </div> */}
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)",
                backgroundBlendMode: "lighten",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)",
                  backgroundBlendMode: "lighten",
                  backdropFilter: "blur(10px)",
                }}
                className="text-white items-center rounded-[16px] sm:rounded-[30] p-6 sm:p-8 w-full max-w-[600px] sm:max-w-[90%] md:max-w-[600px] h-auto text-center"
              >
                {/* div for the filetrs section  */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[14px] font-bold text-[#FFFFFF]">
                      Pool Size (SOL):
                    </p>
                    <CustomDroplist
                      options={[
                        "1-1000",
                        "10-1000",
                        "50-1000",
                        "100-1000",
                        "1000+",
                      ]}
                      value={settingInfo?.buy_pooled_sol_size || "1-1000"}
                      onChange={handleChangeSOL}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[14px] font-bold text-[#FFFFFF]">
                      Pool Size (TOKEN):
                    </p>
                    <CustomDroplist
                      options={[
                        "<5%",
                        "5%-100%",
                        "10%-100%",
                        "25%-100%",
                        "50%-100%",
                        "75%-100%",
                      ]}
                      value={settingInfo?.buy_pooled_token || "<5%"}
                      onChange={handleChangeTOKEN}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[14px] font-bold text-[#FFFFFF]">
                      24H Change :
                    </p>
                    <CustomDroplist
                      options={[
                        "<100%",
                        "100%-1000%",
                        "500%-10,000%",
                        "1000%-10,000%",
                        "5000%-10,000%",
                        "10,000%+",
                      ]}
                      value={settingInfo?.buy_24h_change || "<100%"}
                      onChange={handleChange24Hchange}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[14px] font-bold text-[#FFFFFF]">
                      Scam Audits
                    </p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settingInfo?.buy_lp_burned_audit === 1}
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
                </div>
                {/* Your filter options go here buttons start from here*/}
                <div className="flex flex-row justify-between">
                  <button
                    onClick={toggleModal}
                    className="mt-4 px-4 py-2 bg-transparent text-white rounded-xl border-1 border-white"
                  >
                    Clear filter
                  </button>
                  <button
                    onClick={toggleModal}
                    style={{
                      background:
                        "linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)",
                    }}
                    className="mt-4 px-5 py-2 text-white rounded-xl"
                  >
                    Apply filter
                  </button>
                </div>
              </div>
            </div>
          )}
          {showPopup && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)",
                backgroundBlendMode: "lighten",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(202, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)",
                  backgroundBlendMode: "lighten",
                  backdropFilter: "blur(10px)",
                }}
                className="relative text-white items-center rounded-[16px] sm:rounded-[30] p-6 sm:p-8 w-full max-w-[600px] sm:max-w-[90%] md:max-w-[600px] h-auto text-center"
              >
                {/* close button  */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white absolute left-[95%] top-[10px]"
                >
                  X
                </button>

                <div className="flex flex-col justify-center items-center gap-4">
                  <p className="text-[18px] text-bold">
                    Insert Smart Contract Address
                  </p>
                  <div className="w-full px-1">
                    <input
                      type="text"
                      className=" text-white text-[14px] bg-[#0F0F0F] border  border-[#7A7A7A] p-3 w-full  rounded-[8px]"
                      value="Insert address here"
                    />
                  </div>
                  <button className=" bg-[#2B2B2B] rounded-[12px] py-[6px] mt-4 px-[24px] text-[#FFFFFF] mr-2 hover:bg-gradient-to-r hover:from-[#7C03A7] hover:to-[#18C5D0]">
                    Quick Buy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : //<ConnectComponent />
      null}
    </>
  );
};

export default PendingPools;
