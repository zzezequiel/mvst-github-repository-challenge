import { Providers } from "@/providers/Provides";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />;
    </Providers>
  )
}
