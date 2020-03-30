# Azur Lane API
Unofficial API that returns JSON data from [Azur Lane](https://azurlane.yo-star.com/). Always updated to the latest game version

Currently Work in Progress! You can test it out locally by cloning it or downloading it then running `pip install` then `python app.py`.

You will need a `.env` file in the root directory. For example:
```dotenv
GITHUB_TOKEN=your_github_personal_token
RELEASE_MODE=production
DATA_LOCALE="en-US"
DATA_REPO=GitHub/Repository-That-Holds-Game-Data
```

Routes are defined in the [routes](app_routes.py) definition file.