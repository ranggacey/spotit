"use server";

/**
 * Saves albums to the user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} albumsIds - An array of album IDs to be saved.
 *
 * @returns {Promise<void>} A promise that resolves when the albums are successfully saved.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/save-albums-user
 */
export default async function saveAlbums(
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
