"use server";

import { Episode } from "@/lib/types";

/**
 * Retrieves an episode from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} episodeId - The ID of the episode to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Episode>} A promise that resolves to the retrieved episode.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-episode
 */
export default async function getEpisode(
  token: string,
  episodeId: string,
  market?: string
): Promise<Episode> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/episodes/${episodeId}${
        market ? `?market=${market}` : ""
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

    const data: Episode = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
