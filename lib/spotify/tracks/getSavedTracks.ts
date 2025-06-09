"use server";

import { Paging, SavedTrack } from "@/lib/types";

/**
 * Retrieves the saved tracks for a user from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of items to retrieve (default: 50).
 *
 * @returns A promise that resolves to an array of SavedTrack objects.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
 */
export default async function getSavedTracks(
  token: string,
  offset: number = 0,
  limit: number = 50
): Promise<Paging<SavedTrack>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=${limit ?? 20}${
        offset ? `&offset=${offset}` : ""
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

    const data: Paging<SavedTrack> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
