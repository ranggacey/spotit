"use server";

/**
 * Adds items to a playlist.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} playlistId - The ID of the playlist to add items to.
 * @param {string[]} uris - An array of URIs representing the items to add.
 * @param {number} [position] - (optional) The position at which to insert the items in the playlist.
 *
 * @returns {Promise<void>} A promise that resolves when the items are successfully added to the playlist.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
 */
export default async function addItemsToPlaylist(
  token: string,
  playlistId: string,
  uris: string[],
  position?: number
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris,
          position,
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
