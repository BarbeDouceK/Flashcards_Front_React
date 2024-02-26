function NavBar() {

    return (
        <>
            <div className="navbar bg-base-100 border-r mr-5">
                <div className="navbar-left hidden lg:flex">
                    <ul className="menu menu-vertical px-1">
                        <li>
                            <a href="/">HomePage</a>
                        </li>
                        <li>
                            <a href="/cards">Cards</a>
                        </li>
                        <li>
                            <a href="/card">Card</a>
                        </li>
                        <li>
                            <a href="/auth">Authentification</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavBar