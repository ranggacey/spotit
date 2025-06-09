"use server";

/**
 * Checks if the specified shows are saved in the user's Spotify library.
 *
 * @param {string} token - The access token for the user's Spotify account.
 * @param {string[]} showsIds - An array of show IDs to check.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether each show is saved or not.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows
 */
export default async function checkSavedShows(
  token: string,
  showsIds: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/shows/contains?ids=${showsIds.join(",")}`,
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
