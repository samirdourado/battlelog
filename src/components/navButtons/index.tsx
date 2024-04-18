import Link from "next/link"

const NavButtons = () => {
    return (
        <>
            <nav>
            <Link href={'/'}>Axies</Link>
            <Link href={'/'}>Leaderboard</Link>
            <Link href={'/'}>Guilds</Link>
            <Link href={'/'}>Runes</Link>
            <Link href={'/'}>Ranking</Link>
            </nav>
            <button>HM</button>
        </>
    )
}

export default NavButtons