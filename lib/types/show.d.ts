import { SimplifiedEpisode } from "./episode";
import {
  Copyright,
  ExternalUrl,
  Image,
  Paging,
  Saved,
  SpotifyType,
} from "./global";

/**
 * The saved show object.
 */
export type SavedShow = Saved<"show", Show>;

/**
 * The structure containing the simplified details of the Spotify Show.
 *
 * @property available_markets - A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
 * @property copyrights - The copyright statements of the show.
 * @property description - A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
 * @property explicit - Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
 * @property external_urls - External URLs for this show.
 * @property href - A link to the Web API endpoint providing full details of the show.
 * @property html_description - A description of the show. This field may contain HTML tags.
 * @property id - The Spotify ID for the show.
 * @property images - The cover art for the show in various sizes, widest first.
 * @property is_externally_hosted - True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases.
 * @property languages - A list of the languages used in the show, identified by their ISO 639 code.
 * @property media_type - The media type of the show.
 * @property name - The name of the show.
 * @property publisher - The publisher of the show.
 * @property type - The object type: “show”.
 * @property uri - The Spotify URI for the show.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
 */
export interface SimplifiedShow {
  /** A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code. */
  available_markets: string[];
  /** The copyright statements of the show. */
  copyrights: Copyright[];
  /** A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
  description: string;
  /** Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
  explicit: boolean;
  /** External URLs for this show. */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the show. */
  href: string;
  /** A description of the show. This field may contain HTML tags. */
  html_description: string;
  /** The Spotify ID for the show. */
  id: string;
  /** The cover art for the show in various sizes, widest first. */
  images: Image[];
  /** True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases. */
  is_externally_hosted: boolean;
  /** A list of the languages used in the show, identified by their ISO 639 code. */
  languages: string[];
  /** The media type of the show. */
  media_type: string;
  /** The name of the show. */
  name: string;
  /** The publisher of the show. */
  publisher: string;
  /** The object type: “show”. */
  type: SpotifyType;
  /** The Spotify URI for the show. */
  uri: string;
}

/**
 * The structure containing the entire details of the Spotify Show.
 *
 * @extends SimplifiedShow
 * @property episodes - A list of the show’s episodes.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-show
 */
export interface Show extends SimplifiedShow {
  /** A list of the show’s episodes. */
  episodes: SimplifiedEpisode[] | Paging<SimplifiedEpisode>;
}
