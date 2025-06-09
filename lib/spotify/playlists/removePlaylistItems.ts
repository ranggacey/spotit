"use server";

/**
 * Removes items from a playlist.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} playlistId - The ID of the playlist to remove items from.
 * @param {string[]} uris - An array of URIs representing the items to be removed.
 *
 * @returns {Promise<void>} A promise that resolves when the items are successfully removed.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
 */
export default async function removePlaylistItems(
  token: string,
  playlistId: string,
  uris: string[]
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: uris.map((uri) => ({ uri })),
        }),
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
