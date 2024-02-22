function NavBar() {

    return (
        <>
            <div className="navbar bg-base-100 border-r mr-5">
                <div className="navbar-left hidden lg:flex">
                    <ul className="menu menu-vertical px-1">
                        <div className="navbar-start">
                            <a className="btn btn-ghost text-xl" href="/">HomePage</a>
                        </div>
                        <li>
                            <a href="/"></a>
                        </li>
                        <li>
                            <a href="/play">Play</a>
                        </li>
                        <li>
                            <a href="/api/v1/cards">Cards</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavBar