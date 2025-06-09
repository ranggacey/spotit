"use server";

/**
 * Unfollows multiple users on Spotify.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} usersIds - An array of user IDs to unfollow.
 *
 * @returns {Promise<void>} A promise that resolves when the users are unfollowed successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
 */
export default async function unfollowUsers(
  token: string,
  usersIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/following?type=user&ids=${usersIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
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
