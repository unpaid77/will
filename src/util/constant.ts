import {Platform} from 'react-native';

type ENV_TYPE = 'PROD' | 'DEV' | 'TEST';

const CONFIGS: Record<ENV_TYPE, {url: string}> = {
  PROD: {
    url: 'http://65.0.41.161/will_backend/public/api',
  },
  DEV: {
    url:
      Platform.OS === 'ios'
        ? 'http://65.0.41.161/will_backend/public/api'
        : 'http://65.0.41.161/will_backend/public/api',
  },
  TEST: {
    url: 'http://65.0.41.161/will_backend/public/api',
  },
};

export const PROD_CONFIGS = CONFIGS.PROD;
export const TEST_CONFIGS = CONFIGS.TEST;
export const DEV_CONFIGS = CONFIGS.DEV;

// export const BASE_URL = 'http://15.206.88.76/will_backend/public/api/';
