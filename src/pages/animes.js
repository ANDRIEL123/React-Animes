import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import './animes.css'

function Animes() {
    let [animes, setAnimes] = useState([]);

    const loadAnimes = async () => {
        const response = await api.get("/animes");
        setAnimes(response.data.response)

    }

    const baseUrlUploads = (imgAnime) => {
        return `${process.env.REACT_APP_API_URL}/uploads/${imgAnime}`
    }

    useEffect(() => {
        loadAnimes()
    }, [])

    const pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    const gerirRotas = (rota) => {
        window.location.href = pegaUrlAtual() + rota
    }

    return (
        <div className="main-animes">
            <h2>Lista de Animes</h2>
            <center>
                <div className="results-anime">
                    {animes.map(anime => (
                        <div className="results-pesquisa" onClick={() => gerirRotas(`/anime/${anime.idanimes}`)}>
                            <img src={baseUrlUploads(anime.imgAnime)} width="50px" height="65px" />
                            <strong>{anime.titleAnime}</strong>
                        </div>
                    ))}
                </div>
            </center >
        </div>
    )
}

export default Animes;