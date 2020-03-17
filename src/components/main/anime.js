import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import api from '../../services/api'

import ListAnimes from '../header/imgs/icons/nav-anime/view_headline-black-18dp/2x/list.png'
import ApiGoogleV2 from '../../services/apiGoogle'
import apiPlayList from '../../services/apiPlaylistJW'
import RightArrow from '../header/imgs/icons/nav-anime/keyboard_arrow_right-black-18dp/2x/rightarrow.png'
import LeftArrow from '../header/imgs/icons/nav-anime/keyboard_arrow_left-black-18dp/2x/leftarrow.png'

import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

//DOCUMENTAÇÃO video-react = https://github.com/video-react/video-react
import './responsivePlayer.css'

export default class Anime extends Component {
    state = {
        urlVideo: "",
        title: "",
        //O Description ID se refere ao ID da mídia no Google Drive
        descriptionid: "",
        infos: {},
        //tag representa o ID da playlist no JWPLAYER
        tag: "",
        //Armazena as playlists
        playlist: []

    }
    //Script para retornar qual o anime atual
    retornaPosicao = (playlist) => {
        let key = window.location.href.slice(28) //32 web 28 local
        for (let index = 0; index < playlist.length; index++) {
            if (playlist[index].mediaid === key) {
                return index
            }
        }
    }

    //Código para carregar as informações do arquivo pela id pela api do google v2 em services apigoogleV2
    loadApiGoogle = async (id) => {
        const response = await ApiGoogleV2.get(id)
        this.setState({ infos: response.data })
        console.log(response.data)
    }

    //Código para busca a informação da playlist pela key (inicializado em consultaVideo() abaixo) da playlist pela tag
    loadPlayListJW = async (keyPlaylist) => {
        const response = await apiPlayList(keyPlaylist)
        this.setState({ playlist: response.data.playlist })
        console.log(this.state.playlist)
    }

    //Consulta vídeo e já passa as informações
    consultaVideo = async () => {
        let key = window.location.href.slice(28) //32 web 28 local
        const responseVideo = await api.get(key)
        this.setState({ urlVideo: responseVideo.data.playlist[0].sources[0].file, title: responseVideo.data.title, descriptionid: responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q" })
        console.log(responseVideo.data)

        //Coloco aqui os métodos pois são carregadas as informações e já setar na inicialização do componente
        //assim ficando mais fácil de manipular os dados pois o consultaVideo está no componentdidMount
        this.loadApiGoogle(responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q") //ID da mídia do Google drive + key da api do google drive
        this.loadPlayListJW(responseVideo.data.playlist[0].tags)
    }

    consultaVideoNext = async (playlist) => {
        let key = this.next(playlist)
        const responseVideo = await api.get(key)
        this.setState({ urlVideo: responseVideo.data.playlist[0].sources[0].file, title: responseVideo.data.title, descriptionid: responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q" })
        console.log(responseVideo.data)

        //Coloco aqui os métodos pois são carregadas as informações e já setar na inicialização do componente
        //assim ficando mais fácil de manipular os dados pois o consultaVideo está no componentdidMount
        this.loadApiGoogle(responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q") //ID da mídia do Google drive + key da api do google drive
        this.loadPlayListJW(responseVideo.data.playlist[0].tags)
    }

    consultaVideoAfter = async (playlist) => {
        let key = this.after(playlist)
        const responseVideo = await api.get(key)
        this.setState({ urlVideo: responseVideo.data.playlist[0].sources[0].file, title: responseVideo.data.title, descriptionid: responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q" })
        console.log(responseVideo.data)

        //Coloco aqui os métodos pois são carregadas as informações e já setar na inicialização do componente
        //assim ficando mais fácil de manipular os dados pois o consultaVideo está no componentdidMount
        this.loadApiGoogle(responseVideo.data.description + "/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q") //ID da mídia do Google drive + key da api do google drive
        this.loadPlayListJW(responseVideo.data.playlist[0].tags)
    }

    /*
    LINK PARA API V3 FILE 
    idVideo = (id) => {
        return `https://www.googleapis.com/drive/v3/files/${id}/?key=AIzaSyCxFhXZsTJVH8i4J2YOwkF6j5T_R6TKT4Q&alt=media`
    }
    */

    componentDidMount() {
        this.consultaVideo()
    }

    //Lógica do botão [< Anterior] para verificar se é o último episódio
    after = (playlist) => {
        let key = window.location.href.slice(28) //32 web 28 local
        for (let index = 0; index < playlist.length; index++) {
            //No if a seguir temos index > 0 para que não entre na condição de buscar o episodio na posição
            //0, dessa forma o mesmo irá até a posição 1 e quando clicar no botão [< Anterior]
            //ou seja buscando o valor na index - 1, não irá mais entrar na condição abaixo
            if (playlist[index].mediaid === key && index > 0) {
                return playlist[index - 1].mediaid
            } else {
                console.log("Fim da linha.")
            }
        }
    }

    next = (playlist) => {
        let key = window.location.href.slice(28) //32 web 28 local
        for (let index = 0; index < playlist.length; index++) {
            //No if a seguir temos index < playlist.lengh - 1, ou seja se a playlist possuí tamanho 25
            //logo o index chegará até o 24 e assim a condição de retorno só irá ser executada
            //até a posição 23, assim quando estiver na posição 23 e clicar em [proximo >]
            //(index + 1) entrara na posição 24 e não entrará mais na condição abaixo

            if (playlist[index].mediaid === key && index < playlist.length - 1) {
                return playlist[index + 1].mediaid
            } else {
                console.log("Fim da linha.")
            }
        }
    }

    //Só vai retornar o botão se não estiver no primeiro episódio, ou seja,
    //a posição deve ser diferente de 0, por isso temos o método
    //retornaposicao(playlist) abaixo para fazer esse processo
    retornaButtonLeft = (playlist) => {
        if (this.retornaPosicao(playlist) != 0) {
            return this.Left(playlist)
        }
    }
    //Só vai retornar o botão se não estiver no último episódio, ou seja,
    //a posição deve ser diferente da última, por exemplo uma playlist
    //com 25 episódios a posição final é 24, então a posição deve ser
    //diferente de 24 como abaixo, utilizando o método para retornar
    //a posição atual e verifica se está na última com playlist.lenght - 1
    retornaButtonRight = (playlist) => {
        if (playlist.length - 1 != this.retornaPosicao(playlist)) {
            return this.Right(playlist)
        }
    }

    Right = (playlist) => {
        return (
            <div className="right" onClick={() => this.consultaVideoNext(playlist)}>
                <button className="btn-right">
                    < li >Próximo</li>
                    <img src={RightArrow} />
                </button>
            </div >
        )

    }

    Left = (playlist) => {
        return (
            <div className="left" onClick={() => this.consultaVideoAfter(playlist)}>
                <button className="btn-left">
                    <img src={LeftArrow} />
                    <li>Anterior</li>

                </button>
            </div>
        )

    }

    render() {
        const { playlist } = this.state;

        return (
            <center>
                <div className="anime">

                    <div className="class-title">
                        <h2 >{this.state.title}</h2>
                    </div>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            // Disable right click
                            onContextMenu={e => e.preventDefault()}
                            // Your props
                            url={this.state.infos.webContentLink}
                            className="react-player"
                            controls
                            width="100%"
                            height="100%"
                            type="video/mp4"
                        />
                    </div>

                    <div className="arrows">
                        <Link to={"/anime/" + this.after(playlist)}>
                            {this.retornaButtonLeft(playlist)}
                        </Link>
                        <Link to="/animes/">
                            <div className="list">
                                <img src={ListAnimes} />
                            </div>
                        </Link>

                        <Link to={"/anime/" + this.next(playlist)}>
                            {this.retornaButtonRight(playlist)}
                        </Link>

                    </div>


                    <div>
                        <h3> React Animes © </h3>
                    </div>

                </div>
            </center>

        )
    }

}