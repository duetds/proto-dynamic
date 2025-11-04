# proto-dynamic
Web components to correspond to the LLA components for dynamic Contentful types

Based on [Lit TS started kit](https://github.com/lit/lit-element-starter-ts).

## Development

- Add Lit-components in their own directories in ./src
- Import the component in ./src/index.js
- `npm run build:watch` will build into ./lib after changes in ./src/**/*.ts
- `npm run dev:watch:yrd` will copy changes in ./lib to YRD prototype's dist directory so that browser refresh of the local YRD-proto takes the changes in use.
