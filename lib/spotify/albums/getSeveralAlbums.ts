"use server";

import { Album } from "@/lib/types";

/**
 * Retrieves information about several albums from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} albumsIds - An array of album IDs.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{ albums: Album[] }>} A promise that resolves to an object containing the retrieved albums.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
 */
export default async function getSeveralAlbums(
  token: string,
  albumsIds: string[],
  market?: string
): Promise<{ albums: Album[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/albums?ids=${albumsIds.join(",")}${
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

    const data: { albums: Album[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
