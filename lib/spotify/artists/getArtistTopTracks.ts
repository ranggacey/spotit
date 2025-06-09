"use server";

import { Track } from "@/lib/types";

/**
 * Retrieves the top tracks of an artist from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} artistId - The ID of the artist.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{ tracks: Track[] }>} A promise that resolves to an object containing the top tracks of the artist.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
 */
export default async function getArtistTopTracks(
  token: string,
  artistId: string,
  market?: string
): Promise<{ tracks: Track[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks${
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

    const data: { tracks: Track[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
