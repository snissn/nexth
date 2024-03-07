## Development 🛠️

```bash
npm run dev
# or
yarn dev
```


## Setup

Get a wallet connect project id from https://cloud.walletconnect.com

create `packages/app/.env` with the value from wallet connect


```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```


create a token on  https://testnet.interchain.axelar.dev/polygon that will serve as the test Fluent token. 

Bridge the token using axelar to filecoin calibration.
