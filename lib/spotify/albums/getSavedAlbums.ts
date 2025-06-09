"use server";

import { Paging, SavedAlbum } from "@/lib/types";

/**
 * Retrieves the saved albums for a user.
 *
 * @param {string} token - The access token for the user.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of albums to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<SavedAlbum>>} A promise that resolves to the paging object containing the saved albums.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
 */
export default async function getSavedAlbums(
  token: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<SavedAlbum>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/albums?offset=${offset}&limit=${limit}${
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

    const data: Paging<SavedAlbum> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
