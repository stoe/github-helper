# github-helper

[![ci](https://github.com/stoe/github-helper/workflows/ci/badge.svg)](https://github.com/stoe/github-helper/actions?query=workflow%3Aci) [![codeql](https://github.com/stoe/github-helper/workflows/codeql/badge.svg)](https://github.com/stoe/github-helper/actions?query=workflow%3Acodeql) [![release](https://github.com/stoe/github-helper/workflows/release/badge.svg)](https://github.com/stoe/github-helper/actions?query=workflow%3Arelease) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> A browser extension to do things on github.com

## Functionality

### Repository status

**active**
<br /><img src="src/icons/status/active.png" width="16px" alt="active repository status badge" />
if a commit was made in the last two weeks.

**inactive**
<br /><img src="src/icons/status/inactive.png" width="16px" alt="inactive repository status badge" />
if the last commit was made between two and 8 weeks ago.

**unmaintained**
<br /><img src="src/icons/status/unmaintained.png" width="16px" alt="unmaintained repository status badge" />
if the last commit was made more than 8 weeks ago.

**abandoned**
<br /><img src="src/icons/status/abandoned.png" width="16px" alt="abandoned repository status badge" />
if the last commit was made more than a year ago.

### Highlight @-mentions

**direct mention**
<br /><img src=".github/assets/direct-mention.png" height="96px" alt="screenshot of direct mention highlighted" />

**team mention**
<br />
<img src=".github/assets/team-mention.png" height="96px" alt="screenshot of team mention highlighted" />

You will need a [personal access token](https://github.com/settings/tokens/new?description=github-helper-browser-extension&scopes=read:org) with the `read:org` scope added to the extenstion's options for this to work.

No data is saved or transmitted outside of the browser extension.

For more information please see the [privacy](./.github/privacy.md) information.

## Install

- Download the latest `github-helper.zip` file from [Release](https://github.com/stoe/github-helper/releases)
- Unzip the `github-helper.zip` file to your disk
- Microsoft Edge (Chromium)
  - Follow instructions to [install a side-loaded extension](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part1-simple-extension#installing-and-updating-side-loaded-extensions). You will need to enable [Developer mode](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part1-simple-extension#run-your-extension-locally-in-your-browser-while-developing-it-side-loading).
- Google Chrome
  - Visit `chrome://extensions` (via omnibox or menu -> Tools -> Extensions).
  - Enable Developer mode by ticking the checkbox in the upper-right corner.
  - Click on the "Load unpacked extension..." button.
  - Select the directory containing the unpacked `github-helper` extension.

## License

- [MIT](./license) © [Stefan Stölzle](https://github.com/stoe)
- [Code of Conduct](./.github/code_of_conduct.md)

## Thanks

This is a combined extension of:

- https://github.com/pierluigi/github-repo-status-webextension by [@pierluigi](https://github.com/pierluigi)
- https://github.com/benbalter/github-mention-highlighter by [@benbalter](https://github.com/benbalter)
