# n8n-nodes-watchstate

[![npm version](https://img.shields.io/npm/v/n8n-nodes-watchstate.svg)](https://www.npmjs.com/package/n8n-nodes-watchstate)

n8n community node for [WatchState](https://github.com/arabcoders/watchstate) — play-state sync across media servers — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-watchstate`.

## Operations
- Get Backends, Get Health, Get History

## Credentials
Configure the base URL and authentication in the **WatchState API** credential.

## Usage example

List configured backends:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Backends**.
4. Execute the node — example output:

```json
{ "name": "plex_home", "type": "plex", "import": true, "export": true }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
