"use server";

/**
 * Adds a custom image cover to a playlist.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} playlistId - The ID of the playlist.
 * @param {string} image - The image to be set as the playlist cover.
 *
 * @returns {Promise<void>} A promise that resolves when the image cover is added successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
 */
export default async function addCustomPlaylistImageCover(
  token: string,
  playlistId: string,
  image: string
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "image/jpeg",
        },
        body: image,
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
