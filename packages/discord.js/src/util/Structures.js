'use strict';

/**
 * An extendable structure:
 * * **`GuildEmoji`**
 * * **`DMChannel`**
 * * **`TextChannel`**
 * * **`VoiceChannel`**
 * * **`CategoryChannel`**
 * * **`NewsChannel`**
 * * **`StageChannel`**
 * * **`ThreadChannel`**
 * * **`GuildMember`**
 * * **`ThreadMember`**
 * * **`Guild`**
 * * **`Message`**
 * * **`MessageReaction`**
 * * **`Presence`**
 * * **`ClientPresence`**
 * * **`VoiceState`**
 * * **`Role`**
 * * **`User`**
 * * **`StageInstance`**
 * * **`ChatInputCommandInteraction`**
 * * **`ButtonInteraction`**
 * * **`SelectMenuInteraction`**
 * * **`ChannelSelectMenuInteraction`**
 * * **`MentionableSelectMenuInteraction`**
 * * **`RoleSelectMenuInteraction`**
 * * **`StringSelectMenuInteraction`**
 * * **`UserSelectMenuInteraction`**
 * * **`MessageContextMenuCommandInteraction`**
 * * **`AutocompleteInteraction`**
 * * **`UserContextMenuCommandInteraction`**
 * * **`ModalSubmitInteraction`**
 * * **`DirectoryChannel`**
 * * **`PartialGroupDMChannel`**
 * * **`ForumChannel`**
 * @typedef {string} ExtendableStructure
 */

/**
 * Allows for the extension of built-in Discord.js structures that are instantiated by {@link BaseManager Managers}.
 */
class Structures extends null {
  /**
   * Retrieves a structure class.
   * @param {string} structure Name of the structure to retrieve
   * @returns {Function}
   */
  static get(structure) {
    if (typeof structure === 'string') return structures[structure];
    throw new TypeError(`"structure" argument must be a string (received ${typeof structure})`);
  }

  /**
   * Extends a structure.
   * <warn> Make sure to extend all structures before instantiating your client.
   * Extending after doing so may not work as expected. </warn>
   * @param {ExtendableStructure} structure Name of the structure class to extend
   * @param {Function} extender Function that takes the base class to extend as its only parameter and returns the
   * extended class/prototype
   * @returns {Function} Extended class/prototype returned from the extender
   * @example
   * const { Structures } = require('discord.js');
   *
   * Structures.extend('Guild', Guild => {
   *   class CoolGuild extends Guild {
   *     constructor(client, data) {
   *       super(client, data);
   *       this.cool = true;
   *     }
   *   }
   *
   *   return CoolGuild;
   * });
   */
  static extend(structure, extender) {
    if (!structures[structure]) throw new RangeError(`"${structure}" is not a valid extensible structure.`);
    if (typeof extender !== 'function') {
      const received = `(received ${typeof extender})`;
      throw new TypeError(
        `"extender" argument must be a function that returns the extended structure class/prototype ${received}.`,
      );
    }

    const extended = extender(structures[structure]);
    if (typeof extended !== 'function') {
      const received = `(received ${typeof extended})`;
      throw new TypeError(`The extender function must return the extended structure class/prototype ${received}.`);
    }

    if (!(extended.prototype instanceof structures[structure])) {
      const prototype = Object.getPrototypeOf(extended);
      const received = `${extended.name ?? 'unnamed'}${prototype.name ? ` extends ${prototype.name}` : ''}`;
      throw new Error(
        'The class/prototype returned from the extender function must extend the existing structure class/prototype' +
          ` (received function ${received}; expected extension of ${structures[structure].name}).`,
      );
    }

    structures[structure] = extended;
    return extended;
  }
}

const structures = {
  GuildEmoji: require('../structures/GuildEmoji'),
  DMChannel: require('../structures/DMChannel'),
  TextChannel: require('../structures/TextChannel'),
  VoiceChannel: require('../structures/VoiceChannel'),
  CategoryChannel: require('../structures/CategoryChannel'),
  NewsChannel: require('../structures/NewsChannel'),
  StageChannel: require('../structures/StageChannel'),
  ThreadChannel: require('../structures/ThreadChannel'),
  GuildMember: require('../structures/GuildMember').GuildMember,
  ThreadMember: require('../structures/ThreadMember'),
  Guild: require('../structures/Guild').Guild,
  Message: require('../structures/Message').Message,
  MessageReaction: require('../structures/MessageReaction'),
  Presence: require('../structures/Presence').Presence,
  ClientPresence: require('../structures/ClientPresence'),
  VoiceState: require('../structures/VoiceState'),
  Role: require('../structures/Role').Role,
  User: require('../structures/User'),
  StageInstance: require('../structures/StageInstance').StageInstance,
  ChatInputCommandInteraction: require('../structures/ChatInputCommandInteraction'),
  ButtonInteraction: require('../structures/ButtonInteraction'),
  SelectMenuInteraction: require('../structures/SelectMenuInteraction'),
  ChannelSelectMenuInteraction: require('../structures/ChannelSelectMenuInteraction'),
  MentionableSelectMenuInteraction: require('../structures/MentionableSelectMenuInteraction'),
  RoleSelectMenuInteraction: require('../structures/RoleSelectMenuInteraction'),
  StringSelectMenuInteraction: require('../structures/StringSelectMenuInteraction'),
  UserSelectMenuInteraction: require('../structures/UserSelectMenuInteraction'),
  MessageContextMenuCommandInteraction: require('../structures/MessageContextMenuCommandInteraction'),
  AutocompleteInteraction: require('../structures/AutocompleteInteraction'),
  UserContextMenuCommandInteraction: require('../structures/UserContextMenuCommandInteraction'),
  ModalSubmitInteraction: require('../structures/ModalSubmitInteraction'),
  DirectoryChannel: require('../structures/DirectoryChannel'),
  PartialGroupDMChannel: require('../structures/PartialGroupDMChannel'),
  ForumChannel: require('../structures/ForumChannel'),
};

module.exports = Structures;
