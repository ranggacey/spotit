"use server";

/**
 * Retrieves the available genre seeds from Spotify API.
 *
 * @param {string} token - The access token for the Spotify API.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of available genre seeds.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
 */
export default async function getAvailableGenreSeeds(
  token: string
): Promise<string[]> {
  try {
    const res: Response = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: string[] = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
