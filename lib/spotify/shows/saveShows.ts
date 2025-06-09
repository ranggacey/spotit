"use server";

/**
 * Saves the specified shows for the authenticated user.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} showsIds - An array of show IDs to save.
 *
 * @returns {Promise<void>} A promise that resolves when the shows are saved successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/save-shows-user
 */
export default async function saveShows(
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
