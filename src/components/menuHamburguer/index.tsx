import Link from "next/link"

const MenuHamburguer = () => {
    return (
        <div>
            <div>
                <button>X</button>
                <nav>
                    <Link href={'/'}>Axies</Link>
                    <Link href={'/'}>Leaderboard</Link>
                    <Link href={'/'}>Guilds</Link>
                    <Link href={'/'}>Runes</Link>
                    <Link href={'/'}>Ranking</Link>
                </nav>
            </div>
        </div>
    )
}

export default MenuHamburguer