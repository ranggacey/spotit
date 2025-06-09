"use server";

/**
 * Follows the specified users on Spotify.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} userIds - An array of user IDs to follow.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
 */
export default async function followUsers(
  token: string,
  userIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/following?type=user&ids=${userIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
