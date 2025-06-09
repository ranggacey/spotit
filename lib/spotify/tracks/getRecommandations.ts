"use server";

import { Recommendations } from "@/lib/types";

/**
 * Retrieves recommendations based on the provided parameters.
 *
 * @param token - The access token for the Spotify API.
 * @param seedArtists - An array of seed artist IDs.
 * @param seedGenres - An array of seed genre names.
 * @param seedTracks - An array of seed track IDs.
 * @param limit - The maximum number of recommendations to return.
 * @param market - An ISO 3166-1 alpha-2 country code to limit the results to a specific market.
 * @param minAcousticness - The minimum value for acousticness.
 * @param maxAcousticness - The maximum value for acousticness.
 * @param targetAcousticness - The target value for acousticness.
 * @param minDanceability - The minimum value for danceability.
 * @param maxDanceability - The maximum value for danceability.
 * @param targetDanceability - The target value for danceability.
 * @param minDurationMs - The minimum value for track duration in milliseconds.
 * @param maxDurationMs - The maximum value for track duration in milliseconds.
 * @param targetDurationMs - The target value for track duration in milliseconds.
 * @param minEnergy - The minimum value for energy.
 * @param maxEnergy - The maximum value for energy.
 * @param targetEnergy - The target value for energy.
 * @param minInstrumentalness - The minimum value for instrumentalness.
 * @param maxInstrumentalness - The maximum value for instrumentalness.
 * @param targetInstrumentalness - The target value for instrumentalness.
 * @param minKey - The minimum value for key.
 * @param maxKey - The maximum value for key.
 * @param targetKey - The target value for key.
 * @param minLiveness - The minimum value for liveness.
 * @param maxLiveness - The maximum value for liveness.
 * @param targetLiveness - The target value for liveness.
 * @param minLoudness - The minimum value for loudness.
 * @param maxLoudness - The maximum value for loudness.
 * @param targetLoudness - The target value for loudness.
 * @param minMode - The minimum value for mode.
 * @param maxMode - The maximum value for mode.
 * @param targetMode - The target value for mode.
 * @param minPopularity - The minimum value for popularity.
 * @param maxPopularity - The maximum value for popularity.
 * @param targetPopularity - The target value for popularity.
 * @param minSpeechiness - The minimum value for speechiness.
 * @param maxSpeechiness - The maximum value for speechiness.
 * @param targetSpeechiness - The target value for speechiness.
 * @param minTempo - The minimum value for tempo.
 * @param maxTempo - The maximum value for tempo.
 * @param targetTempo - The target value for tempo.
 * @param minTimeSignature - The minimum value for time signature.
 * @param maxTimeSignature - The maximum value for time signature.
 * @param targetTimeSignature - The target value for time signature.
 * @param minValence - The minimum value for valence.
 * @param maxValence - The maximum value for valence.
 * @param targetValence - The target value for valence.
 *
 * @returns A Promise that resolves to the recommendations.
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export default async function getRecommandations(
  token: string,
  seedArtists: string[],
  seedGenres: string[],
  seedTracks: string[],
  limit?: number,
  market?: string,
  minAcousticness?: number,
  maxAcousticness?: number,
  targetAcousticness?: number,
  minDanceability?: number,
  maxDanceability?: number,
  targetDanceability?: number,
  minDurationMs?: number,
  maxDurationMs?: number,
  targetDurationMs?: number,
  minEnergy?: number,
  maxEnergy?: number,
  targetEnergy?: number,
  minInstrumentalness?: number,
  maxInstrumentalness?: number,
  targetInstrumentalness?: number,
  minKey?: number,
  maxKey?: number,
  targetKey?: number,
  minLiveness?: number,
  maxLiveness?: number,
  targetLiveness?: number,
  minLoudness?: number,
  maxLoudness?: number,
  targetLoudness?: number,
  minMode?: number,
  maxMode?: number,
  targetMode?: number,
  minPopularity?: number,
  maxPopularity?: number,
  targetPopularity?: number,
  minSpeechiness?: number,
  maxSpeechiness?: number,
  targetSpeechiness?: number,
  minTempo?: number,
  maxTempo?: number,
  targetTempo?: number,
  minTimeSignature?: number,
  maxTimeSignature?: number,
  targetTimeSignature?: number,
  minValence?: number,
  maxValence?: number,
  targetValence?: number
): Promise<Recommendations> {
  try {
    const res: Response = await fetch(
      `https://api.spotify.com/v1/recommendations?
    ${seedArtists.length > 0 ? `seed_artists=${seedArtists.join(",")}&` : ""}
    ${seedGenres.length > 0 ? `seed_genres=${seedGenres.join(",")}&` : ""}
    ${seedTracks.length > 0 ? `seed_tracks=${seedTracks.join(",")}&` : ""}
    ${limit ? `limit=${limit}&` : ""}
    ${market ? `market=${market}&` : ""}
    ${minAcousticness ? `min_acousticness=${minAcousticness}&` : ""}
    ${maxAcousticness ? `max_acousticness=${maxAcousticness}&` : ""}
    ${targetAcousticness ? `target_acousticness=${targetAcousticness}&` : ""}
    ${minDanceability ? `min_danceability=${minDanceability}&` : ""}
    ${maxDanceability ? `max_danceability=${maxDanceability}&` : ""}
    ${targetDanceability ? `target_danceability=${targetDanceability}&` : ""}
    ${minDurationMs ? `min_duration_ms=${minDurationMs}&` : ""}
    ${maxDurationMs ? `max_duration_ms=${maxDurationMs}&` : ""}
    ${targetDurationMs ? `target_duration_ms=${targetDurationMs}&` : ""}
    ${minEnergy ? `min_energy=${minEnergy}&` : ""}
    ${maxEnergy ? `max_energy=${maxEnergy}&` : ""}
    ${targetEnergy ? `target_energy=${targetEnergy}&` : ""}
    ${minInstrumentalness ? `min_instrumentalness=${minInstrumentalness}&` : ""}
    ${maxInstrumentalness ? `max_instrumentalness=${maxInstrumentalness}&` : ""}
    ${
      targetInstrumentalness
        ? `target_instrumentalness=${targetInstrumentalness}&`
        : ""
    }
    ${minKey ? `min_key=${minKey}&` : ""}
    ${maxKey ? `max_key=${maxKey}&` : ""}
    ${targetKey ? `target_key=${targetKey}&` : ""}
    ${minLiveness ? `min_liveness=${minLiveness}&` : ""}
    ${maxLiveness ? `max_liveness=${maxLiveness}&` : ""}
    ${targetLiveness ? `target_liveness=${targetLiveness}&` : ""}
    ${minLoudness ? `min_loudness=${minLoudness}&` : ""}
    ${maxLoudness ? `max_loudness=${maxLoudness}&` : ""}
    ${targetLoudness ? `target_loudness=${targetLoudness}&` : ""}
    ${minMode ? `min_mode=${minMode}&` : ""}
    ${maxMode ? `max_mode=${maxMode}&` : ""}
    ${targetMode ? `target_mode=${targetMode}&` : ""}
    ${minPopularity ? `min_popularity=${minPopularity}&` : ""}
    ${maxPopularity ? `max_popularity=${maxPopularity}&` : ""}
    ${targetPopularity ? `target_popularity=${targetPopularity}&` : ""}
    ${minSpeechiness ? `min_speechiness=${minSpeechiness}&` : ""}
    ${maxSpeechiness ? `max_speechiness=${maxSpeechiness}&` : ""}
    ${targetSpeechiness ? `target_speechiness=${targetSpeechiness}&` : ""}
    ${minTempo ? `min_tempo=${minTempo}&` : ""}
    ${maxTempo ? `max_tempo=${maxTempo}&` : ""}
    ${targetTempo ? `target_tempo=${targetTempo}&` : ""}
    ${minTimeSignature ? `min_time_signature=${minTimeSignature}&` : ""}
    ${maxTimeSignature ? `max_time_signature=${maxTimeSignature}&` : ""}
    ${
      targetTimeSignature ? `target_time_signature=${targetTimeSignature}&` : ""
    }
    ${minValence ? `min_valence=${minValence}&` : ""}
    ${maxValence ? `max_valence=${maxValence}&` : ""}
    ${targetValence ? `target_valence=${targetValence}&` : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Recommendations = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
