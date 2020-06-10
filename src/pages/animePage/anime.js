import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useParams, Link } from 'react-router-dom'
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
                <h2>{anime.titleAnime}</h2>
            </div>
            <div className="info-anime">
                <img src={baseUrlUploads()} width="200px" height="200px" />
                <div className="other">
                    <h4>Episódios: {episodiosAnime.length}</h4>
                    <p />
                    <h4>Status: </h4>
                    <p />
                    <h4>Descrição: {anime.descriptionAnime}</h4>
                </div>
            </div>
            <br></br>
            <div className="title-episodios">
                <h2>Lista de episódios</h2>
            </div>
            <div className="list-episodios">
                {episodiosAnime.map((ep) => (
                    <Link to={"/episodio/" + ep.idepisodios} >
                        <div className="episodio" key={ep._id}>
                            <center>
                                <img src={baseUrlUploads()} width="125px" height="100px" />
                                <strong>{ep.titleAnime}</strong>
                                <strong>{` - Episódio ${ep.titleEpisodio}`}</strong>
                            </center>
                        </div>
                    </Link>
                ))}

            </div>

            <div>
                <center>
                    <h3> © React Animes </h3>
                </center>
            </div>

        </div>

    )
}