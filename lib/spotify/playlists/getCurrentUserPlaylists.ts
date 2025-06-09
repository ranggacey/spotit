"use server";

import { Paging, SimplifiedPlaylist } from "@/lib/types";

/**
 * Retrieves the playlists of the current user.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {number} [offset] - (optional) The offset value for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of playlists to retrieve (default: 50).
 *
 * @returns {Promise<Paging<SimplifiedPlaylist>>} A promise that resolves to a `Paging` object containing the user's playlists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 */
export default async function getCurrentUserPlaylists(
  token: string,
  offset: number = 0,
  limit: number = 50
): Promise<Paging<SimplifiedPlaylist>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
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
