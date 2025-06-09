import { SimplifiedChapter } from "./chapter";
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
 * The saved audiobook object.
 */
export type SavedAudiobook = Saved<"audiobook", Audiobook>;

/**
 * The spotify object containing the simplified details of the Spotify Audiobook.
 *
 * @property authors - The authors of the audiobook.
 * @property available_markets - The markets in which the audiobook is available.
 * @property copyrights - The field is present when getting an artist’s audiobooks.
 * @property description - A description of the audiobook.
 * @property html_description - A description of the audiobook. This field may contain HTML tags
 * @property edition - The edition of the audiobook.
 * @property explicit - Whether or not the audiobook has explicit content
 * @property external_urls - Known external URLs for this audiobook.
 * @property href - A link to the Web API endpoint providing full details of the audiobook.
 * @property id - The Spotify ID of the audiobook.
 * @property images - The cover art for the audiobook in various sizes, widest first.
 * @property languages - A list of the languages used in the audiobook, identified by their ISO 639 code.
 * @property media_type - The media type of the audiobook.
 * @property name - The name of the audiobook.
 * @property narrator - The media type of the audiobook.
 * @property total_chapters - The total number of chapters in the audiobook.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
 */
export interface SimplifiedAudiobook {
  /** The authors of the audiobook. */
  authors: {
    name: string;
  }[];
  /** The markets in which the audiobook is available. */
  available_markets: string[];
  /** The field is present when getting an artist’s audiobooks. */
  copyrights: Copyright[];
  /** A description of the audiobook. */
  description: string;
  /** A description of the audiobook. This field may contain HTML tags */
  html_description: string;
  /** The edition of the audiobook. */
  edition: string;
  /** Whether or not the audiobook has explicit content  */
  explicit: boolean;
  /** Known external URLs for this audiobook. */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the audiobook. */
  href: string;
  /** The Spotify ID of the audiobook. */
  id: string;
  /** The cover art for the audiobook in various sizes, widest first. */
  images: Image[];
  /** A list of the languages used in the audiobook, identified by their ISO 639 code. */
  languages: string[];
  /** The media type of the audiobook. */
  media_type: string;
  /** The name of the audiobook. */
  name: string;
  /** The media type of the audiobook. */
  narrator: {
    name: string;
  }[];
  /** The total number of chapters in the audiobook. */
  total_chapters: number;
}

/**
 * The spotify object containing the entire details of the Spotify Audiobook.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
 * @extends SimplifiedAudiobook
 * @property publisher - The publisher of the audiobook.
 * @property type - The object type. Allowed values: "audiobook".
 * @property chapters - The chapters of the audiobook. The object index says this is an array but the value returns as a Paging object so here is an union might be fixed in upcomming versions.
 */
export interface Audiobook
  extends Omit<SimplifiedAudiobook, "audiobook_group"> {
  /** The publisher of the audiobook. */
  publisher: string;
  /** The object type. Allowed values: "audiobook". */
  type: "audiobook";
  /** The chapters of the audiobook. The object index says this is an array but the value returns as a Paging object so here is an union might be fixed in upcomming versions. */
  chapters: SimplifiedChapter[] | Paging<SimplifiedChapter>;
}
