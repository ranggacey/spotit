"use server";

/**
 * Removes saved albums from a user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} albumsIds - An array of album IDs to be removed.
 *
 * @returns {Promise<void>} A promise that resolves when the albums are successfully removed.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
 */
export default async function removeSavedAlbums(
  token: string,
  albumsIds: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/albums?ids=${albumsIds.join(",")}`,
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
