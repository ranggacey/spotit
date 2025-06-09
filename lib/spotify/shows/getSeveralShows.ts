"use server";

import { Show } from "@/lib/types";

/**
 * Retrieves information about several shows from the Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} showsIds - An array of show IDs.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<{shows: Show[]}>} Promise that resolves to an object containing the retrieved shows.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows
 */
export default async function getSeveralShows(
  token: string,
  showsIds: string[],
  market?: string
): Promise<{ shows: Show[] }> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/shows?ids=${showsIds.join(",")}${
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

    const data: { shows: Show[] } = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
