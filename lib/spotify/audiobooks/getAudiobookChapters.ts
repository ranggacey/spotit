"use server";

import { SimplifiedChapter } from "@/lib/types";
import { Paging } from "@/lib/types";

/**
 * Retrieves the chapters of an audiobook from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} audiobookId - The ID of the audiobook.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of chapters to retrieve (default: 50).
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<SimplifiedChapter>>} A promise that resolves to an object containing the audiobook chapters.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters
 */
export default async function getAudiobookChapters(
  token: string,
  audiobookId: string,
  offset: number = 0,
  limit: number = 50,
  market?: string
): Promise<Paging<SimplifiedChapter>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audiobooks/${audiobookId}/chapters?offset=${offset}&limit=${limit}${
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

    const data: Paging<SimplifiedChapter> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
