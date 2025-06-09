"use server";

/**
 * Skips to the previous track in the user's Spotify player.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} deviceId - (optional) The ID of the device on which to skip to the previous track. Default is user's currently active device.
 *
 * @returns {Promise<void>} A Promise that resolves to void.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
 */
export default async function skipToNext(
  token: string,
  deviceId?: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/me/player/next${
        deviceId ? `?device_id=${deviceId}` : ""
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
