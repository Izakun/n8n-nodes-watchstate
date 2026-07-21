<img src="nodes/Watchstate/watchstate.svg" width="90" align="right" alt="WatchState" />

# n8n-nodes-watchstate

[![npm version](https://img.shields.io/npm/v/n8n-nodes-watchstate.svg)](https://www.npmjs.com/package/n8n-nodes-watchstate)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-watchstate.svg)](https://www.npmjs.com/package/n8n-nodes-watchstate)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-watchstate.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **WatchState**. It lets you automate
WatchState directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**WatchState**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-watchstate`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Backends** | Get many backends |
| **Get Health** | Get the system health |
| **Get History** | Get the play history |
| **Get Tasks** | Get scheduled tasks |
| **Get Version** | Get the server version |

## Authentication

This node uses the **WatchState API** credential. In n8n, go to **Credentials → New**, pick
**WatchState API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://watchstate:8080` (no trailing slash).
- **API Key** — your service API key.

Your API key is sent as the `apikey` query-string parameter.

**Where to find it:** See the service documentation: https://github.com/arabcoders/watchstate

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **WatchState** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **WatchState API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [WatchState](https://github.com/arabcoders/watchstate)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
