"use server";

import { Artist } from "@/lib/types";

/**
 * Retrieves information about several artists from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} artistsIds - An array of artist IDs.
 *
 * @returns {Promise<{ artists: Artist[] }>} A promise that resolves to an object containing an array of artists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
 */
export default async function getSeveralArtists(
  token: string,
  artistsIds: string[]
): Promise<{ artists: Artist[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/artists?ids=${artistsIds.join(",")}`,
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
