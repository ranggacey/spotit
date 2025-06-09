"use server";

/**
 * Checks if the user follows the specified playlists.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string[]} playlistId - The IDs of the playlists to check.
 *
 * @returns {Promise<boolean[]>} A promise that resolves to an array of booleans indicating whether the user follows each playlist.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
 */
export default async function checkUserFollowPlaylists(
  token: string,
  playlistId: string[]
): Promise<boolean[]> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`,
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
