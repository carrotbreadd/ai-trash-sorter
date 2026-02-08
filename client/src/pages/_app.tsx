// client/src/pages/_app.tsx
import "@/src/app/globals.css"; // make sure this path points to your globals.css

export default function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}


