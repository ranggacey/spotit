"use server";

import { AudioAnalysis } from "@/lib/types";

/**
 * Retrieves the audio analysis for a specific track from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} trackId - The ID of the track to retrieve the audio analysis for.
 *
 * @returns {Promise<AudioAnalysis>} A promise that resolves to the audio analysis of the track.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export default async function getTracksAudioAnalysis(
  token: string,
  trackId: string
): Promise<AudioAnalysis> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audio-analysis/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: AudioAnalysis = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
