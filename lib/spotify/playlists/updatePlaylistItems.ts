"use server";

/**
 * Updates the items in a playlist.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist to update.
 * @param {string[]} uris - An array of URIs representing the items to add to the playlist.
 * @param {number} [rangeStart] - (optional) The index of the first item to replace or add.
 * @param {number} [position] - (optional) The position at which to insert the items.
 * @param {number} [rangeLength] - (optional) The number of items to replace or add.
 * @param {string} [snapshotId] - (optional) The snapshot ID of the playlist.
 *
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
 */
export default async function updatePlaylistItems(
  token: string,
  playlistId: string,
  uris: string[],
  rangeStart?: number,
  position?: number,
  rangeLength?: number,
  snapshotId?: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris,
          range_start: rangeStart,
          position,
          range_length: rangeLength,
          snapshot_id: snapshotId,
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
