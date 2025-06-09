import { SimplifiedTrack, Track } from "./track";
import { Episode } from "./episode";
import { ErrorResponse, ExternalUrl, Paging, SpotifyType } from "./global";

/**
 * The repeat state of the context.
 */
export type RepeatState = "track" | "off" | "context";

/**
 * Player error reason types.
 */
export type PlayerErrorReason =
  | "NO_PREV_TRACK"
  | "NO_NEXT_TRACK"
  | "NO_SPECIFIC_TRACK"
  | "ALREADY_PAUSED"
  | "NOT_PAUSED"
  | "NOT_PLAYING_TRACK"
  | "NOT_PLAYING_LOCALLY"
  | "NOT_PLAYING_CONTEXT"
  | "ENDLESS_CONTEXT"
  | "CONTEXT_DISALLOW"
  | "ALREADY_PLAYING"
  | "RATE_LIMITED"
  | "REMOTE_CONTROL_DISALLOW"
  | "DEVICE_NOT_CONTROLLABLE"
  | "VOLUME_CONTROL_DISALLOW"
  | "NO_ACTIVE_DEVICE"
  | "PREMIUM_REQUIRED"
  | "UNKNOWN";

/**
 * An object containing the details of a device.
 *
 * @property id - The device ID.
 * @property is_active - If this device is the currently active device.
 * @property is_private_session - If this device is currently in a private session.
 * @property is_restricted - Whether controlling this device is restricted. At present if this is “true” then no Web API commands will be accepted by this device.
 * @property name - The name of the device.
 * @property type - The device type.
 * @property volume_percent - The current volume in percent.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
 */
export interface Device {
  /** The device ID. */
  id: string | null;
  /** If this device is the currently active device. */
  is_active: boolean;
  /** If this device is currently in a private session. */
  is_private_session: boolean;
  /** Whether controlling this device is restricted. At present if this is “true” then no Web API commands will be accepted by this device. */
  is_restricted: boolean;
  /** The name of the device. */
  name: string;
  /** The device type. */
  type: "computer" | "smartphone" | "speaker";
  /** The current volume in percent. */
  volume_percent?: number;
}

/**
 * The context object of the player.
 *
 * @property external_urls - External URLs for this context.
 * @property href - A link to the Web API endpoint providing full details of the track.
 * @property type - The object type.
 * @property uri - The Spotify URI for the context.
 */
export interface PlayerContext {
  /** External URLs for this context. */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the track. */
  href: string;
  /** The object type. */
  type: SpotifyType;
  /** The Spotify URI for the context. */
  uri: string;
}

/**
 * The disallows from the CurrentlyPlayingContext object.
 *
 * @property interrupting_playback - Interrupting playback. Optional field.
 * @property pausing - Pausing.
 * @property resuming - Resuming.
 * @property seeking - Seeking playback location.
 * @property skipping_next - Skipping to the next context.
 * @property skipping_prev - Skipping to the previous context.
 * @property toggling_repeat_context - Toggling repeat context flag.
 * @property toggling_repeat_track - Toggling repeat track flag.
 * @property toggling_shuffle - Toggling shuffle flag.
 * @property transferring_playback - Transfering playback between devices.
 * @see  https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 */
export interface ContextDisallows {
  /** Interrupting playback. Optional field. */
  interrupting_playback: boolean;
  /** Pausing. */
  pausing?: boolean;
  /** Resuming. */
  resuming?: boolean;
  /** Seeking playback location. */
  seeking?: boolean;
  /** Skipping to the next context. */
  skipping_next?: boolean;
  /** Skipping to the previous context. */
  skipping_prev?: boolean;
  /** Toggling repeat context flag. */
  toggling_repeat_context?: boolean;
  /** Toggling repeat track flag. */
  toggling_repeat_track?: boolean;
  /** Toggling shuffle flag. */
  toggling_shuffle?: boolean;
  /** Transfering playback between devices. */
  transferring_playback?: boolean;
}

/**
 * The currently playing context of the player api.
 *
 * @extends CurrentlyPlaying
 * @property actions - Allows to update the user interface based on which playback actions are available within the current context.
 * @property device - The device that is currently active.
 * @property repeat_state - The repeat state.
 * @property shuffle_state - The shuffle state.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 */
export interface CurrentlyPlayingContext extends CurrentlyPlaying {
  /** Allows to update the user interface based on which playback actions are available within the current context. */
  actions: ContextDisallows;
  /** The device that is currently active. */
  device: Device;
  /** The repeat state. */
  repeat_state: RepeatState;
  /** The shuffle state. */
  shuffle_state: "on" | "off";
}

/**
 * The currently playing object of the player api.
 *
 * @property context - The context.
 * @property currently_playing_type - The object type of the currently playing item.
 * @property is_playing - If something is currently playing, return true.
 * @property progress_ms - Progress into the currently playing track or episode.
 * @property item - The item of the context.
 * @property timestamp - Unix Millisecond Timestamp when data was fetched.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 */
export interface CurrentlyPlaying {
  /** The context. */
  context: PlayerContext | null;
  /** The object type of the currently playing item. */
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  /** If something is currently playing, return true. */
  is_playing: boolean;
  /** Progress into the currently playing track or episode. */
  progress_ms: number | null;
  /** The item of the context. */
  item: Track | Episode | null;
  /** Unix Millisecond Timestamp when data was fetched. */
  timestamp: number;
}

/**
 * The cursor object of the player api.
 *
 * @property after - The cursor to use as key to find the next page of items.
 */
export interface Cursor {
  /** The cursor to use as key to find the next page of items. */
  after: string;
}

/**
 * The cursor paging object of the player api.
 *
 * @property cursors - The cursors used to find the next set of items.
 */
export interface CursorPaging<T>
  extends Omit<Paging<T>, "offset" | "previous"> {
  /** The cursors used to find the next set of items. */
  cursors: Cursor;
}

/**
 * The devices object of the player api.
 *
 * @property devices - A list of 0..n Device objects.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
 */
export interface Devices {
  /** A list of 0..n Device objects. */
  devices: Device[];
}

/**
 * The recently played object which is returned by the [Player.getRecentlyPlayed] function.
 *
 * @property cursors - The cursors to check other pages of recently played.
 * @property href - A link to the Web API endpoint providing full details of the track.
 * @property limit - The maximum number of items in the response (as set in the query or by default).
 * @property next - URL to the next page of items. ( null if none)
 * @property total - The total number of items available to return.
 * @property items - The items which have been recently played.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
export interface RecentlyPlayed {
  /** The cursors to check other pages of recently played. */
  cursors: Cursor;
  /** A link to the Web API endpoint providing full details of the track. */
  href: string;
  /** The maximum number of items in the response (as set in the query or by default). */
  limit: number;
  /** URL to the next page of items. ( null if none) */
  next?: string;
  /** The total number of items available to return. */
  total: number;
  /** The items which have been recently played. */
  items: {
    /** The track which has been played recently. */
    track: Track;
    /** The timestamp when it was played. */
    playedAt: string;
  }[];
}

/**
 * The play history object of the player api.
 * @property context - The context the track was played from.
 * @property played_at - The date and time the track was played.
 * @property track - The track the user listened to.
 */
export interface PlayHistory {
  /** The context the track was played from. */
  context: PlayerContext;
  /** The date and time the track was played. */
  played_at: string;
  /** The track the user listened to. */
  track: SimplifiedTrack;
}

/**
 * The error response sent by the spotify player api during unusual status codes.
 * @property reason - The reason for the error.
 */
export interface PlayerErrorResponse extends ErrorResponse {
  /** The reason for the error. */
  reason: PlayerErrorReason;
}

/**
 * The queue object of the player api.
 * @property currently_playing - The currently playing track.
 * @property queue - The next queue of the player.
 */
export interface PlayerQueue {
  /** The currently playing track. */
  currently_playing: Track | Episode;
  /** The next queue of the player */
  queue: Track[] | Episode[];
}
