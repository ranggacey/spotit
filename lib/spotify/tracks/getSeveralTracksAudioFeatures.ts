"use server";

import { AudioFeatures } from "@/lib/types";

/**
 * Retrieves the audio features of several tracks from the Spotify API.
 *
 * @param {string} token - The access token for authenticating the request.
 * @param {string[]} ids - An array of track IDs for which to retrieve the audio features.
 *
 * @returns {Promise<{audio_features: AudioFeatures[]}>} A promise that resolves to an array of audio features for the specified tracks.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
 */
export default async function getSeveralTracksAudioFeatures(
  token: string,
  ids: string[]
): Promise<{ audio_features: AudioFeatures[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${ids.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: { audio_features: AudioFeatures[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
