"use server";

import { Album, Paging } from "@/lib/types";

/**
 * Retrieves new releases from Spotify's API.
 *
 * @param {string} token - The access token for authentication.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of albums to retrieve (default: 50).
 *
 * @returns {Promise<{ albums: Paging<Album> }>} - The promise that resolves with the retrieved albums.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-new-releases
 */
export default async function getNewReleases(
  token: string,
  offset: number = 0,
  limit: number = 50
): Promise<{ albums: Paging<Album> }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: { albums: Paging<Album> } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
