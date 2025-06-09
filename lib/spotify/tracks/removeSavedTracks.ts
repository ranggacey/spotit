"use server";

/**
 * Removes saved tracks from a user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} ids - An array of track IDs to be removed.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the tracks were successfully removed.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
 */
export default async function removeSavedTracks(
  token: string,
  ids: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/tracks?ids=${ids.join(",")}`,
      {
        method: "DELETE",
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
