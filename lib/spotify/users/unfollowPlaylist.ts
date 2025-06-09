"use server";

/**
 * Unfollows a playlist.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist to unfollow.
 *
 * @returns {Promise<void>} A promise that resolves when the playlist is unfollowed successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
 */
export default async function unfollowPlaylist(
  token: string,
  playlistId: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
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
