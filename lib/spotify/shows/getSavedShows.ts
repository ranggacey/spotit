"use server";

import { Paging, SavedShow } from "@/lib/types";

/**
 * Retrieves a paginated list of saved shows for the authenticated user.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of shows to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<SavedShow>>} A promise that resolves to an object containing the retrieved saved shows.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
 */
export default async function getSavedShows(
  token: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<SavedShow>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/shows?offset=${offset}&limit=${limit}${
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

    const data: Paging<SavedShow> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
