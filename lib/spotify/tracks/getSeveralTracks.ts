"use server";

import { Track } from "@/lib/types";

/**
 * Retrieves the information of multiple tracks from Spotify API.
 *
 * @param {string} token - The access token for authorization.
 * @param {string[]} ids - An array of track IDs.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{tracks: Track[]}>} A promise that resolves to an array of Track objects.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
 */
export default async function getSeveralTracks(
  token: string,
  ids: string[],
  market?: string
): Promise<{ tracks: Track[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${ids.join(",")}${
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

    const data: { tracks: Track[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
