"use client"
import Header from "@/components/header"
import styles from "./styles.module.scss"
import "../scss/_reset.scss"
import MenuHamburguer from "@/components/menuHamburguer"
import { useNavContext } from "@/contexts/navContext"
import Hero from "@/components/hero"
import Content from "@/components/content"

export default function Home() {

  const { mobileMenu }: any = useNavContext()

  return (
    <section>
      <main className={ styles.container }>
        <Header/>
        <Hero/>
        <Content/>
      </main>
      { mobileMenu && <MenuHamburguer/> }
    </section>
  )
}
