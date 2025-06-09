"use server";

/**
 * Saves episodes to the user's Spotify library.
 *
 * @param {string} token - The user's access token.
 * @param {string[]} episodesIds - An array of episode IDs to be saved.
 *
 * @returns {Promise<void>} A promise that resolves when the episodes are saved successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/save-episodes-user
 */
export default async function saveEpisodes(
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
