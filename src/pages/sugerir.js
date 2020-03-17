import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import './sugerir.css'

const Sugerir = () => {
    return (
        <center>
            <h3 style={{ color: "rgb(70, 201, 253)", display: "block" }}>Sugestões:</h3>
            <div className="sugerir-animes">
                <form className="form-pedido" method="get" action="mailto:animes@reactanimes.com.br">
                    <div className="txt-nome"><TextField label="Seu nome" /></div>
                    <div className="txt-anime"><TextField label="Nome do anime" /></div>
                    <div className="txt-email"><TextField label="Seu melhor email" /></div>
                    <div className="txt-mensagem"><TextField
                        multiline
                        rows="4"
                        fullWidth
                        label="Digite alguma mensagem"
                        variant="outlined"
                    /></div>
                    <div className="btn-envio"><Button variant="contained" color="primary" >Enviar</Button></div>
                </form>
            </div>
        </center>
    )
}

export default Sugerir