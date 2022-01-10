import { ChainId } from '@aave/contract-helpers';
import { getParam, getParamOrExit } from './env-helpers';

export const REDIS_HOST = getParamOrExit('REDIS_HOST');

export const RPC_URL = getParamOrExit('RPC_URL');
const _BACKUP_RPC_URLS: string | null = getParam('BACKUP_RPC_URLS');
const _parseBackupRpcUrls = (value: string) => {
  if (value.length < 1) {
    return [];
  }
  return value.split(',');
};
export const BACKUP_RPC_URLS =
  _BACKUP_RPC_URLS === null ? [] : _parseBackupRpcUrls(_BACKUP_RPC_URLS);

export const RPC_MAX_TIMEOUT = 5000;

export const CHAIN_ID = Number(process.env.CHAIN_ID || '0') as
  | ChainId.mainnet
  | ChainId.polygon
  | ChainId.avalanche;

if (![ChainId.mainnet, ChainId.polygon, ChainId.avalanche].includes(CHAIN_ID)) {
  throw new Error(`ChainId: "${CHAIN_ID}" is not currently supported`);
}

const CONFIGS: {
  [key: number]: {
    PROTOCOL_ADDRESSES_PROVIDER_ADDRESSES: string[];
    PROTOCOLS_WITH_INCENTIVES_ADDRESSES: string[];
    POOL_UI_DATA_PROVIDER_ADDRESS: string;
    UI_INCENTIVE_DATA_PROVIDER_ADDRESS: string;
    GENERAL_RESERVES_DATA_POOLING_INTERVAL: number;
    USERS_DATA_POOLING_INTERVAL: number;
    RESERVE_INCENTIVES_DATA_POOLING_INTERVAL: number;
    USER_INCENTIVES_DATA_POOLING_INTERVAL: number;
    BLOCK_NUMBER_POOLING_INTERVAL: number;
  };
} = {
  [ChainId.mainnet]: {
    BLOCK_NUMBER_POOLING_INTERVAL: 1000,
    PROTOCOL_ADDRESSES_PROVIDER_ADDRESSES: [
      '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
      '0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5',
    ],
    PROTOCOLS_WITH_INCENTIVES_ADDRESSES: ['0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'],
    POOL_UI_DATA_PROVIDER_ADDRESS: '0x47e300dDd1d25447482E2F7e5a5a967EA2DA8634',
    UI_INCENTIVE_DATA_PROVIDER_ADDRESS: '0xd9F1e5F70B14b8Fd577Df84be7D75afB8a3A0186',
    GENERAL_RESERVES_DATA_POOLING_INTERVAL: 4000,
    USERS_DATA_POOLING_INTERVAL: 4000,
    RESERVE_INCENTIVES_DATA_POOLING_INTERVAL: 4000,
    USER_INCENTIVES_DATA_POOLING_INTERVAL: 4000,
  },
  [ChainId.polygon]: {
    BLOCK_NUMBER_POOLING_INTERVAL: 5000,
    PROTOCOL_ADDRESSES_PROVIDER_ADDRESSES: ['0xd05e3E715d945B59290df0ae8eF85c1BdB684744'],
    PROTOCOLS_WITH_INCENTIVES_ADDRESSES: ['0xd05e3E715d945B59290df0ae8eF85c1BdB684744'],
    POOL_UI_DATA_PROVIDER_ADDRESS: '0x3caf35EBd0F8a96fC4b121359bf32F36D68C6ee7',
    UI_INCENTIVE_DATA_PROVIDER_ADDRESS: '0x645654D59A5226CBab969b1f5431aA47CBf64ab8',
    GENERAL_RESERVES_DATA_POOLING_INTERVAL: 2000,
    USERS_DATA_POOLING_INTERVAL: 2000,
    RESERVE_INCENTIVES_DATA_POOLING_INTERVAL: 2000,
    USER_INCENTIVES_DATA_POOLING_INTERVAL: 2000,
  },
  [ChainId.avalanche]: {
    BLOCK_NUMBER_POOLING_INTERVAL: 5000,
    PROTOCOL_ADDRESSES_PROVIDER_ADDRESSES: ['0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f'],
    PROTOCOLS_WITH_INCENTIVES_ADDRESSES: ['0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f'],
    POOL_UI_DATA_PROVIDER_ADDRESS: '0x64140FE5726d90Aa4f2bD2462522B21E3A7C5775',
    UI_INCENTIVE_DATA_PROVIDER_ADDRESS: '0x11979886A6dBAE27D7a72c49fCF3F23240D647bF',
    GENERAL_RESERVES_DATA_POOLING_INTERVAL: 1000,
    USERS_DATA_POOLING_INTERVAL: 1000,
    RESERVE_INCENTIVES_DATA_POOLING_INTERVAL: 1000,
    USER_INCENTIVES_DATA_POOLING_INTERVAL: 1000,
  },
};

const _STAKE_CONFIG = {
  STAKE_DATA_PROVIDER: '0xc57450af527d10Fe182521AB39C1AD23c1e1BaDE',
  STK_AAVE_TOKEN_ADDRESS: '0x4da27a545c0c5B758a6BA100e3a049001de870f5',
  STK_ABPT_TOKEN_ADDRESS: '0xa1116930326D21fB917d5A27F1E9943A9595fb47',
  ABPT_TOKEN: '0x41A08648C3766F9F9d85598fF102a08f4ef84F84',
  AAVE_TOKEN_ADDRESS: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  STAKE_DATA_POOLING_INTERVAL: 4000,
};

export const CONFIG = CONFIGS[CHAIN_ID];

export const STAKING_CONFIG: typeof _STAKE_CONFIG | undefined =
  CHAIN_ID === 1 ? _STAKE_CONFIG : undefined;

export const RESERVES_LIST_VALIDITY_INTERVAL = 60 * 5 * 1000;
