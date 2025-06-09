import { Artist, SimplifiedArtist } from "./artist";
import { SimplifiedTrack } from "./track";
import {
  Copyright,
  ExternalID,
  ExternalUrl,
  Image,
  SpotifyType,
  Restriction,
  Saved,
  Paging,
} from "./global";

/**
 * The types of album.
 */
export type AlbumType = "single" | "album" | "compilation";

/**
 * The groups of album.
 */
export type AlbumGroup = AlbumType | "appears_on";

/**
 * The saved album object.
 */
export type SavedAlbum = Saved<"album", Album>;

/**
 * The spotify object containing the simplified details of the Spotify Album.
 *
 * @property album_group - The field is present when getting an artist’s albums.
 * @property album_type - The type of album.
 * @property artists - The artists of the album.
 * @property available_markets - The markets in which the album is available.
 * @property external_urls - Known external URLs for this album.
 * @property href - A link to the Web API endpoint providing full details of the album.
 * @property id - The Spotify ID of the album.
 * @property images - The cover art for the album in various sizes, widest first.
 * @property name - The name of the album.
 * @property release_date - The date the album was first released, for example “1981-12-15”.
 * @property release_date_precision - The precision with which release_date value is known: “year” , “month” , or “day”.
 * @property restrictions - Included in the response when a content restriction is applied.
 * @property total_tracks - The total number of tracks in the album.
 * @property type - The object type which will be 'album'.
 * @property uri - The Spotify URI for the album.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 */
export interface SimplifiedAlbum {
  /** The field is present when getting an artist’s albums. */
  album_group?: AlbumGroup;
  /** The type of album. */
  album_type: AlbumType;
  /** The artists of the album. */
  artists: SimplifiedArtist[];
  /** The markets in which the album is available. */
  available_markets?: string[];
  /** Known external URLs for this album. */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the album. */
  href: string;
  /** The Spotify ID of the album. */
  id: string;
  /** The cover art for the album in various sizes, widest first. */
  images: Image[];
  /** The name of the album. */
  name: string;
  /** The date the album was first released, for example “1981-12-15”. */
  release_date: string;
  /** The precision with which release_date value is known: “year” , “month” , or “day”. */
  release_date_precision: string;
  /** Included in the response when a content restriction is applied. */
  restrictions: Restriction[];
  /** The total number of tracks in the album. */
  total_tracks: number;
  /** The object type which will be 'album'. */
  type: SpotifyType;
  /** The Spotify URI for the album. */
  uri: string;
}

/**
 * The spotify object containing the entire details of the Spotify Album.
 *
 * @extends SimplifiedAlbum
 * @property artists - The artists of the album.
 * @property copyrights - The copyright statements of the album.
 * @property external_ids - Known external IDs for the album.
 * @property genres - A list of the genres used to classify the album. For example: “Prog Rock” , “Post-Grunge”. (If not yet classified, the array is empty.)
 * @property label - The label for the album.
 * @property popularity - The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated from the popularity of the album’s individual tracks.
 * @property tracks - The tracks of the album.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */
export interface Album extends Omit<SimplifiedAlbum, "album_group"> {
  /** The artists of the album. */
  artists: Artist[];
  /** The copyright statements of the album. */
  copyrights: Copyright[];
  /** Known external IDs for the album. */
  external_ids: ExternalID;
  /** A list of the genres used to classify the album. For example: “Prog Rock” , “Post-Grunge”. (If not yet classified, the array is empty.) */
  genres: string[];
  /** The label for the album. */
  label: string;
  /** The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated from the popularity of the album’s individual tracks. */
  popularity: number;
  /** The tracks of the album. */
  tracks: SimplifiedTrack[] | Paging<SimplifiedTrack>;
}
