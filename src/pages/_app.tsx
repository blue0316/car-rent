import type { AppProps } from 'next/app'

import LayoutDefault from "@/components/layouts/default";

import '@/styles/globals.css'
import '@/styles/styles.scss'
// import "swiper/css";

// export const server = "http://localhost:8000/"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutDefault>
      <Component {...pageProps} />
    </LayoutDefault>
  )
}
