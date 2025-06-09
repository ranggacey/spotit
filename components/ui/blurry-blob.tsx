import { clx } from "@/lib/utils/clx/clx-merge";

export const BlurryBlob = clx.div("relative w-full max-w-lg");
export const Blob = clx.div(
    "absolute animate-pop-blob rounded-sm p-8 opacity-100 mix-blend-multiply blur-3xl filter",
    "bg-purple-400",
    "size-72",
);
