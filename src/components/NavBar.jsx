function NavBar() {

    return (
        <>
                <div className="navbar-left">
                    <ul className="menu menu-vertical px-1">
                        <li>
                            <a href="/">HomePage</a>
                        </li>
                        <li>
                            <a href="/cards">Cards</a>
                        </li>
                        <li>
                            <a href="/card/1">Card n°1</a>
                        </li>
                        <li>
                            <a href="/auth">Authentification</a>
                        </li>
                        <li>
                            <a href="/tiroir">Vos cartes</a>
                        </li>
                        <li>
                            <a href="/daily">Vos Dailys</a>
                        </li>
                    </ul>
                </div>
        </>
    );
}

export default NavBar