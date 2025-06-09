"use server";

/**
 * Removes saved episodes from the user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} episodesIds - An array of episode IDs to be removed.
 *
 * @returns {Promise<void>} A promise that resolves when the episodes are successfully removed.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user
 */
export default async function removeSavedEpisodes(
  token: string,
  episodesIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/episodes?ids=${episodesIds.join(",")}`,
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
