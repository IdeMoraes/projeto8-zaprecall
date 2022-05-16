import Logo from "../../assets/logo.png";
import './style.css';

export default function HomePage(props){
    return(
        <div className="home-container">
            <img src={Logo} alt="ZapRecall"/>
            <p>ZapRecall</p>
            <button onClick={()=>props.setPage('deck')}>Iniciar Recall!</button>
        </div>
    )
}