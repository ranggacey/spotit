"use server";

import { Category } from "@/lib/types";

/**
 * Retrieves a category from the Spotify API.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} categoryId - The ID of the category to retrieve.
 * @param {string} [fields] - (optional) Fields to include in the response.
 *
 * @returns {Promise<Category>} A promise that resolves to the retrieved category object.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-a-category
 */
export default async function getCategory(
  token: string,
  categoryId: string,
  fields?: string
): Promise<Category> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}${
        fields ? `?fields=${fields}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Category = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
