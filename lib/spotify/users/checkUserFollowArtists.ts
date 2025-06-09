"use server";

/**
 * Checks if a user is following a list of artists.
 *
 * @param {string} token - The user's access token.
 * @param {string[]} artistsIds - An array of artist IDs to check.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether the user is following each artist.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
 */
export default async function checkUserFollowArtists(
  token: string,
  artistsIds: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistsIds.join(
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
