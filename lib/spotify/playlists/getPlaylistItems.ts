"use server";

import { Paging, PlaylistTrack } from "@/lib/types";

/**
 * Retrieves the items of a playlist from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of items to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<PlaylistTrack>>} A promise that resolves to a Paging object containing the playlist items.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
 */
export default async function getPlaylistItems(
  token: string,
  playlistId: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<PlaylistTrack>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}${
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

    const data: Paging<PlaylistTrack> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
