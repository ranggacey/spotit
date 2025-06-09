"use server";

/**
 * Pauses the playback on Spotify.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} [deviceId] - (optional) The ID of the device on which to pause the playback. Default is user's currently active device.
 *
 * @returns {Promise<void>} A promise that resolves when the playback is paused.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
 */
export default async function pausePlayback(
  token: string,
  deviceId?: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/player/pause${
        deviceId ? `?device_id=${deviceId}` : ""
      }`,
      {
        method: "PUT",
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
