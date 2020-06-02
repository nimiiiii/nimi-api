<p align="center">
  <img src="icon.png" width="256" title="Azur Lane API" style="filter: invert(1);">
</p>

# Azur Lane API
![deploy](https://github.com/lenitrous/azur-lane-api/workflows/deploy/badge.svg?branch=master&event=push) ![lint](https://github.com/lenitrous/azur-lane-api/workflows/lint/badge.svg?branch=master&event=push)

Unofficial API that returns JSON data from [Azur Lane](https://azurlane.yo-star.com/). Always updated to the latest game version.

You can test it out locally by cloning it or downloading it then running `npm install` then `npm run start`.

You will need a `.env` file in the root directory. For example:
```dotenv
GITHUB_TOKEN=your-github-token
ENVIRONMENT=production
DATA_REPO=GitHub/Repository-That-Holds-Game-Data
PORT=any-port-number
```

Please consider donating to be able to host a dedicated server by clicking the link below:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W71CF9V)

## Endpoints
All endpoints are defined in the [endpoints directory](./src/endpoints) and are prefixed by `/api/`.

## State
Currently under process of revision.
You can try it out on [Glitch](https://azur-lane-api.glitch.me/).

## Motivation
### General
There aren't many data providers for this mobile game. For aspiring developers to help out the community. Opportunities like Discord bots or self-hosted websites with tools and viewers.
### For the revision
[The last revision](repo/blob/deprecated) had a big issue where requests can be bigger than 1 MB. This abysmally affected the response times and always had data that isn't really needed or was unreadable.

This was mitigated by adding query string parameters. However this left an unsolvable issue of needing to make multiple requests to simply build usable data.

This rewrite aims to solve all problems by handling lua data parsing to an interchangeable format like JSON and provide data to consumers in a readable and understandable format.