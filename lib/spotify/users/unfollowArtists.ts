"use server";

/**
 * Unfollows artists on Spotify.
 *
 * @param {string} token - The access token for authentication.
 * @param {string[]} artistsIds - An array of artist IDs to unfollow.
 *
 * @returns {Promise<void>} A promise that resolves when the artists are unfollowed successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
 */
export default async function unfollowArtists(
  token: string,
  artistsIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${artistsIds.join(
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
