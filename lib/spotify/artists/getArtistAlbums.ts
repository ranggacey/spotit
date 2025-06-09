"use server";

import { Album, Paging } from "@/lib/types";

/**
 * Retrieves the albums of a specific artist from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} artistId - The ID of the artist.
 * @param {number} [offset] - (optional) The offset for pagination (default: 0).
 * @param {number} [limit] - (optional) The maximum number of artists to retrieve (default: 50).
 * @param {("album" | "single" | "appears_on" | "compilation")[]} [include_groups] - (optional) The groups of albums to include.
 * @param {string} [market] - (optional) The market (country) for which to retrieve the tracks.
 *
 * @returns {Promise<Paging<Album>>} A promise that resolves to the paging object containing the artist's albums.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 */
export default async function getArtistAlbums(
  token: string,
  artistId: string,
  offset: number = 0,
  limit: number = 50,
  include_groups?: ("album" | "single" | "appears_on" | "compilation")[],
  market?: string
): Promise<Paging<Album>> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?offset=${offset}&limit=${limit}${
        include_groups ? `&include_groups=${include_groups.join(",")}` : ""
      }${market ? `&market=${market}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Paging<Album> = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
