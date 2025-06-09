"use server";

/**
 * Checks if the specified albums are saved in the user's Spotify library.
 *
 * @param {string} token - The Spotify access token.
 * @param {string[]} albumsIds - The IDs of the albums to check.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether each album is saved or not.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
 */
export default async function checkSavedAlbums(
  token: string,
  albumsIds: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/albums/contains?ids=${albumsIds.join(
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
