import { useState } from "react";
import HomePage from './components/HomePage/';
import DeckPage from "./components/DeckPage/";

function App(){
    const [page, setPage] = useState('main');
    return(
        <>
            {page === 'main' ? <HomePage setPage={setPage}/> : ''}
            {page === 'deck' ? <DeckPage/> : ''}
        </>
    );
}

export default App;