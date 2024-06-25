/* eslint-disable jsdoc/check-param-names */

import type { RawFile, RequestData, REST } from '@discordjs/rest';
import {
	InteractionResponseType,
	Routes,
	type APICommandAutocompleteInteractionResponseCallbackData,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIModalInteractionResponseCallbackData,
	type APIPremiumRequiredInteractionResponse,
	type RESTGetAPIWebhookWithTokenMessageResult,
	type Snowflake,
} from 'discord-api-types/v10';
import type { WebhooksAPI } from './webhook.js';

export class InteractionsAPI {
	public constructor(
		private readonly rest: REST,
		private readonly webhooks: WebhooksAPI,
	) {}

	/**
	 * Replies to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param body - The callback data for replying
	 * @param options - The options for replying
	 */
	public async reply(
		interactionId: Snowflake,
		interactionToken: string,
		{ files, ...data }: APIInteractionResponseCallbackData & { files?: RawFile[] },
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			files,
			auth: false,
			body: {
				type: InteractionResponseType.ChannelMessageWithSource,
				data,
			},
			signal,
		});
	}

	/**
	 * Defers the reply to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param data - The data for deferring the reply
	 * @param options - The options for deferring
	 */
	public async defer(
		interactionId: Snowflake,
		interactionToken: string,
		data?: APIInteractionResponseDeferredChannelMessageWithSource['data'],
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			auth: false,
			body: {
				type: InteractionResponseType.DeferredChannelMessageWithSource,
				data,
			},
			signal,
		});
	}

	/**
	 * Defers an update from a message component interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param options - The options for deferring
	 */
	public async deferMessageUpdate(
		interactionId: Snowflake,
		interactionToken: string,
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			auth: false,
			body: {
				type: InteractionResponseType.DeferredMessageUpdate,
			},
			signal,
		});
	}

	/**
	 * Reply to a deferred interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message}
	 * @param applicationId - The application id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param body - The callback data for replying
	 * @param options - The options for replying
	 */
	public async followUp(
		applicationId: Snowflake,
		interactionToken: string,
		body: APIInteractionResponseCallbackData & { files?: RawFile[] },
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		return this.webhooks.execute(applicationId, interactionToken, { ...body, wait: true }, { signal });
	}

	/**
	 * Edits the initial reply to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
	 * @param applicationId - The application id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param callbackData - The callback data for editing the reply
	 * @param messageId - The id of the message to edit. If omitted, the original reply will be edited
	 * @param options - The options for editing the reply
	 */
	public async editReply(
		applicationId: Snowflake,
		interactionToken: string,
		callbackData: APIInteractionResponseCallbackData & { files?: RawFile[] },
		messageId?: Snowflake | '@original',
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		return this.webhooks.editMessage(applicationId, interactionToken, messageId ?? '@original', callbackData, {
			signal,
		});
	}

	/**
	 * Fetches the initial reply to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response}
	 * @param applicationId - The application id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param options - The options for fetching the reply
	 */
	public async getOriginalReply(
		applicationId: Snowflake,
		interactionToken: string,
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		return this.webhooks.getMessage(
			applicationId,
			interactionToken,
			'@original',
			{},
			{ signal },
		) as Promise<RESTGetAPIWebhookWithTokenMessageResult>;
	}

	/**
	 * Deletes the initial reply to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message}
	 * @param applicationId - The application id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param messageId - The id of the message to delete. If omitted, the original reply will be deleted
	 * @param options - The options for deleting the reply
	 */
	public async deleteReply(
		applicationId: Snowflake,
		interactionToken: string,
		messageId?: Snowflake | '@original',
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.webhooks.deleteMessage(applicationId, interactionToken, messageId ?? '@original', {}, { signal });
	}

	/**
	 * Updates the message the component interaction was triggered on
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param callbackData - The callback data for updating the interaction
	 * @param options - The options for updating the interaction
	 */
	public async updateMessage(
		interactionId: Snowflake,
		interactionToken: string,
		{ files, ...data }: APIInteractionResponseCallbackData & { files?: RawFile[] },
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			files,
			auth: false,
			body: {
				type: InteractionResponseType.UpdateMessage,
				data,
			},
			signal,
		});
	}

	/**
	 * Sends an autocomplete response to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param callbackData - The callback data for the autocomplete response
	 * @param options - The options for sending the autocomplete response
	 */
	public async createAutocompleteResponse(
		interactionId: Snowflake,
		interactionToken: string,
		callbackData: APICommandAutocompleteInteractionResponseCallbackData,
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			auth: false,
			body: {
				type: InteractionResponseType.ApplicationCommandAutocompleteResult,
				data: callbackData,
			},
			signal,
		});
	}

	/**
	 * Sends a modal response to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param callbackData - The modal callback data to send
	 * @param options - The options for sending the modal
	 */
	public async createModal(
		interactionId: Snowflake,
		interactionToken: string,
		callbackData: APIModalInteractionResponseCallbackData,
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			auth: false,
			body: {
				type: InteractionResponseType.Modal,
				data: callbackData,
			},
			signal,
		});
	}

	/**
	 * Sends a premium required response to an interaction
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response}
	 * @param interactionId - The id of the interaction
	 * @param interactionToken - The token of the interaction
	 * @param options - The options for sending the premium required response
	 */
	public async sendPremiumRequired(
		interactionId: Snowflake,
		interactionToken: string,
		{ signal }: Pick<RequestData, 'signal'> = {},
	) {
		await this.rest.post(Routes.interactionCallback(interactionId, interactionToken), {
			auth: false,
			body: {
				type: InteractionResponseType.PremiumRequired,
			} satisfies APIPremiumRequiredInteractionResponse,
			signal,
		});
	}
}
