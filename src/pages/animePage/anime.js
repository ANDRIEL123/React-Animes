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
                <img src={baseUrlUploads()} width="200px" height="225px" />
                <div className="other">
                    <h4>Episódios: {episodiosAnime.length}</h4>
                    <p />
                    <h4>Status: {anime.situacaoAnime}</h4>
                    <p />
                    <h4>Lançamento: {anime.lancamentoAnime}</h4>
                    <p />
                    <h4>{anime.descriptionAnime}</h4>
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
                                <strong>{ep.titleAnime}</strong>
                                <img src={baseUrlUploads()} width="125px" height="125px" />

                                <strong>{`Episódio ${ep.titleEpisodio}`}</strong>

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