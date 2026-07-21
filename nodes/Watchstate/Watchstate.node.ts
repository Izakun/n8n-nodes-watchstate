import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Watchstate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WatchState',
		name: 'watchstate',
		icon: { light: 'file:watchstate.svg', dark: 'file:watchstate.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Query your WatchState instance through its API',
		defaults: { name: 'WatchState' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'watchstateApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Backends', value: 'getBackends', action: 'Get many backends' },
					{ name: 'Get Health', value: 'getHealth', action: 'Get the system health' },
					{ name: 'Get History', value: 'getHistory', action: 'Get the play history' },
					{ name: 'Get Tasks', value: 'getTasks', action: 'Get scheduled tasks' },
					{ name: 'Get Version', value: 'getVersion', action: 'Get the server version' },
				],
				default: 'getBackends',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const URL_BY_OP: Record<string, string> = {
			getBackends: '/v1/api/backends',
			getHealth: '/v1/api/system/healthcheck',
			getHistory: '/v1/api/history',
			getTasks: '/v1/api/tasks',
			getVersion: '/v1/api/system/version',
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('watchstateApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				const url = URL_BY_OP[operation];
				if (!url) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const full = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'watchstateApi',
					{
						method: 'GET' as IHttpRequestMethods,
						baseURL,
						url,
						json: true,
						returnFullResponse: true,
						ignoreHttpStatusErrors: true,
					} as IHttpRequestOptions,
				)) as { statusCode: number; body: IDataObject };

				// WatchState answers 404 "No Results." for an empty collection
				// (e.g. history with no synced backends): treat it as no data.
				const errCode = (full.body?.error as IDataObject)?.code;
				if (full.statusCode === 404 && (errCode === 404 || full.body?.error)) {
					continue;
				}
				if (full.statusCode >= 400) {
					throw new NodeApiError(this.getNode(), (full.body ?? {}) as JsonObject, {
						itemIndex: i,
						httpCode: String(full.statusCode),
					});
				}
				const response = full.body;

				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
