import React, { Component } from 'react'


export default class Playlists extends Component {
    state = {
        playlists: [],
        tagFormatada: '',
    }

    componentDidMount() {
        this.renderPlaylists()

    }

    renderPlaylists = () => {
        //DOCUMENTAÇÃO: https://www.npmjs.com/package/jwplatform
        //Acessar em node_modelues jwplatform e no arquivo client.js em this.baseUrl alterar para
        //this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.jwplatform.com/v1/';
        //Assim liberandos as cors
        const JWPlatformAPI = require('jwplatform');

        const jwApi = new JWPlatformAPI({ apiKey: 'heLimJnV', apiSecret: 'i1u5Qq8aD62PYy2bAemWZ9sy' });

        jwApi.channels.list().then((response) => {
            console.log(response)
            this.setState({ videos: response.videos })

        })
    }


    render() {

        return (
            <div>
                <h2>Teste</h2>
            </div>

        )
    }


}