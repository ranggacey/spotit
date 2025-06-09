"use server";

import { Artist } from "@/lib/types";

/**
 * Retrieves the related artists for a given artist.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} artistId - The ID of the artist.
 *
 * @returns {Promise<{ artists: Artist[] }>} A promise that resolves to an object containing an array of related artists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
 */
export default async function getArtistRelatedArtists(
  token: string,
  artistId: string
): Promise<{ artists: Artist[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: { artists: Artist[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
