## StorybookJS
https://storybook.js.org/

## Dependencies & Build
First make sure to install all dependencies and build the web3-redux library. Make sure you have [pnpm](https://pnpm.io/) installed.

```
pnpm i
pnpm run build:web3-redux
```
## Run Storybook
Run StorybookJS in dev mode.
```
cd packages/web3-redux-components
pnpm run storybook
```

## Bundler Bug
The first time you run storybook, you might run into the following bug displayed in the browser:
```
Failed to fetch dynamically imported module: http://localhost:6006/.storybook/preview.tsx
```

It is unclear why this bug occurs & how to fix this bug but we have found the following workaround.
* Make sure storybook is running in dev mode
* Got to [packages/web3-redux-components/.storybook/preview.tsx](packages/web3-redux-components/.storybook/preview.tsx)
* Replace `<StoryWithData />` with `<Story />` => Component renders but with no test data
* Replace `<Story />` with `<StoryWithData />` => Component renders with test data
