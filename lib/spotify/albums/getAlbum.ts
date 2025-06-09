"use server";

import { Album } from "@/lib/types";

/**
 * Retrieves information about a specific album from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} albumId - The ID of the album to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the album information.
 *
 * @returns {Promise<Album>} A promise that resolves to the album information.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */
export default async function getAlbum(
  token: string,
  albumId: string,
  market?: string
): Promise<Album> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}${
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

    const data: Album = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
