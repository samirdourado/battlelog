"use client"
import Header from "@/components/header"
import styles from "./styles.module.scss"
import MenuHamburguer from "@/components/menuHamburguer"
import { useNavContext } from "@/contexts/navContext"
import Hero from "@/components/hero"

export default function Home() {

  const { mobileMenu }: any = useNavContext()

  return (
    <section>
      <main className={ styles.container }>
        <Header/>
        <Hero/>
      </main>
      { mobileMenu && <MenuHamburguer/> }
    </section>
  )
}
