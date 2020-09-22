<p align="center">
  <img src="icon.png" width="256" title="Azur Lane API">
</p>

# Azur Lane API
![deploy](https://github.com/lenitrous/azur-lane-api/workflows/deploy/badge.svg?branch=master&event=push) ![lint](https://github.com/lenitrous/azur-lane-api/workflows/lint/badge.svg?branch=master&event=push)

Unofficial API that returns JSON data from [Azur Lane](https://azurlane.yo-star.com/). Always updated to the latest game version.

Please consider donating to be able to host a dedicated server by clicking the link below:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W71CF9V)

## State
Under revision under the [Next.js](https://nextjs.org) framework! Check back later!

## Motivation
### General
There aren't many data providers for this mobile game. For aspiring developers to help out the community. Opportunities like Discord bots or self-hosted websites with tools and viewers.
### For the revision
The last revision had a big issue where requests can be bigger than 1 MB. This abysmally affected the response times and always had data that isn't really needed or was unreadable.

This was mitigated by adding query string parameters. However this left an unsolvable issue of needing to make multiple requests to simply build usable data.

This rewrite aims to solve all problems by handling lua data parsing to an interchangeable format like JSON and provide data to consumers in a readable and understandable format.