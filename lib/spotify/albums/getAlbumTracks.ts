"use server";

import { Paging, Track } from "@/lib/types";

/**
 * Retrieves the tracks of an album from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} albumId - The ID of the album.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of tracks to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<Track>>} A promise that resolves to the paging object containing the tracks.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
 */
export default async function getAlbumTracks(
  token: string,
  albumId: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<Track>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?offset=${offset}&limit=${limit}${
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

    const data: Paging<Track> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
