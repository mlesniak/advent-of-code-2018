Setup

    # https://www.npmjs.com/package/ts-node-dev
    npm install -g ts-node-dev
    npm install @types/node
    tsc --init

    ts-node-dev --respawn --transpileOnly main.ts