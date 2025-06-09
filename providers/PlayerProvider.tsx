"use client";

import React, { createContext, useEffect } from "react";

// Tambahkan deklarasi tipe untuk Spotify SDK
declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

// Deklarasi namespace Spotify untuk TypeScript
namespace Spotify {
  export interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(event: string, callback: (data: any) => void): void;
    removeListener(event: string, callback: (data: any) => void): void;
  }

  export interface PlayerInit {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
    volume?: number;
  }

  export interface ErrorEvent {
    message: string;
  }

  export interface ReadyEvent {
    device_id: string;
  }
}

export const PlayerContext = createContext<Spotify.Player | undefined>(undefined);

export default function PlayerProvider({ children, token }: { children: React.ReactNode; token: string; }) {

    const [player, setPlayer] = React.useState<Spotify.Player | undefined>();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log("player ready");
            setPlayer(player);
            if (!player) {
                const player = new window.Spotify.Player({
                    name: "Spotifyer",
                    getOAuthToken: (cb: (token: string) => void) => {
                        cb(token);
                    },
                    volume: 0.5,
                });
                // Error handling
                player.addListener("initialization_error", ({ message }: Spotify.ErrorEvent) => {
                    console.error(message);
                });
                player.addListener("authentication_error", ({ message }: Spotify.ErrorEvent) => {
                    console.error(message);
                });
                player.addListener("account_error", ({ message }: Spotify.ErrorEvent) => {
                    console.error(message);
                });
                player.addListener("playback_error", ({ message }: Spotify.ErrorEvent) => {
                    console.error(message);
                });
                // Playback status updates
                player.addListener("player_state_changed", (state: any) => {
                    console.log(state);
                });
                // Ready
                player.addListener("ready", ({ device_id }: Spotify.ReadyEvent) => {
                    console.log("Ready with Device ID", device_id);
                });
                // Not Ready
                player.addListener("not_ready", ({ device_id }: Spotify.ReadyEvent) => {
                    console.log("Device ID has gone offline", device_id);
                });
                // Connect to the player!
                player.connect();
                player.disconnect();
            }
        };
    }, []);

    return (
        <PlayerContext.Provider value={ player }>
            { children }
        </PlayerContext.Provider>
    );
}