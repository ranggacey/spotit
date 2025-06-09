"use server";

/**
 * Checks if the user has saved tracks in their Spotify library.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} ids - An array of track IDs to check for.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether each track ID is saved by the user.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
 */
export default async function checkSavedTracks(
  token: string,
  ids: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${ids.join(",")}`,
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
