"use server";

/**
 * Adds an item to the Spotify player's queue.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} uri - The URI of the item to be added to the queue.
 * @param {string} [deviceId] - (Optional) The ID of the device on which to add the item. Default is user's currently active device.
 *
 * @returns {Promise<void>} A promise that resolves when the item is successfully added to the queue.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/add-to-queue
 */
export default async function addItemToQueue(
  token: string,
  uri: string,
  deviceId?: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/player/queue?uri=${uri}${
        deviceId ? `&device_id=${deviceId}` : ""
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
