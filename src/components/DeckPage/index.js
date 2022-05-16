import { useState } from "react";
import Logo from '../../assets/logo.png'
import Turn from "../../assets/turn.png";
import './style.css';

export default function DeckPage(){
    const [answeredCards, setAnsweredCards] = useState(0);
    const [forgottenCards, setForgottenCards] = useState(0);
    const [answeredCardsIconsList,setAnsweredCardsIconsList] = useState([]);

    const deck = [
        {
            question: 'O que é JSX?',
            answer: 'Uma extensão de linguagem do JavaScript'
        },
        {
            question: 'O React é __',
            answer: 'uma biblioteca JavaScript para construção de interfaces'
        },
        {
            question: 'Componentes devem iniciar com __',
            answer: 'letra maiúscula'
        },
        {
            question: 'Podemos colocar __ dentro do JSX',
            answer: 'expressões'
        },
        {
            question: 'O ReactDOM nos ajuda __',
            answer: 'interagindo com a DOM para colocar componentes React na mesma'
        },
        {
            question: 'Usamos o npm para __',
            answer: 'gerenciar os pacotes necessários e suas dependências'
        },
        {
            question: 'Usamos props para __',
            answer: 'passar diferentes informações para componentes'
        },
        {
            question: 'Usamos estado (state) para __',
            answer: 'dizer para o React quais informações quando atualizadas devem renderizar a tela novamente'
        },
    ];

    deck.sort(comparador);

    return(
        <>
            <div className="deck-container">
                <header>
                    <img src={Logo} alt="ZapRecall"/>
                    <p>ZapRecall</p>
                </header>
                {deck.map((card, index) => <FlashCard question={card.question} answer={card.answer} questionNumber={index+1} answeredCards={answeredCards} setAnsweredCards={setAnsweredCards} forgottenCards={forgottenCards} setForgottenCards={setForgottenCards} answeredCardsIconsList={answeredCardsIconsList} setAnsweredCardsIconsList={setAnsweredCardsIconsList}/>)}
                <footer>
                    {(answeredCards === deck.length && forgottenCards===0) ? <><div className="awesomeResult">🥳 Parabéns!</div><div>Você não esqueceu de nenhum flashcard!</div></> : ''}
                    {(answeredCards === deck.length && forgottenCards!==0) ? <><div className="awfulResult">😥 Putz...</div><div>Ainda faltam alguns... Mas não desanime!</div></> : ''}
                    <div className="counter">{answeredCards}/{deck.length} CONCLUÍDOS</div>
                    <div className="icons">
                        {answeredCardsIconsList.map(icon=><ion-icon class={icon} name={icon}></ion-icon>)}
                    </div>
                </footer>
            </div>
        </>
    );
}

function comparador() { 
	return Math.random() - 0.5; 
}

function FlashCard(props){
    const [unopened,setUnopened]= useState("");
    const [cardFront,setCardFront]= useState("hidden");
    const [cardBack,setCardBack]= useState("hidden");
    const [forgot,setForgot]= useState("hidden");
    const [almostForgot,setAlmostForgot]= useState("hidden");
    const [remembered,setRemembered]= useState("hidden");

    return(
        <div className="flash-card ">
            <div className={"unopened-card "+unopened}>
                <p>Pergunta {props.questionNumber}</p>
                <ion-icon name="play-outline" onClick={()=>{setUnopened("hidden");setCardFront("")}}></ion-icon>
            </div>
            <div className={"card-front "+cardFront}>
                <p>{props.question}</p>
                <img src={Turn} alt="ZapRecall" onClick={()=>{setCardFront("hidden");setCardBack("")}}/>
            </div>
            <div className={"card-back "+cardBack}>
                <p>{props.answer}</p>
                <div className="buttons-container">
                    <button className="forgot" onClick={()=>{setCardBack("hidden");setForgot("");props.setAnsweredCards(props.answeredCards+1);props.setForgottenCards(props.forgottenCards+1);props.setAnsweredCardsIconsList([...props.answeredCardsIconsList,"close-circle"])}}>Não lembrei</button>
                    <button className="almost-forgot"onClick={()=>{setCardBack("hidden");setAlmostForgot("");props.setAnsweredCards(props.answeredCards+1);props.setAnsweredCardsIconsList([...props.answeredCardsIconsList,"help-circle"])}}>Quase não lembrei</button>
                    <button className="remembered"onClick={()=>{setCardBack("hidden");setRemembered("");props.setAnsweredCards(props.answeredCards+1);props.setAnsweredCardsIconsList([...props.answeredCardsIconsList,"checkmark-circle"])}}>Zap!</button>
                </div>
            </div>
            <div className={"answered-card forgot "+forgot}>
                <p>Pergunta {props.questionNumber}</p>
                <ion-icon name="close-circle"></ion-icon>
            </div>
            <div className={"answered-card almost-forgot "+almostForgot}>
                <p>Pergunta {props.questionNumber}</p>
                <ion-icon name="help-circle"></ion-icon>
            </div>
            <div className={"answered-card remembered "+remembered}>
                <p>Pergunta {props.questionNumber}</p>
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div> 
    );

}
