"use server";

import { FeaturedPlaylists } from "@/lib/types";

/**
 * Retrieves the playlists for a specific category.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} categoryId - The ID of the category.
 * @param {number} [offset] - (optional) The offset value for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of playlists to retrieve (default: 50).
 *
 * @returns {Promise<FeaturedPlaylists>} A promise that resolves to an object containing a message and an array of playlists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
 */
export default async function getCategoryPlaylists(
  token: string,
  categoryId: string,
  offset: number = 0,
  limit: number = 50
): Promise<FeaturedPlaylists> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: FeaturedPlaylists = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
