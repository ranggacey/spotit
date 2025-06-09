"use server";

import { Episode } from "@/lib/types";

/**
 * Retrieves several episodes from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} episodesIds - An array of episode IDs to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{ episodes: Episode[] }>} A promise that resolves to an object containing the retrieved episodes.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes
 */
export default async function getSeveralEpisodes(
  token: string,
  episodesIds: string[],
  market?: string
): Promise<{ episodes: Episode[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/episodes?ids=${episodesIds.join(",")}${
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

    const data: { episodes: Episode[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
