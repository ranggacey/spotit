"use server";

/**
 * Saves the specified audiobooks for the authenticated user.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} audiobooksIds - An array of audiobook IDs to be saved.
 *
 * @returns {Promise<void>} A promise that resolves when the audiobooks are saved successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/save-audiobooks-user
 */
export default async function saveAudiobooks(
  token: string,
  audiobooksIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/audiobooks?ids=${audiobooksIds.join(",")}`,
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
