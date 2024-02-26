import NavBar from "./NavBar";

function Cadre(){
    return(
        <>
            <div className="p-8">
                <div className="px-6">
                    <div className="">
                        <a href="/"><h1>Application FlashCards</h1></a>
                    </div>
                    <div>
                        <NavBar/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadre;