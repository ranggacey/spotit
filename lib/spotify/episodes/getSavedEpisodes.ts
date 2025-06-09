"use server";

import { Paging, SavedEpisode } from "@/lib/types";

/**
 * Retrieves a list of saved episodes from Spotify using the provided access token.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of episodes to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<SavedEpisode>>} A promise that resolves to a paging object containing saved episode data.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes
 */
export default async function getSavedEpisodes(
  token: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<SavedEpisode>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/episodes?offset=${offset}&limit=${limit}${
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

    const data: Paging<SavedEpisode> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
