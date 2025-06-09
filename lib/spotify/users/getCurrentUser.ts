"use server";

import { PrivateUser } from "@/lib/types";

/**
 * Retrieves the current user's information from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 *
 * @returns {Promise<PrivateUser>} A promise that resolves to the current user's information.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export default async function getCurrentUser(
  token: string
): Promise<PrivateUser> {
  try {
    const res: Response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: PrivateUser = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
