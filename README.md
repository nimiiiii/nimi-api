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
This is currently being rewritten to be more robust and simplified. The main goal is to lessen the barrier of entry and the number of required requests which was the problem of the previous iteration. Documentation will be supplied at a later date.

You can try it out by using this site that hosts the api: [azur-lane-api on Glitch](https://azur-lane-api.glitch.me/).