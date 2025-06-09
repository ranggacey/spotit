"use server";

import { Paging, SpotifyType } from "@/lib/types";
import { Artist } from "@/lib/types";
import { Track } from "@/lib/types";

/**
 * Retrieves the top items for a user from the Spotify API.
 *
 * @param {string} token - The access token for the user.
 * @param {SpotifyType} type - The type of top items to retrieve (e.g., "artists", "tracks").
 * @param {string} timeRange - The time range for the top items (e.g., "short_term", "medium_term", "long_term").
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of items to retrieve (default: 50).
 *
 * @returns {Promise<Paging<Artist | Track>>} A promise that resolves to a paging object containing the top items (artists or tracks).
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export default async function getUserTopItems(
  token: string,
  type: SpotifyType,
  timeRange: string,
  offset: number = 0,
  limit: number = 50
): Promise<Paging<Artist | Track>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<Artist | Track> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
