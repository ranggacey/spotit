"use server";

import { Artist } from "@/lib/types";

/**
 * Retrieves information about an artist from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} artistId - The ID of the artist to retrieve information for.
 *
 * @returns {Promise<Artist>} A promise that resolves to the artist information.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export default async function getArtist(
  token: string,
  artistId: string
): Promise<Artist> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Artist = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
