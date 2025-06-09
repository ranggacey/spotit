"use server";

import { AudioFeatures } from "@/lib/types";

/**
 * Retrieves the audio features of a track from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} trackId - The ID of the track.
 *
 * @returns {Promise<AudioFeatures>} A promise that resolves to the audio features of the track.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 */
export default async function getTracksAudioFeatures(
  token: string,
  trackId: string
): Promise<AudioFeatures> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: AudioFeatures = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
