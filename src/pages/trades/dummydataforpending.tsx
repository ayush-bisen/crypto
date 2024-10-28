// dummy data
export interface Pool {
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

export const dummyPools: Pool[] = [
  {
    id: 1,
    pending_pool: {
      pool_name: "SOL/USDC",
      pool_url: "/sol-usdc-pool",
      pool_open_time: "2024-09-25T10:00:00Z",
      price_24h: -2.45,
      lp_burned_percent: 96,
      pooled_sol: 120.4532,
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
      pooled_sol: 250.654,
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
