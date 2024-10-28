/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection } from "@nextui-org/table";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import Link from "next/link";
import { getDiffTimeInFormat } from "@/utils/time";
import { coloriseValue } from "@/utils/number";
import { Button } from "@nextui-org/react";

import Image from "next/image";

import IMG_SETTING from '@/assets/images/setting.svg';
import IMG_SOL from '@/assets/images/sol.png';
import IMG_SOLA from '@/assets/images/man.png';
import IMG_SOLAA from '@/assets/images/approved.png';
import IMG_CHECK from '@/assets/images/check.png';
import IMG_CROSS from '@/assets/images/cross.png';
import IMG_EAGLE from '@/assets/images/eagle.png';
import IMG_Copy from '@/assets/images/copy.svg';
import { useWallet } from "@solana/wallet-adapter-react";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";
import ConnectComponent from "@/components/wallet/connect";
import { useRouter } from "next/router";
const pendingPoolss = [
  {
    id: 1,
    pair: "WIF",
    created: "16 days",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 5,
    pooledToken: "10%",
    change24H: "+30%",
    lpBurned: "Burned",
    status: "Buying!",
    action: "Cancel"
  },
  {
    id: 2,
    pair: "WIF",
    created: "21 h",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 50,
    pooledToken: "10%",
    change24H: "-10%",
    lpBurned: "Burned",
    status: "Waiting...",
    action: "Cancel"
  },
  {
    id: 3,
    pair: "WIF",
    created: "3 min",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 5,
    pooledToken: "10%",
    change24H: "-30%",
    lpBurned: "Burned",
    status: "Buying!",
    action: "Cancel"
  },
  {
    id: 4,
    pair: "WIF",
    created: "16 days",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 50,
    pooledToken: "10%",
    change24H: "+30%",
    lpBurned: "Burned",
    status: "Buying!",
    action: "Cancel"
  },
  {
    id: 5,
    pair: "WIF",
    created: "16 days",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 5,
    pooledToken: "10%",
    change24H: "-30%",
    lpBurned: "Not burned",
    status: "Buying!",
    action: "Cancel"
  },
  {
    id: 6,
    pair: "WIF",
    created: "16 days",
    contractAudit: ["FAD", "MAD", "Value Check"],
    pooledSOL: 5,
    pooledToken: "10%",
    change24H: "-30%",
    lpBurned: "Not burned",
    status: "Waiting...",
    action: "Cancel"
  },
  // Add more pools here as needed
];
const PendingPools = () => {
  const router = useRouter();
  const [pendingPools, setPendingPools] = useState([]);
  const [setting, setSetting]: any = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedPoolID, setSelectedPoolID] = useState(0);
  const [confirmBuy, setConfirmBuy] = useState(false);
  const [selectedBuyPoolID, setSelectedBuyPoolID] = useState(0);
  const [quick_buy_amount, setQuickBuyAmount] = useState(0.1);

  const [checkedLogin, setCheckedLogin] = useState(false);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");

  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }

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
      label: ""
    }
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
  }

  const onCancelPendingPool = async (pool_id: number) => {
    setSelectedPoolID(pool_id);
    setConfirmDelete(true);
  }

  const buyPool = async () => {

  }

  const onQuickBuyPendingPool = async (pool_id: number) => {
    setSelectedBuyPoolID(pool_id);
    setConfirmBuy(true);
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

  }, [publicKey]);

  const renderCell = (pending_pool: any, columnKey: any) => {
    const cellValue = pending_pool[columnKey];
    const pubKeySlug = bbt_public_key ? `?maker=${bbt_public_key}` : '';
    const pool_url = `${pending_pool.pending_pool.pool_url}${pubKeySlug}`;

    switch (columnKey) {
      case "pool_name":
        return (
          <>
            <Link target="_blank" href={pool_url}>
              <div className="flex items-center gap-2">
                <img src={pending_pool.pending_pool.token_logo_url} alt="" width="24" className="rounded-full" />
                {pending_pool.pending_pool.pool_name}
              </div>
            </Link>
          </>
        );
      case "time_live":
        return (
          <>
            {getDiffTimeInFormat(pending_pool.pending_pool.pool_open_time)}
          </>
        );

      case "price_24h":
        return (
          <>
            {
              coloriseValue(
                pending_pool.pending_pool.price_24h.toFixed(2) + '%',
                pending_pool.pending_pool.price_24h,
              )
            }
          </>
        );
      case "lp_burned":
        return (
          <>
            {
              pending_pool.pending_pool.lp_burned_percent > 95
                ?
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[#FFFFFF]">
                    Burned
                  </p>
                  <Image src={IMG_CHECK} alt="" className="w-[12px] h-[12px]" />
                </div>
                :
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[#FFFFFF]">
                    Not burned
                  </p>
                  <Image src={IMG_CROSS} alt="" className="w-[12px] h-[12px]" />
                </div>
            }
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
                <Image src={IMG_EAGLE} alt="" width={19} height={24} className="w-[19px] h-[24px]" />
              </Link>
              <Button
                size="sm"
                color="success"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF] mr-2"
                onClick={() => onQuickBuyPendingPool(pending_pool.id)}
              >Quick Buy</Button>
              <Button
                size="sm"
                color="danger"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF]"
                onClick={() => onCancelPendingPool(pending_pool.id)}
              >Cancel</Button>
            </div>
          </>
        );
      case "status":
        return (
          <>
            {
              pending_pool.status === 0 ?
                <p className="font-bold text-[#D9A900]">
                  Waiting...
                </p>
                :
                <p className="font-bold text-[#17C654]">
                  Buying!
                </p>
            }
          </>
        );
      case "audit":
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Can Freeze</p>

                <Image
                  src={pending_pool.pending_pool.can_freeze ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Can Mint</p>
                <Image
                  src={pending_pool.pending_pool.can_mint ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Whale Check</p>

                <Image
                  src={pending_pool.pending_pool.top_10_percent > setting.buy_whale_check_percent ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>
            </div>
          </>
        )
      default:
        return cellValue;
    }
  };

  const classNames = React.useMemo(
    () => ({
      th: ["text-default-500", "border-b", "border-divider", "text-center"],
      td: ["text-center", "py-3"],
    }),
    [],
  );

  let row_index = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* {publicKey ? */}
      <div className="z-[1] h-full flex flex-col">
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

        <div className="mx-4 mt-10 z-10">
          <h1 className="text-lg font-bold text-white uppercase" >
            PENDING POOL
          </h1>

          <p className="text-sm font-bold text-white mt-2 opacity-[0.57]">
            Scanning tokens from the Solana blockchain based on your settings and preferences.
          </p>

          <div className="hidden xl:flex flex-col md:flex-row justify-between items-center mt-6">
            <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 xs:hidden">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex flex-row items-center">
                  <div className="text-white text-[12px] font-bold ">Pool Size (SOL):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="1-1000" className="bg-black text-white">1-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">10-1000</option>
                      <option value="1-1000" className="bg-black text-white">50-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">100-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">1000+</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row items-center mt-2 sm:mt-0">
                  <div className="text-white text-[12px] font-bold">Pool Size (Token):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="<5%" className="bg-black text-white">&lt;5%</option>

                      <option value="1000-2000" className="bg-black text-white">5%-10%</option>
                      <option value="1000-2000" className="bg-black text-white">10%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">25%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">50%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">75%-100%</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row items-center mt-2 sm:mt-0">
                  <div className="text-white text-[12px] font-bold">24H Change:</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="<5%" className="bg-black text-white">&lt;100%</option>

                      <option value="1000-2000" className="bg-black text-white">100%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">500%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">1000%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">5000%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">10000% +</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row items-center mt-2 sm:mt-0">
                  <div className="text-white text-[12px] font-bold">Pool Size (SOL):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="1-1000" className="bg-black text-white">5 min</option>
                      <option value="1000-2000" className="bg-black text-white">10 min</option>
                      <option value="1000-2000" className="bg-black text-white">30 min</option>
                      <option value="1000-2000" className="bg-black text-white">1 hr</option>
                    </select>
                  </div>
                </div>
                <div className="h-[19px] justify-start items-center gap-2.5 inline-flex">
                  <div className="text-right text-white text-[12px] font-bold ">Scam Audits</div>
                  <div className="w-[31px] h-4 relative">
                    <div className="w-7 h-2.5 left-0 top-[3px] absolute bg-[#17c654] rounded" />
                    <div className="w-4 h-4 left-[15px] top-0 absolute bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-0">
              <div className="text-white text-[14px] text-bold mr-2">Quick Buy:</div>
              <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[60px] h-[30px] gap-1 rounded-[20px] items-center px-1 mt-2 sm:mt-0">

                <div className="w-[20px] px-1">
                  <input
                    type="text"
                    className="text-white text-[14px] bg-transparent border-none outline-none hover:border-none p-1.5 w-[50px]"
                    value="0"
                    onChange={(e) => setQuickBuyAmount(parseFloat(e.target.value))}
                  />

                </div>
                <div className="h-6 w-[2px] bg-[#404040]"></div>

                <div className="flex items-center  px-1 ">
                  <Image src={IMG_SOL} width={25} height={25} alt="image" />
                </div>
              </div>
              <div
                className=" cursor-pointer rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 mt-4 sm:mt-0 sm:ml-4"
                style={{ background: 'linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)' }}
              >
                <span className="text-white text-[14px] font-bold">Buy Custome token +</span>
              </div>
            </div>
          </div>

          <div className="block xl:hidden">
            <div className="flex flex-row xss:flex-col justify-between mt-3">
              <div onClick={toggleModal}
                className="border cursor-pointer rounded-[48px] flex xss:w-[100px] justify-between px-2 items-center py-1"
              >
                <Image src={IMG_SETTING} alt="" className="w-[24px] h-[17px]" />
                <span className="text-white text-[12px] font-bold">Filter</span>
              </div>
              <div >

                <div className="flex flex-row  justify-between gap-3">
                  <div className="text-white text-[12px] font-bold  mt-1">Quick Buy:</div>
                  <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex w-[90px] h-[30px] gap-1 rounded-[20px] items-center px-1">
                    <input
                      type="number"
                      className="text-white text-[14px] bg-transparent border-none outline-none p-1.5 w-[50px]"
                      step="0.1"
                      min="0"
                      value={quick_buy_amount}
                      onChange={(e) => setQuickBuyAmount(parseFloat(e.target.value))}
                    />
                    <div className="h-6 w-[2px] bg-[#404040]"></div>
                    <div className="flex items-center px-1">
                      <Image src={IMG_SOL} width={25} height={25} alt="image" />
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-[48px] flex justify-center gap-2 items-center w-[150px] px-3 py-1.5"
                    style={{ background: 'linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)' }}
                  >
                    <span className="text-white text-[12px] font-bold">Buy Custom Token +</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-5 mx-4 h-full flex-1 relative z-40 w-full">
          <div className="w-full overflow-x-auto custom-scrollbar"> {/* Added overflow-x-auto here */}
            <Table
              aria-label="Pending Pools"
              color="primary"
              isStriped
              removeWrapper
              classNames={classNames}
              style={{ minWidth: "1000px" }}  // Set a minimum width for the table
            >
              
              <TableHeader>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Pair
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Created
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Contract Audit
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Pooled SOL
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Pooled Token
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  24H Change (%)
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  LP Burned
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Status
                </TableColumn>
                <TableColumn
                  className="text-[#858686] leading-3 border-t border-[#515151] pl-[100px] text-start bg-[#121212] h-[45px] text-[13px] font-bold"
                >
                  Action
                </TableColumn>
              </TableHeader>


              
              <TableBody items={pendingPoolss}>
                {pendingPoolss.map((item, row_index) => (
                  <TableRow
                    key={item.id}
                    className={`leading-6 cursor-pointer w-full h-[70px] ${row_index % 2 === 0 ? "bg-[#141414]" : "bg-[#0F0F0F]"
                      }`}
                  >
                    <TableCell className="text-white text-[13px] w-[80px] font-bold uppercase gap-1 text-left flex flex-row mt-3">
                      <Image src={IMG_SOLA} width={25} height={25} alt="image" />
                      {item.pair}
                    </TableCell>
                    <TableCell className="text-white text-[13px] w-[60px] font-bold uppercase gap-1 text-left">
                      <p className="w-[60px]">
                        {item.created}

                      </p>
                    </TableCell>
                    <TableCell className="text-white text-[13px] w-[250px] font-bold uppercase gap-1 text-left mt-3 ">
                      <div className="flex flex-row gap-1 w-[250px]">

                        {item.contractAudit.map((audit, index) => (
                          <span key={index} className="flex flex-row ">
                            {audit}
                            <div className="w-[15px] h-[15px] mt-2 ml-1">
                              <Image src={IMG_CHECK} alt="image" />

                            </div>
                          </span>
                        ))}
                      </div>

                    </TableCell>
                    <TableCell className="text-white text-[13px] w-[80px] font-bold uppercase gap-1 text-left flex flex-row mt-3">
                      <Image src={IMG_SOL} width={25} height={25} alt="image" />
                      {item.pooledSOL}
                    </TableCell>
                    <TableCell className="text-white text-[13px] w-[80px] font-bold uppercase gap-1 text-left">
                      {item.pooledToken}
                    </TableCell>
                    <TableCell
                      className={`text-[13px] w-[80px] font-bold uppercase gap-1 text-left ${parseFloat(item.change24H) < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                    >
                      {item.change24H}
                    </TableCell>

                    <TableCell className="text-white text-[13px] w-[160px] font-bold gap-1 text-left">
                      <div className="flex flex-row">
                        <span className="flex flex-row">
                          {item.lpBurned}
                          <div className="w-[15px] h-[15px] mt-2 ml-1">
                            <Image
                              src={item.lpBurned === 'Not burned' ? IMG_CROSS : IMG_CHECK}
                              alt="status image"
                            />
                          </div>
                        </span>
                      </div>
                    </TableCell>

                    <TableCell
                      className={`w-[180px] text-[13px] font-bold uppercase gap-1 text-left ${item.status === 'Waiting...' ? 'text-[#D9A900]' : 'text-green-500'
                        }`}
                    >
                      {item.status}
                    </TableCell>

                    <TableCell className="text-white w-[480px] text-[13px] font-bold uppercase gap-4  flex  text-center  flex-row">
                      {/* Quick Buy Button */}
                      <Image src={IMG_EAGLE} width={20} height={15} alt="image" />
                      <button
  className="bg-[#2B2B2B] text-white py-1 px-3 rounded-full text-sm font-bold mr-2 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#7C03A7] hover:to-[#18C5D0]"
>
  Quick Buy
</button>


                      {/* Cancel Button */}
                      <button
                        className="border-1 border-gray-300 text-white py-1 px-3 rounded-full text-sm font-bold"
                      >
                        Cancel
                      </button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
              {/* </TableBody> */}
            </Table>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 fixed inset-0" onClick={toggleModal}></div>
            <div className="bg-gray-800 rounded-lg p-4 z-10">
              <div className="w-[300px] items-center gap-1">
                <div className="flex flex-row justify-between  items-center my-2">
                  <div className="text-white text-[12px] font-bold ">Pool Size (SOL):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="1-1000" className="bg-black text-white">1-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">10-1000</option>
                      <option value="1-1000" className="bg-black text-white">50-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">100-1,000</option>
                      <option value="1000-2000" className="bg-black text-white">1000+</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-2 sm:mt-0 my-2">
                  <div className="text-white text-[12px] font-bold">Pool Size (Token):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="<5%" className="bg-black text-white">&lt;5%</option>

                      <option value="1000-2000" className="bg-black text-white">5%-10%</option>
                      <option value="1000-2000" className="bg-black text-white">10%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">25%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">50%-100%</option>
                      <option value="1000-2000" className="bg-black text-white">75%-100%</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-2 sm:mt-0 my-2">
                  <div className="text-white text-[12px] font-bold">24H Change:</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="<5%" className="bg-black text-white">&lt;100%</option>

                      <option value="1000-2000" className="bg-black text-white">100%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">500%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">1000%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">5000%-10000%</option>
                      <option value="1000-2000" className="bg-black text-white">10000% +</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-2 sm:mt-0 my-2">
                  <div className="text-white text-[12px] font-bold">Pool Size (SOL):</div>
                  <div className="w-[90px] px-1">
                    <select className="text-white w-[80px] text-[14px] bg-transparent border-gray-400 border-1 rounded-xl p-1">
                      <option value="1-1000" className="bg-black text-white">5 min</option>
                      <option value="1000-2000" className="bg-black text-white">10 min</option>
                      <option value="1000-2000" className="bg-black text-white">30 min</option>
                      <option value="1000-2000" className="bg-black text-white">1 hr</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center text-center my-2">
                  <span className="text-[12px] font-medium text-white dark:text-gray-300">
                    Scam Audits
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only peer ml-2"

                  />
                  <div
                    className="relative w-9 h-3 bg-gray-200 rounded-[14px] peer dark:bg-gray-700  ml-1
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
    after:absolute after:-top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
    peer-checked:bg-[#28DEAF]"
                  ></div>
                </div>
              </div>
              {/* Your filter options go here */}
              <div className="flex flex-row justify-between">
                <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-transparent text-white rounded-xl border-1 border-white">
                  Clear filter
                </button>
                <button onClick={toggleModal} style={{ background: 'linear-gradient(92.1deg, #7C03A7 -2.85%, #18C5D0 97.86%)' }} className="mt-4 px-5 py-2 text-white rounded-xl">
                  Apply filter
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
      {/* :
        //<ConnectComponent />
        null
      } */}
    </>
  );
};

export default PendingPools;