"use server";

/**
 * Checks if episodes are saved in the user's Spotify library.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} episodesIds - An array of episode IDs to check.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether each episode is saved.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes
 */
export default async function checkSavedEpisodes(
  token: string,
  episodesIds: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/episodes/contains?ids=${episodesIds.join(
        ","
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: boolean[] = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
