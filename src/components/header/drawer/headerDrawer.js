import React from 'react'
import './drawer.css'
import play from '../../header/imgs/icons/play.svg'
import build from '../../header/imgs/icons/build.svg'
import pedido from '../../header/imgs/icons/pedido.svg'
import contato from '../../header/imgs/icons/contact.svg'
import sobre from '../../header/imgs/icons/sobre.svg'

import {
    useNavigate
} from "react-router-dom";

export default function Drawer() {
    const navigate = useNavigate()
    return (
        <div className="drawer">
            <div className="animes" onClick={() => navigate('/animes')}>
                <img src={play} className="App-play" />
                <li>Animes</li>
            </div>
            <div className="staff" onClick={() => navigate('/staff')}>
                <img src={build} className="App-build" />
                <li>Staff</li>
            </div>
            <div className="sugerir" onClick={() => navigate('/sugerir')}>
                <img src={pedido} className="App-pedido" />
                <li>Sugerir um anime</li>
            </div>
            <div className="contato" onClick={() => navigate('/contato')}>
                <img src={contato} className="App-contato" />
                <li>Contato</li>
            </div>
            <div className="sobre" onClick={() => navigate('/sobre')}>
                <img src={sobre} className="App-sobre" />
                <li>Sobre</li>
            </div>
        </div>
    )
}
