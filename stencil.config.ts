import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'colortile',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
