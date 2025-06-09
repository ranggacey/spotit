"use server";

import { Artist, Paging } from "@/lib/types";

/**
 * Retrieves a paginated list of followed artists for the authenticated user.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} after - (optional) The last artist ID retrieved. Used for pagination.
 * @param {number} [limit] - (optional) The maximum number of artists to retrieve (default: 50).
 *
 * @returns {Promise<Paging<Artist>>} A Promise that resolves to a Paging object containing the list of followed artists.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-followed
 */
export default async function getFollowedArtists(
  token: string,
  after?: string,
  limit: number = 50
): Promise<Paging<Artist>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&after=${after}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<Artist> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
