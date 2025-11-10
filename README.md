# proto-dynamic
Web components to correspond to the LLA components for dynamic Contentful types

Documented by the Contentful team in their [Confluence pages](https://lahitapiola.atlassian.net/wiki/spaces/CTFUL/pages/829754040/Dynamic+Components). (LT Confluence access needed)

Based on [Lit TS started kit](https://github.com/lit/lit-element-starter-ts).


## Development

- Add Lit-components in their own directories in ./src
- Import the component in ./src/index.js
- `npm run build:watch` will build into ./lib after changes in ./src/**/*.ts
- `npm run dev:watch:yrd` will copy changes in ./lib to YRD prototype's dist directory so that browser refresh of the local YRD-proto takes the changes in use.

### Peer dependencies

These components require some Duet packages in the host application as specified by the peerDependecies in package.json. If you need Duet features that require more recent version, update the peerDependecies. As we can trust Duet to use semver correctly, we specify the peerDependecies with "^" allowing minor version upgrades.

### Library version numbers

We use semver for version numbers:

- Backward compatible bug fixes, no new features (changes to components or attributes): patch version, e.g. 1.1.1 => 1.1.2
- Backward compatible new features (changes to components or attributes): minor version, e.g. 1.1.1 => 1.2.0
- Braking changes: major version, e.g. 1.1.1 => 2.0.0

Every time you merge your branch to main, you should publish a new release. Use the version number prefixed with a "v" in the release tag, e.g. 1.1.1 => "v1.1.1". A release title is not required, but brief release notes are helpful, at very minimum listing the components that have been added or changed.

## Components

- Group
- Hero
- Highlight
- Layout
- Module

## Work in progress (10.11.2025)

- Only a small selection of the required components has been implemented in this repository. More will be added as needed by prototyping work.
- There are no tests for the components. At this point it is not clear if test automation would have enough real benefits to justify the work setting them up, as tight coupling with the Contentful model makes good tests non-trivial. The starter kit includes scaffolding for tests, and until we make a decision one way or another, we leave that scaffolding in place, but unused.
- There is no documentation. The starter kit includes automatic documentation generation, but as the production components are documented elsewhere, the need for documenting the prototype components is quite light.
