import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WatchstateApi implements ICredentialType {
	name = 'watchstateApi';

	displayName = 'WatchState API';

	icon = 'file:watchstateApi.svg' as const;

	documentationUrl = 'https://github.com/arabcoders/watchstate';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://watchstate:8080',
			required: true,
			description: 'Base URL of the WatchState instance (e.g. http://watchstate:8080). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'WatchState API key (the WS_API_KEY value)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				apikey: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/api/backends',
		},
	};
}
