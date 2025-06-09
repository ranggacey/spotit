"use server";

/**
 * Creates a playlist on Spotify.
 *
 * @param {string} token - The access token for the Spotify API.
 * @param {string} userId - The user ID of the owner of the playlist.
 * @param {string} name - The name of the playlist.
 * @param {string} [description] - (optional) The description of the playlist.
 * @param {boolean} [isPublic] - (optional) Indicates whether the playlist is public.
 * @param {boolean} [isCollaborative] - (optional) Indicates whether the playlist is collaborative.
 *
 * @returns {Promise<void>} A promise that resolves when the playlist is created successfully.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/create-playlist
 */
export default async function createPlaylist(
  token: string,
  userId: string,
  name: string,
  description?: string,
  isPublic?: boolean,
  isCollaborative?: boolean
): Promise<void> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
          collaborative: isCollaborative,
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
