'use strict';

const { lazy } = require('@discordjs/util');
const { ChannelType } = require('discord-api-types/v10');

const getCategoryChannel = lazy(() => require('../util/Structures').get('CategoryChannel'));
const getDMChannel = lazy(() => require('../util/Structures').get('DMChannel'));
const getAnnouncementChannel = lazy(() => require('../util/Structures').get('AnnouncementChannel'));
const getStageChannel = lazy(() => require('../util/Structures').get('StageChannel'));
const getTextChannel = lazy(() => require('../util/Structures').get('TextChannel'));
const getThreadChannel = lazy(() => require('../util/Structures').get('ThreadChannel'));
const getVoiceChannel = lazy(() => require('../util/Structures').get('VoiceChannel'));
const getDirectoryChannel = lazy(() => require('../util/Structures').get('DirectoryChannel'));
const getPartialGroupDMChannel = lazy(() => require('../util/Structures').get('PartialGroupDMChannel'));

const getForumChannel = lazy(() => require('../util/Structures').get('ForumChannel'));
const getMediaChannel = lazy(() => require('../util/Structures').get('MediaChannel'));

/**
 * Extra options for creating a channel.
 * @typedef {Object} CreateChannelOptions
 * @property {boolean} [allowFromUnknownGuild] Whether to allow creating a channel from an unknown guild
 * @private
 */

/**
 * Creates a discord.js channel from data received from the API.
 * @param {Client} client The client
 * @param {APIChannel} data The data of the channel to create
 * @param {Guild} [guild] The guild where this channel belongs
 * @param {CreateChannelOptions} [extras] Extra information to supply for creating this channel
 * @returns {BaseChannel} Any kind of channel.
 * @ignore
 */
function createChannel(client, data, guild, { allowUnknownGuild } = {}) {
  let channel;
  if (!data.guild_id && !guild) {
    if ((data.recipients && data.type !== ChannelType.GroupDM) || data.type === ChannelType.DM) {
      channel = new (getDMChannel())(client, data);
    } else if (data.type === ChannelType.GroupDM) {
      channel = new (getPartialGroupDMChannel())(client, data);
    }
  } else {
    guild ??= client.guilds.cache.get(data.guild_id);

    if (guild || allowUnknownGuild) {
      switch (data.type) {
        case ChannelType.GuildText: {
          channel = new (getTextChannel())(guild, data, client);
          break;
        }
        case ChannelType.GuildVoice: {
          channel = new (getVoiceChannel())(guild, data, client);
          break;
        }
        case ChannelType.GuildCategory: {
          channel = new (getCategoryChannel())(guild, data, client);
          break;
        }
        case ChannelType.GuildAnnouncement: {
          channel = new (getAnnouncementChannel())(guild, data, client);
          break;
        }
        case ChannelType.GuildStageVoice: {
          channel = new (getStageChannel())(guild, data, client);
          break;
        }
        case ChannelType.AnnouncementThread:
        case ChannelType.PublicThread:
        case ChannelType.PrivateThread: {
          channel = new (getThreadChannel())(guild, data, client);
          if (!allowUnknownGuild) channel.parent?.threads.cache.set(channel.id, channel);
          break;
        }
        case ChannelType.GuildDirectory:
          channel = new (getDirectoryChannel())(guild, data, client);
          break;
        case ChannelType.GuildForum:
          channel = new (getForumChannel())(guild, data, client);
          break;
        case ChannelType.GuildMedia:
          channel = new (getMediaChannel())(guild, data, client);
          break;
      }
      if (channel && !allowUnknownGuild) guild.channels?.cache.set(channel.id, channel);
    }
  }
  return channel;
}

/**
 * Transforms an API guild forum tag to camel-cased guild forum tag.
 * @param {APIGuildForumTag} tag The tag to transform
 * @returns {GuildForumTag}
 * @ignore
 */
function transformAPIGuildForumTag(tag) {
  return {
    id: tag.id,
    name: tag.name,
    moderated: tag.moderated,
    emoji:
      (tag.emoji_id ?? tag.emoji_name)
        ? {
            id: tag.emoji_id,
            name: tag.emoji_name,
          }
        : null,
  };
}

/**
 * Transforms a camel-cased guild forum tag to an API guild forum tag.
 * @param {GuildForumTag} tag The tag to transform
 * @returns {APIGuildForumTag}
 * @ignore
 */
function transformGuildForumTag(tag) {
  return {
    id: tag.id,
    name: tag.name,
    moderated: tag.moderated,
    emoji_id: tag.emoji?.id ?? null,
    emoji_name: tag.emoji?.name ?? null,
  };
}

/**
 * Transforms an API guild forum default reaction object to a
 * camel-cased guild forum default reaction object.
 * @param {APIGuildForumDefaultReactionEmoji} defaultReaction The default reaction to transform
 * @returns {DefaultReactionEmoji}
 * @ignore
 */
function transformAPIGuildDefaultReaction(defaultReaction) {
  return {
    id: defaultReaction.emoji_id,
    name: defaultReaction.emoji_name,
  };
}

/**
 * Transforms a camel-cased guild forum default reaction object to an
 * API guild forum default reaction object.
 * @param {DefaultReactionEmoji} defaultReaction The default reaction to transform
 * @returns {APIGuildForumDefaultReactionEmoji}
 * @ignore
 */
function transformGuildDefaultReaction(defaultReaction) {
  return {
    emoji_id: defaultReaction.id,
    emoji_name: defaultReaction.name,
  };
}

module.exports = {
  createChannel,
  transformAPIGuildForumTag,
  transformGuildForumTag,
  transformAPIGuildDefaultReaction,
  transformGuildDefaultReaction,
};
