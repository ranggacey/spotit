"use server";

import { Playlist } from "@/lib/types";

/**
 * Retrieves a playlist from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Playlist>} A promise that resolves to the retrieved playlist.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-playlist
 */
export default async function getPlaylist(
  token: string,
  playlistId: string,
  market?: string
): Promise<Playlist> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}${
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

    const data: Playlist = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
