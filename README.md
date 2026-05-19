<p align="center">
  <img src="assets/logo.png" alt="GrepoSentry Logo" width="140">
</p>

<h1 align="center">GrepoSentry</h1>

<p align="center">
  Advanced command filter userscript for Grepolis.
</p>

**GrepoSentry** is a Grepolis userscript focused on command overview readability, faster coordination, and cleaner filtering for daily alliance play.

This repository is the **official public review, versioning, and release repository** for the project.

## Installation & Support

### Official website

You can find the official GrepoSentry page here:

- https://grepolis.latavernadeglisbronzi.net/

### Install GrepoSentry

To install the latest public version, open the official website and download the userscript from the public download section.

Direct repository path:

- `downloads/GrepoSentry-Command-Filter.user.js`

GrepoSentry is designed to work with Tampermonkey on Grepolis game pages.

### Automatic updates

The script includes:

- `@updateURL`
- `@downloadURL`

This allows Tampermonkey to check for new published versions automatically when updates are released.

### Support, reports and feedback

For support, bug reports, compatibility issues, or feature requests, use the official Discord server below:

- https://discord.gg/aCrkaWFx5y

## Project scope

GrepoSentry is designed as a **UI enhancement and command filtering tool** for Grepolis.

Current public versions are focused on:
- outgoing attacks
- incoming attacks
- outgoing supports
- incoming supports
- returns / aborts
- revolts (blue)
- revolts (red)
- conquests / siege movements

The script stores preferences **per server** and keeps them persistent between sessions.

## Technical scope

According to the current metadata and source:
- target pages: `http://*.grepolis.com/game/*` and `https://*.grepolis.com/game/*`
- declared privileged userscript: `GM_addStyle`
- update delivery: `@updateURL` and `@downloadURL`
- public homepage and support URLs are configured in the script header

## Repository purpose

This repository exists to provide:
- transparent source review
- release tracking
- update distribution
- public documentation
- changelog history
- staff review support

## Repository structure

```text
README.md
LICENSE
CHANGELOG.md
SECURITY.md
NOTICE.md
downloads/
assets/
