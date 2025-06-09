"use server";

import { Episode, Paging } from "@/lib/types";

/**
 * Retrieves episodes for a specific show.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} showId - The ID of the show.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of episodes to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<Episode>>} A Promise that resolves to a Paging object containing the episodes.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
 */
export default async function getShowEpisodes(
  token: string,
  showId: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<Episode>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?offset=${offset}&limit=${limit}${
        market ? `&market=${market}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<Episode> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
