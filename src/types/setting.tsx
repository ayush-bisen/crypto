export interface ISettingInfo {
  is_bot_on: string;
  run_started_at: string;
  run_ended_at: string;
  pending_pooled_sol_min: string;
  pending_pooled_sol_max: string;
  pending_pooled_token_min: string;
  pending_pooled_token_max: string;
  pending_can_freeze_audit: number;
  pending_can_mint_audit: number;
  pending_live_mins: number;
  buy_initial_invest_sol: string;
  buy_pooled_sol_min: string;
  buy_pooled_sol_max: string;
  buy_pooled_token_min: string;
  buy_pooled_token_max: string;
  buy_24h_change_min: string;
  buy_24h_change_max: string;
  buy_lp_burned_audit: number;
  buy_top_10_audit: number;
  buy_whale_check_percent: number;
  priority_fee: string;
  bibrary_fee: string;
  slippage: string;
  tp_percent_1: string;
  tp_amount_1: string;
  tp_percent_2: string;
  tp_amount_2: string;
  tp_percent_3: string;
  tp_amount_3: string;
  sl_percent_1: string;
  sl_amount_1: string;
  tsl_on: number;
  tsl_percent: string;
}

export const defaultSettingInfo: ISettingInfo = {
  is_bot_on: "0",
  run_started_at: "00:00",
  run_ended_at: "00:00",
  pending_pooled_sol_min: "1",
  pending_pooled_sol_max: "1000",
  pending_pooled_token_min: "1",
  pending_pooled_token_max: "80",
  pending_can_freeze_audit: 1,
  pending_can_mint_audit: 1,
  pending_live_mins: 60,
  buy_initial_invest_sol: "0.1",
  buy_pooled_sol_min: "1",
  buy_pooled_sol_max: "1000",
  buy_pooled_token_min: "1",
  buy_pooled_token_max: "1000",
  buy_24h_change_min: "1",
  buy_24h_change_max: "10000",
  buy_lp_burned_audit: 0,
  buy_top_10_audit: 0,
  buy_whale_check_percent: 0,
  priority_fee: "0.01",
  bibrary_fee: "0.01",
  slippage: "10",
  tp_percent_1: "0",
  tp_amount_1: "0",
  tp_percent_2: "0",
  tp_amount_2: "0",
  tp_percent_3: "0",
  tp_amount_3: "0",
  sl_percent_1: "0",
  sl_amount_1: "0",
  tsl_on: 0,
  tsl_percent: "0",
};

export interface SettingProps {
  setting?: ISettingInfo;
  setProfileIamgeData?: any;
  onChangeSettingValue: (e: any, prop: string, changedValue?: any) => void;
}
