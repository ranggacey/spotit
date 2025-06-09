"use server";

/**
 * Removes saved shows from the user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} showsIds - An array of show IDs to be removed.
 *
 * @returns {Promise<void>} A promise that resolves when the shows are successfully removed.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
 */
export default async function removeSavedShows(
  token: string,
  showsIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/shows?ids=${showsIds.join(",")}`,
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
