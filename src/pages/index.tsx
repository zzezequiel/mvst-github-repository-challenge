import Head from "next/head";
import { Inter } from "next/font/google";
import HomeLayaout from "@/layouts/HomeLayaout";
import HomePage from "@/components/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <HomeLayaout>
      <Head>
        <title>MVST challenge</title>
      </Head>
      <HomePage />
    </HomeLayaout>
  )
}
