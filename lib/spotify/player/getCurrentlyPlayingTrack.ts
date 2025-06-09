"use server";

import { CurrentlyPlaying } from "@/lib/types";

/**
 * Retrieves the currently playing track from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 *
 * @returns {Promise<CurrentlyPlaying>} A promise that resolves to the currently playing track, or undefined if no track is playing.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 */
export default async function getCurrentlyPlayingTrack(
  token: string
): Promise<CurrentlyPlaying> {
  try {
    const res: Response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: CurrentlyPlaying = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
