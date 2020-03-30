# Azur Lane API
Unofficial API that returns JSON data from [Azur Lane](https://azurlane.yo-star.com/). Always updated to the latest game version

You can test it out locally by cloning it or downloading it then running `pip install -r requirements.txt` then `python app.py`.

You will need a `.env` file in the root directory. For example:
```dotenv
GITHUB_TOKEN=your_github_personal_token
RELEASE_MODE=production
DATA_LOCALE=en-US
DATA_REPO=GitHub/Repository-That-Holds-Game-Data
```

Routes are defined in the [routes](app_routes.py) definition file. Currently hosted under [glitch.com](glitch.com) for testing. You can try it out by clicking the link below:

* [Request all ships](https://azur-lane-api.glitch.me/api/ships)
* [Request a specific ship](https://azur-lane-api.glitch.me/api/ships?name=Saratoga)

Please consider donating to be able to host a dedicated server by clicking the link below:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W71CF9V)