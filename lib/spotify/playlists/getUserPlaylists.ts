"use server";

import { Paging, SimplifiedPlaylist } from "@/lib/types";

/**
 * Retrieves the playlists of a user from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} userId - The ID of the user whose playlists are being retrieved.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of playlists to retrieve (default: 50).
 *
 * @returns {Promise<Paging<SimplifiedPlaylist>>} A Promise that resolves to the retrieved playlists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
 */
export default async function getUserPlaylists(
  token: string,
  userId: string,
  offset: number = 0,
  limit: number = 50
): Promise<Paging<SimplifiedPlaylist>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists?offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<SimplifiedPlaylist> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
