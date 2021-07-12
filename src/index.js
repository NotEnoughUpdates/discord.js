'use strict';

module.exports = {
  // "Root" classes (starting points)
  BaseClient: require('./client/BaseClient'),
  Client: require('./client/Client'),
  Shard: require('./sharding/Shard'),
  ShardClientUtil: require('./sharding/ShardClientUtil'),
  ShardingManager: require('./sharding/ShardingManager'),
  WebhookClient: require('./client/WebhookClient'),

  // Utilities
  ActivityFlags: require('./util/ActivityFlags'),
  ApplicationFlags: require('./util/ApplicationFlags'),
  BitField: require('./util/BitField'),
  Collection: require('./util/Collection'),
  Constants: require('./util/Constants'),
  DataResolver: require('./util/DataResolver'),
  Formatters: require('./util/Formatters'),
  BaseManager: require('./managers/BaseManager'),
  DiscordAPIError: require('./rest/DiscordAPIError'),
  HTTPError: require('./rest/HTTPError'),
  RateLimitError: require('./rest/RateLimitError'),
  LimitedCollection: require('./util/LimitedCollection'),
  MessageFlags: require('./util/MessageFlags'),
  Intents: require('./util/Intents'),
  Options: require('./util/Options'),
  Permissions: require('./util/Permissions'),
  SnowflakeUtil: require('./util/SnowflakeUtil'),
  Structures: require('./util/Structures'),
  SystemChannelFlags: require('./util/SystemChannelFlags'),
  ThreadMemberFlags: require('./util/ThreadMemberFlags'),
  UserFlags: require('./util/UserFlags'),
  Util: require('./util/Util'),
  version: require('../package.json').version,

  // Managers
  ApplicationCommandManager: require('./managers/ApplicationCommandManager'),
  ApplicationCommandPermissionsManager: require('./managers/ApplicationCommandPermissionsManager'),
  BaseGuildEmojiManager: require('./managers/BaseGuildEmojiManager'),
  ChannelManager: require('./managers/ChannelManager'),
  GuildApplicationCommandManager: require('./managers/GuildApplicationCommandManager'),
  GuildBanManager: require('./managers/GuildBanManager'),
  GuildChannelManager: require('./managers/GuildChannelManager'),
  GuildEmojiManager: require('./managers/GuildEmojiManager'),
  GuildEmojiRoleManager: require('./managers/GuildEmojiRoleManager'),
  GuildMemberManager: require('./managers/GuildMemberManager'),
  GuildMemberRoleManager: require('./managers/GuildMemberRoleManager'),
  GuildManager: require('./managers/GuildManager'),
  ReactionManager: require('./managers/ReactionManager'),
  ReactionUserManager: require('./managers/ReactionUserManager'),
  MessageManager: require('./managers/MessageManager'),
  PermissionOverwriteManager: require('./managers/PermissionOverwriteManager'),
  PresenceManager: require('./managers/PresenceManager'),
  RoleManager: require('./managers/RoleManager'),
  ThreadManager: require('./managers/ThreadManager'),
  ThreadMemberManager: require('./managers/ThreadMemberManager'),
  UserManager: require('./managers/UserManager'),

  // Structures
  Application: require('./structures/interfaces/Application'),
  ApplicationCommand: require('./structures/ApplicationCommand'),
  Base: require('./structures/Base'),
  Activity: require('./structures/Presence').Activity,
  BaseGuild: require('./structures/BaseGuild'),
  BaseGuildEmoji: require('./structures/BaseGuildEmoji'),
  BaseGuildVoiceChannel: require('./structures/BaseGuildVoiceChannel'),
  BaseMessageComponent: require('./structures/BaseMessageComponent'),
  ButtonInteraction: require('./structures/ButtonInteraction'),
  CategoryChannel: require('./structures/CategoryChannel'),
  Channel: require('./structures/Channel'),
  ClientApplication: require('./structures/ClientApplication'),
  ClientUser: require('./structures/ClientUser'),
  Collector: require('./structures/interfaces/Collector'),
  CommandInteraction: require('./structures/CommandInteraction'),
  DMChannel: require('./structures/DMChannel'),
  Emoji: require('./structures/Emoji'),
  Guild: require('./structures/Guild'),
  GuildAuditLogs: require('./structures/GuildAuditLogs'),
  GuildBan: require('./structures/GuildBan'),
  GuildChannel: require('./structures/GuildChannel'),
  GuildEmoji: require('./structures/GuildEmoji'),
  GuildMember: require('./structures/GuildMember'),
  GuildPreview: require('./structures/GuildPreview'),
  GuildTemplate: require('./structures/GuildTemplate'),
  Integration: require('./structures/Integration'),
  IntegrationApplication: require('./structures/IntegrationApplication'),
  Interaction: require('./structures/Interaction'),
  InteractionCollector: require('./structures/InteractionCollector'),
  InteractionWebhook: require('./structures/InteractionWebhook'),
  Invite: require('./structures/Invite'),
  Message: require('./structures/Message'),
  MessageActionRow: require('./structures/MessageActionRow'),
  MessageAttachment: require('./structures/MessageAttachment'),
  MessageButton: require('./structures/MessageButton'),
  MessageCollector: require('./structures/MessageCollector'),
  MessageComponentInteraction: require('./structures/MessageComponentInteraction'),
  MessageEmbed: require('./structures/MessageEmbed'),
  MessageMentions: require('./structures/MessageMentions'),
  MessagePayload: require('./structures/MessagePayload'),
  MessageReaction: require('./structures/MessageReaction'),
  MessageSelectMenu: require('./structures/MessageSelectMenu'),
  NewsChannel: require('./structures/NewsChannel'),
  OAuth2Guild: require('./structures/OAuth2Guild'),
  PermissionOverwrites: require('./structures/PermissionOverwrites'),
  Presence: require('./structures/Presence').Presence,
  ClientPresence: require('./structures/ClientPresence'),
  ReactionCollector: require('./structures/ReactionCollector'),
  ReactionEmoji: require('./structures/ReactionEmoji'),
  RichPresenceAssets: require('./structures/Presence').RichPresenceAssets,
  Role: require('./structures/Role'),
  SelectMenuInteraction: require('./structures/SelectMenuInteraction'),
  Sticker: require('./structures/Sticker'),
  StageInstance: require('./structures/StageInstance'),
  StoreChannel: require('./structures/StoreChannel'),
  StageChannel: require('./structures/StageChannel'),
  Team: require('./structures/Team'),
  TeamMember: require('./structures/TeamMember'),
  TextChannel: require('./structures/TextChannel'),
  ThreadChannel: require('./structures/ThreadChannel'),
  ThreadMember: require('./structures/ThreadMember'),
  User: require('./structures/User'),
  VoiceChannel: require('./structures/VoiceChannel'),
  VoiceRegion: require('./structures/VoiceRegion'),
  VoiceState: require('./structures/VoiceState'),
  Webhook: require('./structures/Webhook'),
  Widget: require('./structures/Widget'),
  WidgetMember: require('./structures/WidgetMember'),

  WebSocket: require('./WebSocket'),
};
