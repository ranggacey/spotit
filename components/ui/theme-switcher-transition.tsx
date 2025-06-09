"use client";
import * as Switch from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export function ThemeSwitcherTransition() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const ref = useRef(null);

    const toggleDarkMode = async (isDarkMode: boolean) => {
        /**
         * Return early if View Transition API is not supported
         * or user prefers reduced motion
         */
        if (
            !ref ||
            // @ts-ignore
            !document.startViewTransition
        ) {
            setIsDarkMode(isDarkMode);
            return;
        }

        // @ts-ignore
        await document.startViewTransition(() => {
            flushSync(() => {
                setIsDarkMode(isDarkMode);
            });
        }).ready;

        // @ts-ignore
        const { top, left, width, height } = ref.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <Switch.Root checked={ isDarkMode } onCheckedChange={ toggleDarkMode } className="h-10 px-4 py-2 transition-color rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <Switch.Thumb ref={ ref }>
                { isDarkMode ? (
                    <Moon />
                ) : (
                    <Sun />
                ) }
            </Switch.Thumb>
        </Switch.Root>
    );
}