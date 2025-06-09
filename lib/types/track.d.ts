import { Artist, SimplifiedArtist } from "./artist";
import { SimplifiedAlbum } from "./album";
import {
  ExternalUrl,
  SpotifyType,
  Restriction,
  ExternalID,
  Saved,
} from "./global";

/**
 * The saved track object.
 */
export type SavedTrack = Saved<"track", Track>;

/**
 * The structure containing the simplified details of the Spotify Track.
 *
 * @property artists - The artists who performed the track.
 * @property available_markets - A list of the countries in which the track can be played.
 * @property disc_number - The disc number (usually 1 unless the album consists of more than one disc).
 * @property duration_ms - The track length in milliseconds.
 * @property explicit - Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).
 * @property external_urls - External URLs for this track.
 * @property href - A link to the Web API endpoint providing full details of the track.
 * @property id - The Spotify ID for the track.
 * @property is_local - Whether or not the track is from a local file.
 * @property is_playable - Part of the response when Track Relinking is applied. If true , the track is playable in the given market. Otherwise false.
 * @property linked_from - Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists.
 * @property name - The name of the track.
 * @property preview_url - A URL to a 30 second preview (MP3 format) of the track.
 * @property restrictions - Included in the response when a content restriction is applied.
 * @property track_number - The number of the track. If an album has several discs, the track number is the number on the specified disc.
 * @property type - The object type: “track”.
 * @property uri - The Spotify URI for the track.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
 */
export interface SimplifiedTrack {
  /** The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist. */
  artists: SimplifiedArtist[];
  /** A list of the countries in which the track can be played. */
  available_markets?: string[];
  /** The disc number (usually 1 unless the album consists of more than one disc). */
  disc_number: number;
  /** The track length in milliseconds. */
  duration_ms: number;
  /** Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). */
  explicit: boolean;
  /** External URLs for this track. */
  external_urls: ExternalUrl;
  /** A link to the Web API endpoint providing full details of the track. */
  href: string;
  /** The Spotify ID for the track. */
  id: string;
  /** Whether or not the track is from a local file. */
  is_local: boolean;
  /** Part of the response when Track Relinking is applied. If true , the track is playable in the given market. Otherwise false. */
  is_playable?: boolean;
  /** Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists. */
  linked_from?: LinkedTrack;
  /** The name of the track. */
  name: string;
  /** A URL to a 30 second preview (MP3 format) of the track. */
  preview_url: string;
  /** Included in the response when a content restriction is applied. */
  restrictions: Restriction[];
  /** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
  track_number: number;
  /** The object type: “track”. */
  type: SpotifyType;
  /** The Spotify URI for the track. */
  uri: string;
}

/**
 * The structure containing the entire details of the Spotify Track.
 *
 * @extends SimplifiedTrack
 * @property album - The album on which the track appears.
 * @property artists - The artists who performed the track.
 * @property external_ids - Known external IDs for the track.
 * @property popularity - The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export interface Track extends SimplifiedTrack {
  /** The album on which the track appears.  */
  album: SimplifiedAlbum;
  /** The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist. */
  artists: Artist[];
  /** Known external IDs for the track. */
  external_ids: ExternalID;
  /** The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. */
  popularity: number;
}

/**
 * The structure of the spotify linked track object.
 *
 * @property external_urls - A map of url name and the url.
 * @property href - The api url where you can get the full details of the linked track.
 * @property id - The id of the linked track.
 * @property type - The type of spotify object.
 * @property uri - The uri of this object.
 */
export interface LinkedTrack {
  /** A map of url name and the url. */
  external_urls: ExternalUrl;
  /** The api url where you can get the full details of the linked track. */
  href: string;
  /** The id of the linked track. */
  id: string;
  /** The type of spotify object. */
  type: SpotifyType;
  /** The uri of this object. */
  uri: string;
}

/**
 * An object containing all the features of the audio.
 *
 * @extends TuneableTrack
 * @property analysis_url - An HTTP URL to access the full audio analysis of this track. An access token is required to access this data.
 * @property id - The Spotify ID of the track.
 * @property track_href - A link to the Web API endpoint providing full details of the track.
 * @property type - The object type: “audio_features”
 * @property uri - The Spotify URI for the track.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 */
export interface AudioFeatures extends Omit<TuneableTrack, "popularity"> {
  /** An HTTP URL to access the full audio analysis of this track. An access token is required to access this data. */
  analysis_url: string;
  /** The Spotify ID of the track. */
  id: string;
  /** A link to the Web API endpoint providing full details of the track. */
  track_href: string;
  /** The object type: “audio_features” */
  type: string;
  /** The Spotify URI for the track. */
  uri: string;
}

/**
 * The tuneable track object.
 *
 * @property acousticness - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
 * @property danceability - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
 * @property duration_ms - The duration of the track in milliseconds.
 * @property energy - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.
 * @property instrumentalness - Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”.
 * @property key - The key the track is in. Integers map to pitches using standard Pitch Class notation.
 * @property liveness - Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.
 * @property loudness - The overall loudness of a track in decibels (dB).
 * @property mode - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
 * @property popularity - The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
 * @property speechiness - Speechiness detects the presence of spoken words in a track.
 * @property tempo - The overall estimated tempo of a track in beats per minute (BPM).
 * @property time_signature - An estimated overall time signature of a track.
 * @property valence - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 */
export interface TuneableTrack {
  /** A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. */
  acousticness: number;
  /** Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. */
  danceability: number;
  /** The duration of the track in milliseconds. */
  duration_ms: number;
  /** Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. */
  energy: number;
  /** Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. */
  instrumentalness: number;
  /** The key the track is in. Integers map to pitches using standard Pitch Class notation. */
  key: number;
  /** Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. */
  liveness: number;
  /** The overall loudness of a track in decibels (dB). */
  loudness: number;
  /** Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0. */
  mode: number;
  /** The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. */
  popularity: number;
  /** Speechiness detects the presence of spoken words in a track. */
  speechiness: number;
  /** The overall estimated tempo of a track in beats per minute (BPM). */
  tempo: number;
  /** An estimated overall time signature of a track. */
  time_signature: number;
  /** A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. */
  valence: number;
}

/**
 * Time interval object of [TrackAudioAnalysis].
 *
 * @property start - The starting point of the time interval.
 * @property duration - The duration of the time interval.
 * @property confidence - The confidence of the time interval.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export interface TimeInterval {
  /** The starting point of the time interval. */
  start: number;
  /** The duration of the time interval. */
  duration: number;
  /** The confidence of the time interval. */
  confidence: number;
}

/**
 * The element structure of the array of [AudioAnalysis.sections] property.
 *
 * @property start - The starting point of the section.
 * @property duration - The duration of the section.
 * @property confidence - The confidence of the section.
 * @property loudness - The average loudness of the section.
 * @property tempo - The tempo of the section.
 * @property tempo_confidence - The confidence of the tempo.
 * @property key - The key of the section.
 * @property key_confidence - The confidence of the key.
 * @property mode_confidence - The confidence of the modality.
 * @property time_signature - The time signature of the section.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export interface AudioSection {
  /** The starting point of the section. */
  start: number;
  /** The duration of the section. */
  duration: number;
  /** The confidence of the section. */
  confidence: number;
  /** The average loudness of the section. */
  loudness: number;
  /** The tempo of the section. */
  tempo: number;
  /** The confidence of the tempo. */
  tempo_confidence: number;
  /** The key of the section. */
  key: number;
  /** The confidence of the key. */
  key_confidence: number;
  /** The confidence of the modality. */
  mode_confidence: number;
  /** The time signature of the section. */
  time_signature: number;
  /** The confidence of the time signature. */
  time_signature_confidence: number;
}

/**
 * The element structure of the array of [AudioAnalysis.segments] property.
 *
 * @property start - The starting point of the segment.
 * @property duration - The duration of the segment.
 * @property confidence - The confidence of the segment.
 * @property loudness_start - The starting loudness of the segment.
 * @property loudness_max - The maximum loudness of the segment.
 * @property loudness_max_time - The time of the maximum loudness.
 * @property loudness_end - The ending loudness of the segment.
 * @property pitches - Pitch values of the segment.
 * @property timbre - Timbre values of the segment.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export interface AudioSegment {
  /** The starting point of the segment. */
  start: number;
  /** The duration of the segment. */
  duration: number;
  /** The confidence of the segment. */
  confidence: number;
  /** The starting loudness of the segment. */
  loudness_start: number;
  /** The maximum loudness of the segment. */
  loudness_max: number;
  /** The time of the maximum loudness. */
  loudness_max_time: number;
  /** The ending loudness of the segment. */
  loudness_end: number;
  /** Pitch values of the segment. */
  pitches: number[];
  /** Timbre values of the segment. */
  timbre: number[];
}

/**
 * The object structure of [AudioAnalysis.track] property.
 *
 * @property duration - The duration of the track in milliseconds.
 * @property sample_md5 - The md5 hash of the samples of the track.
 * @property offset_seconds - The offset of the track.
 * @property window_seconds - The window of the track.
 * @property analysis_sample_rate - The analysis sample rate of the track.
 * @property analysis_channels - The analysis channels of the track.
 * @property end_of_fade_in - The end of the fade in of the track.
 * @property start_of_fade_out - The start of the fade out of the track.
 * @property loudness - The loudness of the track.
 * @property tempo - The tempo of the track.
 * @property tempo_confidence - The confidence of the tempo.
 * @property time_signature - The time signature of the track.
 * @property time_signature_confidence - The confidence of the time signature.
 * @property key - The key of the track.
 * @property key_confidence - The confidence of the key.
 * @property mode - The modality of the track.
 * @property mode_confidence - The confidence of the modality.
 * @property codestring - The code string of the track.
 * @property code_version - The code version of the track.
 * @property echoprintstring - The echoprint string of the track.
 * @property echoprint_version - The echoprint version of the track.
 * @property synchstring - The synch string of the track.
 * @property synch_version - The synch version of the track.
 * @property rhythmstring - The rhythm string of the track.
 * @property rhythm_version - The rhythm version of the track.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export interface AudioTrack {
  /** The duration of the track in milliseconds. */
  duration: number;
  /** The md5 hash of the samples of the track. */
  sample_md5: string;
  /** The offset of the track. */
  offset_seconds: number;
  /** The window of the track. */
  window_seconds: number;
  /** The analysis sample rate of the track. */
  analysis_sample_rate: number;
  /** The analysis channels of the track. */
  analysis_channels: number;
  /** The end of the fade in of the track. */
  end_of_fade_in: number;
  /** The start of the fade out of the track. */
  start_of_fade_out: number;
  /** The loudness of the track. */
  loudness: number;
  /** The tempo of the track. */
  tempo: number;
  /** The confidence of the tempo. */
  tempo_confidence: number;
  /** The time signature of the track. */
  time_signature: number;
  /** The confidence of the time signature. */
  time_signature_confidence: number;
  /** The key of the track. */
  key: number;
  /** The confidence of the key. */
  key_confidence: number;
  /** The modality of the track. */
  mode: number;
  /** The confidence of the modality. */
  mode_confidence: number;
  /** The code string of the track. */
  codestring: string;
  /** The code version of the track. */
  code_version: number;
  /** The echoprint string of the track. */
  echoprintstring: string;
  /** The echoprint version of the track. */
  echoprint_version: number;
  /** The synch string of the track. */
  synchstring: string;
  /** The synch version of the track. */
  synch_version: number;
  /** The rhythm string of the track. */
  rhythmstring: string;
  /** The rhythm version of the track. */
  rhythm_version: number;
}

/**
 * The object structure returned by [/audio-analysis/{id}] endpoint.
 *
 * @property bars - The time intervals of the bars throughout the track.
 * @property beats - The time intervals of the beats throughout the track.
 * @property tatums - The time intervals of the tatums throughout the track.
 * @property sections - The sections of the track.
 * @property segments - The segments of the track.
 * @property track - The track object.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export interface AudioAnalysis {
  /** The time intervals of the bars throughout the track. */
  bars: TimeInterval[];
  /** The time intervals of the beats throughout the track. */
  beats: TimeInterval[];
  /** The time intervals of the tatums throughout the track. */
  tatums: TimeInterval[];
  /** The sections of the track. */
  sections: AudioSection[];
  /** The segments of the track. */
  segments: AudioSegment[];
  /** The track object. */
  track: AudioTrack;
}
