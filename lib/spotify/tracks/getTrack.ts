"use server";

import { Track } from "@/lib/types";

/**
 * Retrieves a track from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} trackId - The ID of the track to retrieve.
 *
 * @returns {Promise<Track>} A promise that resolves to the retrieved track.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export default async function getTrack(
  token: string,
  trackId: string
): Promise<Track> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Track = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
