import { Image } from "./global";
import { SimplifiedTrack, TuneableTrack } from "./track";

/**
 * An object containing details about the spotify category.
 *
 * @property href - A link to the Web API endpoint returning full details of the category.
 * @property icons - The category icon, in various sizes.
 * @property id - The Spotify category ID of the category.
 * @property name - The name of the category.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-category
 */
export interface Category {
  /** A link to the Web API endpoint returning full details of the category. */
  href: string;
  /** The category icon, in various sizes. */
  icons: Image[];
  /** The Spotify category ID of the category. */
  id: string;
  /** The name of the category. */
  name: string;
}

/**
 * The spotify recommendation seed object.
 *
 * @property afterFilteringSize - The number of tracks available after min_* and max_* filters have been applied.
 * @property afterRelinkingSize - The number of tracks available after relinking for regional availability.
 * @property href - A link to the full track or artist data for this seed.
 * @property id - The id used to select this seed. This will be the same as the string used in the seed_artists, seed_tracks or seed_genres parameter.
 * @property initialPoolSize - The number of recommended tracks available for this seed.
 * @property type - The entity type of this seed.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export interface RecommendationSeed {
  /** The number of tracks available after min_* and max_* filters have been applied. */
  afterFilteringSize: number;
  /** The number of tracks available after relinking for regional availability. */
  afterRelinkingSize: number;
  /** A link to the full track or artist data for this seed. */
  href: string;
  /** The id used to select this seed. This will be the same as the string used in the seed_artists, seed_tracks or seed_genres parameter. */
  id: string;
  /** The number of recommended tracks available for this seed. */
  initialPoolSize: number;
  /** The entity type of this seed. */
  type: "artist" | "track" | "genre";
}

/**
 * The collection of recommendation seed objects with tracks provided from the spotify api.
 *
 * @property seeds - An array of recommendation seed objects.
 * @property tracks - An array of track object (simplified) ordered according to the parameters supplied.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export interface Recommendations {
  /** An array of recommendation seed objects. */
  seeds: RecommendationSeed[];
  /** An array of track object (simplified) ordered according to the parameters supplied. */
  tracks: SimplifiedTrack[];
}

/**
 * Just an extension for [RecommendationQuery].
 */
export type RecommendationQueryExtension<T extends string> = Partial<
  Record<`min_${T}` | `max_${T}` | `target_${T}`, number>
>;
