import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

// const API_KEY = process.env.VITE_API_KEY;
const API_KEY = '1d9b0c2d45d634923a3ecea952c8aa04';
if (!API_KEY) {
  throw new Error('API_KEY env var required');
}

export default {
  overwrite: true,
  generates: {
    './src/generated/': {
      schema: [
        `https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp`,
      ],
      documents: ['./src/**/*.{ts,tsx}'],
      preset: 'client',
      config: {
        arrayInputCoercion: false,
        enumsAsTypes: true,
        dedupeFragments: true,
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
} satisfies CodegenConfig;
