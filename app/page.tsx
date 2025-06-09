"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { SignInResponse } from "next-auth/react";

export default function Page() {

    return (
        <Card className="m-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login with Spotify</CardTitle>
                <CardDescription>
                    You&apos;ll be redirected to Spotify. Enter your Spotify credentials to login to your Spotifyer account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button type="submit" className="w-full" onClick={ (): Promise<SignInResponse | undefined> => signIn('spotify', { callbackUrl: '/' }) }>
                    Login
                </Button>
            </CardContent>
        </Card>
    );
}
