"use client"
import Header from "@/components/header"
import styles from "./styles.module.scss"
import "../scss/_reset.scss"
import MenuHamburguer from "@/components/menuHamburguer"
import { useNavContext } from "@/contexts/navContext"
import Hero from "@/components/hero"
import MainContent from "@/components/mainContent"

export default function Home() {

  const { mobileMenu }: any = useNavContext()

  return (
    <section>
      <main className={ styles.container }>
        <Header/>
        <Hero/>
        <MainContent/>
      </main>
      { mobileMenu && <MenuHamburguer/> }
    </section>
  )
}
