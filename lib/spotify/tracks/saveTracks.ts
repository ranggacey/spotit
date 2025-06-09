"use server";

/**
 * Saves the specified tracks to the user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} tracksIds - An array of track IDs to be saved.
 *
 * @returns {Promise<void>} A promise that resolves when the tracks are successfully saved.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
 */
export default async function saveTracks(
  token: string,
  tracksIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/tracks?ids=${tracksIds.join(",")}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
