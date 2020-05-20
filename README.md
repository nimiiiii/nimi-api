# Azur Lane API
Unofficial API that returns JSON data from [Azur Lane](https://azurlane.yo-star.com/). Always updated to the latest game version.

You can test it out locally by cloning it or downloading it then running `pip install -r requirements.txt` then `python app.py`.

You will need a `.env` file in the root directory. For example:
```dotenv
GITHUB_TOKEN=your_github_personal_token
RELEASE_MODE=production
DATA_REPO=GitHub/Repository-That-Holds-Game-Data
```

Please consider donating to be able to host a dedicated server by clicking the link below:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W71CF9V)

## Endpoints
All endpoints are defined in the [app config file](app_config.py) and are prefixed by `/api/`.

## Querying
### Lookup a specific region
Adding a query string `region` will lookup game data for that specific region. Omitting it will default in the English version of the game. All available regions are defined in the app config file.
* Example: `/api/ships?region=jp`
### Returning specific keys
Adding a query string `keys` will make the response return only the requested. Can be comma-separated to return multiple keys.
* Example: `/api/ships?keys=id,star,rarity`
### Filtering
Additional query strings are treated as search filters.
* Example: `/api/ships?name=Saratoga`

You can try it out by using this site that hosts the api: [azur-lane-api on Glitch](https://azur-lane-api.glitch.me/).

**I highly recommend filtering and making your request return specific keys to lessen response times as they can get as big as 1MB!**