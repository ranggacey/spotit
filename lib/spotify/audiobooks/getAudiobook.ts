"use server";

import { Audiobook } from "@/lib/types";

/**
 * Retrieves an audiobook from Spotify API.
 *
 * @param {string} token - The access token for authorization.
 * @param {string} audiobookId - The ID of the audiobook to retrieve.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Audiobook>} A promise that resolves to the retrieved audiobook.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
 */
export default async function getAudiobook(
  token: string,
  audiobookId: string,
  market?: string
): Promise<Audiobook> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/audiobooks/${audiobookId}${
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

    const data: Audiobook = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
