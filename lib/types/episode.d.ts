import { SimplifiedShow } from "./show";
import { ExternalUrl, Image, Restriction, Saved, SpotifyType } from "./global";

/**
 * The saved episode object.
 */
export type SavedEpisode = Saved<"episode", Episode>;

/**
 * The structure containing the simplified details of the Spotify episode.
 *
 * @property audio_preview_url - A URL to a 30 second preview (MP3 format) of the episode. null if not available.
 * @property description - A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
 * @property duration_ms - The episode length in milliseconds.
 * @property explicit - Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
 * @property external_urls - External URLs for this episode
 * @property href - A link to the Web API endpoint providing full details of the episode.
 * @property html_description - A description of the episode. This field may contain HTML tags.
 * @property id - The Spotify ID for the episode.
 * @property images - The cover art for the episode in various sizes, widest first.
 * @property is_externally_hosted - True if the episode is hosted outside of Spotify’s CDN.
 * @property is_playable - True if the episode is playable in the given market. Otherwise false.
 * @property language - The language used in the episode, identified by a ISO 639 code.
 * @property languages - A list of the languages used in the episode, identified by their ISO 639 code.
 * @property name - The name of the episode.
 * @property release_date - The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".
 * @property release_date_precision - The precision with which release_date value is known: "year", "month", or "day".
 * @property restrictions - Included in the response when a content restriction is applied.
 * @property resume_point - The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope ‘user-read-playback-position’.
 * @property type - The object type: “episode”.
 * @property uri - The Spotify URI for the episode
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
 */
export interface SimplifiedEpisode {
  /** A URL to a 30 second preview (MP3 format) of the episode. null if not available. */
  audio_preview_url: string | null;
  /** A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
  description: string;
  /** The episode length in milliseconds. */
  duration_ms: number;
  /** Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
  explicit: boolean;
  /** External URLs for this episode */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the episode. */
  href: string;
  /** A description of the episode. This field may contain HTML tags. */
  html_description: string;
  /** The Spotify ID for the episode. */
  id: string;
  /** The cover art for the episode in various sizes, widest first. */
  images: Image[];
  /** True if the episode is hosted outside of Spotify’s CDN. */
  is_externally_hosted: boolean;
  /** True if the episode is playable in the given market. Otherwise false. */
  is_playable: boolean;
  /** The language used in the episode, identified by a ISO 639 code. */
  language?: string;
  /** A list of the languages used in the episode, identified by their ISO 639 code. */
  languages: string[];
  /** The name of the episode. */
  name: string;
  /** The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12". */
  release_date: string;
  /** The precision with which release_date value is known: "year", "month", or "day". */
  release_date_precision: string;
  /** Included in the response when a content restriction is applied. */
  restrictions: Restriction[];
  /** The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope ‘user-read-playback-position’. */
  resume_point?: ResumePoint;
  /** The object type: “episode”. */
  type: SpotifyType;
  /** The Spotify URI for the episode */
  uri: string;
}

/**
 * The structure containing the entire details of the Spotify episode.
 *
 * @extends SimplifiedEpisode
 * @property show - The show on which the episode belongs.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-episode
 */
export interface Episode extends SimplifiedEpisode {
  /** The show on which the episode belongs. */
  show: SimplifiedShow;
}

/**
 * An object containing the resume point.
 *
 * @property fully_played - Whether or not the episode has been fully played by the user.
 * @property resume_position_ms - The user’s most recent position in the episode in milliseconds.
 */
export interface ResumePoint {
  /** Whether or not the episode has been fully played by the user. */
  fully_played: boolean;
  /** The user’s most recent position in the episode in milliseconds. */
  resume_position_ms: number;
}
