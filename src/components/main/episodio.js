import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import api from '../../services/api'
import ListAnimes from '../header/imgs/icons/nav-anime/view_headline-black-18dp/2x/list.png'
import RightArrow from '../header/imgs/icons/nav-anime/keyboard_arrow_right-black-18dp/2x/rightarrow.png'
import LeftArrow from '../header/imgs/icons/nav-anime/keyboard_arrow_left-black-18dp/2x/leftarrow.png'

import {
    Link
} from "react-router-dom";

//DOCUMENTAÇÃO video-react = https://github.com/video-react/video-react
import './responsivePlayer.css'

export default function Episodio() {
    let { id_episodio } = useParams()
    let [episodio, setEpisodio] = useState({})
    let [playlist, setPlaylist] = useState([])

    //Script para retornar qual o episodio atual
    const retornaPosicao = () => {
        for (let index = 0; index < playlist.length; index++) {
            if (Number(playlist[index].idepisodios) === Number(id_episodio)) {
                return index
            }
        }
    }

    //Consulta vídeo e já passa as informações
    const consultaVideo = async () => {
        const response = await api.get(`/episodios/${id_episodio}`)
        const dataAnime = response.data.response
        setEpisodio(dataAnime)
        const responsePlaylist = await api.get(`/episodios/animes/${dataAnime.idanimes}`)
        setPlaylist(responsePlaylist.data.response)

    }

    const next = () => {
        for (let index = 0; index < playlist.length; index++) {
            //No if a seguir temos index < playlist.lengh - 1, ou seja se a playlist possuí tamanho 25
            //logo o index chegará até o 24 e assim a condição de retorno só irá ser executada
            //até a posição 23, assim quando estiver na posição 23 e clicar em [proximo >]
            //(index + 1) entrara na posição 24 e não entrará mais na condição abaixo
            if (Number(playlist[index].idepisodios) === Number(id_episodio) && index < playlist.length - 1) {
                return playlist[index + 1].idepisodios
            }
        }
    }

    const consultaVideoNext = async () => {
        const response = await api.get(`/episodios/${next()}`)
        let consultaEpisodio = response.data.response
        //Coloco aqui os métodos pois são carregadas as informações e já setar na inicialização do componente
        //assim ficando mais fácil de manipular os dados pois o consultaVideo está no componentdidMount
        setEpisodio(consultaEpisodio)
    }

    const after = () => {
        for (let index = 0; index < playlist.length; index++) {
            //No if a seguir temos index > 0 para que não entre na condição de buscar o episodio na posição
            //0, dessa forma o mesmo irá até a posição 1 e quando clicar no botão [< Anterior]
            //ou seja buscando o valor na index - 1, não irá mais entrar na condição abaixo
            if (Number(playlist[index].idepisodios) === Number(id_episodio) && index > 0) {
                return playlist[index - 1].idepisodios
            }
        }
    }


    const consultaVideoAfter = async () => {
        const response = await api.get(`/episodios/${after()}`)
        let consultaEpisodio = response.data.response
        //Coloco aqui os métodos pois são carregadas as informações e já setar na inicialização do componente
        //assim ficando mais fácil de manipular os dados pois o consultaVideo está no componentdidMount
        setEpisodio(consultaEpisodio)
    }

    useEffect(() => {
        consultaVideo()
    }, [])


    /* Lógica do botão [< Anterior] para verificar se é o último episódio
    Só vai retornar o botão se não estiver no primeiro episódio, ou seja,
    a posição deve ser diferente de 0, por isso temos o método
    retornaposicao(playlist) abaixo para fazer esse processo */

    const retornaButtonLeft = () => {
        if (retornaPosicao() != 0) {
            return Left()
        }
    }
    /* Só vai retornar o botão se não estiver no último episódio, ou seja,
    a posição deve ser diferente da última, por exemplo uma playlist
    com 25 episódios a posição final é 24, então a posição deve ser
    diferente de 24 como abaixo, utilizando o método para retornar
    a posição atual e verifica se está na última com playlist.lenght - 1 */

    const retornaButtonRight = () => {
        if (playlist.length - 1 != retornaPosicao()) {
            return Right()
        }
    }
    //Retorna botão Próximo

    const Right = () => {
        return (
            <div className="right" onClick={() => consultaVideoNext()}>
                <img src={RightArrow} />
            </div >
        )
    }

    //Retorna botão anterior
    const Left = () => {
        return (
            <div className="left" onClick={() => consultaVideoAfter()}>
                <img src={LeftArrow} />
            </div>
        )
    }

    const blob = () => {
        /*
        var xhr = new XMLHttpRequest();
        const load = document.getElementById("load")

        xhr.open("GET", "https://ns570902.ip-51-161-15.net/Uploads/Animes/O/one-punch-man/06.mp4")
        xhr.responseType = "blob"
        var blob = new Blob([xhr.response])
        var url = URL.createObjectURL(blob)
        xhr.send()
        return url;
        */
        let urlAux = new URL('https://ns570902.ip-51-161-15.net/Uploads/Animes/O/one-punch-man/06.mp4')
        var blob = new Blob([{ urlAux }], { type: "video/mp4" })
        let url = URL.createObjectURL(blob)

        console.log(url)
        return url

    }

    return (
        <center>
            <div className="anime">

                <div className="class-title">
                    <h2><Link to={`/anime/${episodio.idanimes}`}>
                        <strong>{`${episodio.titleAnime}`}</strong>
                    </Link>
                        <strong style={{ marginLeft: "2px" }}> - Episódio {episodio.titleEpisodio}</strong>
                    </h2>
                </div>

                <div className='player-wrapper'>
                    <ReactPlayer
                        // Disable right click
                        onContextMenu={e => e.preventDefault()}
                        // Your props
                        //url={episodio.urlVideo}
                        url={blob()}
                        className="react-player"
                        controls
                        width="100%"
                        height="100%"
                        type="video/mp4"
                    />
                </div>
                {}
                <div className="arrows">
                    <Link to={"/episodio/" + after()}>
                        {retornaButtonLeft()}
                    </Link>
                    <Link to={`/anime/${episodio.idanimes}`}>
                        <div className="list">
                            <img src={ListAnimes} />
                        </div>
                    </Link>

                    <Link to={"/episodio/" + next()}>
                        {retornaButtonRight()}
                    </Link>

                </div>

                <div>
                    <h3> © React Animes </h3>
                </div>

            </div>
        </center>

    )
}

