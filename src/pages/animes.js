import React, { Component } from 'react'
import './animes.css'

export default class RenderMidia extends Component {
    state = {
        playlists: []
    }

    componentDidMount() {
        this.renderPlaylists()
    }

    filtraPlayListExistentes = (playlists) => {
        let anime = []
        for (let index = 0; index < playlists.length; index++) {
            if (playlists[index].type === 'manual') {
                anime.push(playlists[index]);
            }
        }
        return anime
    }

    renderPlaylists = () => {
        //DOCUMENTAÇÃO: https://www.npmjs.com/package/jwplatform
        //Acessar em node_modelues jwplatform e no arquivo client.js em this.baseUrl alterar para
        //this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.jwplatform.com/v1/';
        //Assim liberandos as cors
        const JWPlatformAPI = require('jwplatform');

        const jwApi = new JWPlatformAPI({ apiKey: 'heLimJnV', apiSecret: 'i1u5Qq8aD62PYy2bAemWZ9sy' });

        //Caso queira filtrar os retornos: função abaixo
        //jwApi.channels.list({ search:  }).then((response) => {
        //em search deverá ir alocando o texto e assim irá filtrandos os retorno
        jwApi.channels.list().then((response) => {
            this.setState({ playlists: this.filtraPlayListExistentes(response.channels) })
        })
    }

    render() {
        const { playlists } = this.state;
        return (
            <div>
                <center>
                    <div className="title-animes">
                        <h2>Animes</h2>
                        {console.log(playlists)}
                    </div>
                    <div className="animes">
                        {playlists.map((playlists) => (
                            <div className="videos" key={playlists._id}>
                                <strong>{playlists.title}</strong>
                            </div>
                        ))}
                    </div>
                </center>
            </div>
        )
    }
}