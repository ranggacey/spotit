"use server";

import { PlayerQueue } from "@/lib/types";

/**
 * Retrieves the user's queue from the Spotify API.
 *
 * @param {string} token - The access token for authenticating the request.
 *
 * @returns {Promise<PlayerQueue>} A Promise that resolves to the user's queue as a PlayerQueue object.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-queue
 */
export default async function getUserQueue(
  token: string
): Promise<PlayerQueue> {
  try {
    const res: Response = await fetch(
      "https://api.spotify.com/v1/me/player/queue",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: PlayerQueue = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
