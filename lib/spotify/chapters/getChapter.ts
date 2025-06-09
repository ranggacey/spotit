"use server";

import { Chapter } from "@/lib/types";

/**
 * Retrieves a specific chapter from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} chapterId - The ID of the chapter to retrieve.
 * @param {string} [market] - The market for which to retrieve the chapter.
 *
 * @returns {Promise<Chapter>} A promise that resolves to the retrieved chapter.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-chapter
 */
export default async function getChapter(
  token: string,
  chapterId: string,
  market?: string
): Promise<Chapter> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/chapters/${chapterId}${
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

    const data: Chapter = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
