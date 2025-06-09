"use server";

import { PublicUser } from "@/lib/types";

/**
 * Retrieves a user's information from Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} userId - The ID of the user to retrieve information for.
 *
 * @returns {Promise<PublicUser>} A promise that resolves to the public user information.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-profile
 */
export default async function getUser(
  token: string,
  userId: string
): Promise<PublicUser> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: PublicUser = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
