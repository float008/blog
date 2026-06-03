import { Figtree, Geist_Mono, Noto_Sans_SC, Sora } from "next/font/google";

// Latin body font
export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans-latin",
  display: "swap",
});

// CJK body font — large glyph file, so avoid preloading and limit weights.
export const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-sans-cjk",
  display: "swap",
  preload: false,
});

// Display / heading font for the "vivid" look
export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = [
  figtree.variable,
  notoSansSC.variable,
  sora.variable,
  geistMono.variable,
].join(" ");
