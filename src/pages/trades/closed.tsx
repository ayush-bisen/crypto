import apiService from "@/helpers/apiService";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from "@nextui-org/table";
import { apiRoutes } from "@/helpers/apiSlugs";
import { coloriseValue, getReadableSmallNumber } from "@/utils/number";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import IMG_SETTING from "@/assets/images/setting.svg";
import IMG_SOL from "@/assets/images/sol.png";
import IMG_OPENING from "@/assets/images/opening.png";
import IMG_EAGLE from "@/assets/images/eagle.png";
import IMG_CLOSE from "@/assets/images/close.png";
import { getDiffTimeInFormat } from "@/utils/time";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectComponent from "@/components/wallet/connect";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ClosedPools = () => {
  const router = useRouter();

  const [closedPools, setClosedPools] = useState<ClosedPool[]>([]);
  const [selectedTradeID, setSelectedTradeID] = useState(0);
  const [confirmDeleteClosedTrade, setConfirmDeleteClosedTrade] =
    useState(false);
  const [checkedLogin, setCheckedLogin] = useState(false);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");

  //dummy data
  interface ClosedPool {
    id: number;
    lp_name: string;
    createdAt: string; // You can change this to Date if needed.
    invested_sol: number;
    sold_sol: number;
    roi: number;
    pnl: number;
    token_logo_url: string;
    pool_name: string;
    pool_url: string;
    buy_tx_id: string;
    sell_tx_id: string;
    buy_price_usd: number;
    sell_price_usd: number;
    quantity: number;
  }

  useEffect(() => {
    // Replace this with a call to load your real data
    const dummyClosedPools = [
      {
        id: 1,
        lp_name: "SOL/USDC",
        createdAt: "2024-09-29T10:00:00Z",
        invested_sol: 10.5,
        sold_sol: 12.0,
        roi: 14.29,
        pnl: 1.5,
        token_logo_url: "https://example.com/sol-logo.png",
        pool_name: "Solana USDC Pool",
        pool_url: "https://example.com/sol-usdc-pool",
        buy_tx_id: "buyTx123456",
        sell_tx_id: "sellTx123456",
        buy_price_usd: 20.0,
        sell_price_usd: 22.5,
        quantity: 5,
      },
      {
        id: 2,
        lp_name: "SOL/ETH",
        createdAt: "2024-09-28T12:00:00Z",
        invested_sol: 5.0,
        sold_sol: 7.5,
        roi: 50.0,
        pnl: 2.5,
        token_logo_url: "https://example.com/eth-logo.png",
        pool_name: "Solana ETH Pool",
        pool_url: "https://example.com/sol-eth-pool",
        buy_tx_id: "buyTx654321",
        sell_tx_id: "sellTx654321",
        buy_price_usd: 1500.0,
        sell_price_usd: 2000.0,
        quantity: 3,
      },
      {
        id: 3,
        lp_name: "SOL/BTC",
        createdAt: "2024-09-27T14:30:00Z",
        invested_sol: 8.0,
        sold_sol: 10.0,
        roi: 25.0,
        pnl: 2.0,
        token_logo_url: "https://example.com/btc-logo.png",
        pool_name: "Solana BTC Pool",
        pool_url: "https://example.com/sol-btc-pool",
        buy_tx_id: "buyTx112233",
        sell_tx_id: "sellTx112233",
        buy_price_usd: 30000.0,
        sell_price_usd: 37500.0,
        quantity: 2,
      },
    ];

    setClosedPools(dummyClosedPools);
  }, []);

  const closed_pnl = closedPools
    ? parseFloat(
        closedPools
          .reduce((initial, closed_pool: any) => {
            const pnl = closed_pool.sold_sol - closed_pool.invested_sol;
            return initial + pnl;
          }, 0)
          .toFixed(9)
      )
    : 0;

  const total_invested = closedPools
    ? parseFloat(
        closedPools
          .reduce((initial, closed_pool: any) => {
            const invested_sol = closed_pool.invested_sol;
            return initial + invested_sol;
          }, 0)
          .toFixed(9)
      )
    : 0;

  const total_sold = closedPools
    ? parseFloat(
        closedPools
          .reduce((initial, closed_pool: any) => {
            const sold_sol = parseFloat(closed_pool.sold_sol);
            return initial + sold_sol;
          }, 0)
          .toFixed(9)
      )
    : 0;

  let token: any = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  const columns = [
    {
      key: "lp_name",
      label: "Pair LP",
    },
    {
      key: "time",
      label: "Created",
    },

    {
      key: "invested_sol",
      label: "Invested",
    },
    {
      key: "sold_sol",
      label: "Sold",
    },
    {
      key: "roi",
      label: "ROI",
    },
    {
      key: "pnl",
      label: "PNL",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const loadClosedPools = async () => {
    const response = await apiService.get(
      apiRoutes.closed_pools.list,
      publicKey
    );

    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }

    if (response === 401) {
      // await router.push('');
      return;
    }

    if (response.closed_pools) {
      setClosedPools(response.closed_pools);
    }

    setBBTPublicKey(response.bbt_public_key);
  };

  const deleteClosedTrade = async () => {
    const delete_url = `${apiRoutes.closed_pools.delete}${selectedTradeID}`;
    await apiService.delete(delete_url, publicKey).then((response) => {
      if (response.error) {
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

      loadClosedPools();
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

  const onDeleClosedTrade = async (trade_id: number) => {
    setSelectedTradeID(trade_id);
    setConfirmDeleteClosedTrade(true);
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
    publicKeyRef.current = publicKey!;
    if (publicKey) {
      loadClosedPools();
      const intervalId = setInterval(loadClosedPools, 5000);
      return () => clearInterval(intervalId);
    } else {
      if (checkedLogin) {
        // router.push('/');
      }
    }
  }, [publicKey]);

  const renderCell = (closed_pool: any, columnKey: any) => {
    const cellValue = closed_pool[columnKey];
    const pubKeySlug = bbt_public_key ? `?maker=${bbt_public_key}` : "";
    const pool_url = `${closed_pool.pool_url}${pubKeySlug}`;
    const buy_tx_url = `https://solscan.io/tx/${closed_pool.buy_tx_id}`;
    const sell_tx_url = `https://solscan.io/tx/${closed_pool.sell_tx_id}`;

    switch (columnKey) {
      case "lp_name":
        return (
          <>
            <Link target="_blank" href={pool_url}>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <img
                  src={closed_pool.token_logo_url}
                  alt=""
                  width="24"
                  className="rounded-full"
                />
                {closed_pool.pool_name}
              </div>
            </Link>
          </>
        );
      case "time":
        return <>{getDiffTimeInFormat(closed_pool.createdAt)}</>;
      case "price":
        return (
          <>
            <span className="text-positive !font-bold mr-1">B:</span>$
            {getReadableSmallNumber(closed_pool.buy_price_usd)}
            <br />
            <span className="text-negative !font-bold mr-1">S:</span>$
            {getReadableSmallNumber(closed_pool.sell_price_usd)}
          </>
        );
      case "quantity":
        return <>{closed_pool.quantity.toFixed(4)}</>;
      case "invested_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {getReadableSmallNumber(closed_pool.invested_sol)}
            </div>
          </>
        );
      case "sold_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {getReadableSmallNumber(parseFloat(closed_pool.sold_sol))}
            </div>
          </>
        );
      case "roi":
        return (
          <>
            {coloriseValue(
              closed_pool.roi.toFixed(2) + "%",
              closed_pool.roi.toFixed(2)
            )}
          </>
        );
      case "pnl":
        return (
          <>
            {coloriseValue(
              closed_pool.pnl.toFixed(2) + "$",
              closed_pool.pnl.toFixed(2)
            )}
          </>
        );
      case "action":
        return (
          <>
            <div className="flex justify-center items-center w-[200px]">
              <div className="flex items-center mr-4">
                <Link target="_blank" href={buy_tx_url}>
                  <div className="tooltip">
                    <Image
                      src={IMG_OPENING}
                      alt=""
                      width={19}
                      height={19}
                      className="w-[19px] h-[19px] mr-4"
                    />
                    <span className="tooltiptext">Buy TX</span>
                  </div>
                </Link>
                <Link target="_blank" href={sell_tx_url}>
                  <div className="tooltip">
                    <Image
                      src={IMG_OPENING}
                      alt=""
                      width={19}
                      height={19}
                      className="w-[19px] h-[19px] mr-4"
                    />
                    <span className="tooltiptext bg-gray-900">Sell TX</span>
                  </div>
                </Link>
                <Link target="_blank" href={pool_url}>
                  <Image
                    src={IMG_EAGLE}
                    alt=""
                    width={19}
                    height={24}
                    className="w-[19px] h-[24px]"
                  />
                </Link>
              </div>

              <div>
                <Image
                  src={IMG_CLOSE}
                  alt=""
                  width={19}
                  height={19}
                  className="w-[24px] h-[19px] ml-[-4px]"
                  onClick={() => onDeleClosedTrade(closed_pool.id)}
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
  const [showHidden, setShowHidden] = useState(false); // State to manage toggle

  const toggleHidden = () => {
    setShowHidden((prev) => !prev); // Toggle the state
  };

  return (
    <>
      {/* {publicKey ? */}
      <div className="z-[1] h-full flex flex-col">
        <div className="mx-3 mt-10">
          <div>
            <ConfirmDialog
              title="Delete Trade"
              open={confirmDeleteClosedTrade}
              onClose={() => setConfirmDeleteClosedTrade(false)}
              onConfirm={deleteClosedTrade}
            >
              Are you sure you want to delete this trade?
            </ConfirmDialog>
          </div>

          <h1 className="text-lg font-bold text-white uppercase">
            Closed positions
          </h1>
          <p className="text-sm font-bold text-white mt-2 opacity-[0.57]">
            Presenting your closed positions
          </p>
          <div className="flex flex-row  justify-between w-[100%] items-start mt-6 gap-4">
            {/* Left Section: Filter and Show/Hide Button */}
            <div className=" flex flex-row gap-3 ">
              <Link href="#">
                <div className=" sm:hidden border cursor-pointer rounded-[10px]  bg-[#202020] flex justify-between gap-1 items-center px-3 py-1 w-[90px]">
                  <Image
                    src={IMG_SETTING}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-white text-[13px] font-bold">
                    Filter
                  </span>
                </div>
              </Link>
              <div className="hidden flex-row gap-3 sm:flex">
                {/* Only show on screens 768px and larger */}
                <p className="text-[12px] font-bold text-white mt-2">
                  Total Invested SOL: {getReadableSmallNumber(closed_pnl, 9)}
                </p>
                <p className="text-[12px] font-bold text-white mt-2">
                  Total Sold SOL: {getReadableSmallNumber(total_invested, 9)}
                </p>
                <p className="text-[12px] font-bold text-white mt-2">
                  Total Volume: {getReadableSmallNumber(total_sold, 9)}
                </p>
              </div>
            </div>

            {/* Right Section: Statistics and Conditional Content */}
            {/* <div className="">
              Conditional rendering for hidden content
              {showHidden && (
                <div className="mt-4 text-white text-[14px] w-full md:w-auto">
                  <p>Hidden Content Goes Here</p>
                </div>
              )}

              <Link href="/settings">
                <div className="border cursor-pointer bg-[#202020] rounded-[10px] flex justify-between gap-1 w-[110px] items-center px-3 py-1">
                  <Image
                    src={IMG_SETTING}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-white text-[13px] font-bold">
                    Settings
                  </span>
                </div>
              </Link>
            </div> */}
          </div>

          <div className="flex flex-row gap-3 sm:hidden">
            {/* Only show on screens smaller than medium (max-width: 768px) */}
            <p className="text-[10px] font-bold text-white mt-2">
              Total Invested SOL: {getReadableSmallNumber(closed_pnl, 9)}
            </p>
            <p className="text-[10px] font-bold text-white mt-2">
              Total Sold SOL: {getReadableSmallNumber(total_invested, 9)}
            </p>
            <p className="text-[10px] font-bold text-white mt-2">
              Total Volume: {getReadableSmallNumber(total_sold, 9)}
            </p>
          </div>
        </div>

        <div
          className="overflow-auto mt-5 mx-3  flex-1 custom-scrollbar relative h-full z-40"
          // style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          {closedPools ? (
            <Table
              aria-label="Closed Pools"
              isStriped
              removeWrapper
              classNames={classNames}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    className="text-[#858686] leading-3 border-t border-[#515151]
                  text-left bg-[#121212] h-[45px] text-[13px] font-bold"
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>

              <TableBody items={closedPools}>
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
          ) : null}
        </div>
      </div>
      {/* :
        //<ConnectComponent />
        null
      } */}
    </>
  );
};

export default ClosedPools;
