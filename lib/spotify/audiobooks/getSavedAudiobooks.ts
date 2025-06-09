"use server";

import { Audiobook, Paging } from "@/lib/types";

/**
 * Retrieves the saved audiobooks for the authenticated user.
 *
 * @param {string} token - The access token for making the API request.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of audiobooks to retrieve per request (default: 50).
 *
 * @returns {Promise<Paging<Audiobook>>} A promise that resolves to the paginated list of audiobooks.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks
 */
export default async function getSavedAudiobooks(
  token: string,
  offset: number = 0,
  limit: number = 50
): Promise<Paging<Audiobook>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/audiobooks?offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<Audiobook> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
