import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useParams } from 'react-router-dom'
import './anime.css'

export default function Anime() {
    let { id_anime } = useParams()
    let [anime, setAnime] = useState({})
    let [episodiosAnime, setEpisodiosAnime] = useState([])
    const consultaAnime = async () => {
        const response = await api.get(`/animes/${id_anime}`)
        const responseEpsDoAnime = await api.get(`/episodios/animes/${id_anime}`)
        setAnime(response.data.response)
        setEpisodiosAnime(responseEpsDoAnime.data.response)
    }

    useEffect(() => {
        consultaAnime()
    }, [])

    const baseUrlUploads = () => {
        return `${process.env.REACT_APP_API_URL}/uploads/${anime.imgAnime}`
    }

    return (
        <div className="main-anime">
            <div className="title">
                <center>
                    <h2>Hello World Anime</h2>
                </center>
            </div>
            <div className="info-anime">
                <img src={baseUrlUploads()} width="200px" height="200px" />
                <div className="other">
                    <label>Episódios: </label>
                    <p />
                    <label>Status: </label>
                    <p />
                    <label>Descrição: </label>
                </div>
            </div>


        </div>
    )
}