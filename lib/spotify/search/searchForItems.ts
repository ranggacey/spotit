"use server";

import { SearchContent, SpotifyType } from "@/lib/types";

/**
 * Searches for items in Spotify based on the provided query and type.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} query - The search query.
 * @param {SpotifyType} type - The type of item to search for.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of items to retrieve (default: 50).
 *
 * @returns {Promise<SearchContent>} A promise that resolves to the search results.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/search
 */
export default async function SearchForItems(
  token: string,
  query: string,
  type: SpotifyType,
  offset: number = 0,
  limit: number = 50
): Promise<SearchContent> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: SearchContent = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
