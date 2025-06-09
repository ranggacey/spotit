"use server";

import { RecentlyPlayed } from "@/lib/types";

/**
 * Retrieves the recently played tracks from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {number} [limit] - (optional) The maximum number of tracks to retrieve (default: 50).
 *
 * @returns {Promise<RecentlyPlayed>} A promise that resolves to the recently played tracks.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
export default async function getRecentlyPlayedTracks(
  token: string,
  limit: number = 50
): Promise<RecentlyPlayed> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: RecentlyPlayed = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
