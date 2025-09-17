import logo from '/src/assets/images/logo.svg'

export default function Header() {
 return(
    <header>
    <img src={logo} className="logo"/>
    <h1 className="title">Lemme Cook</h1>
    </header>
 )   
}