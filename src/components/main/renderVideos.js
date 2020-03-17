import React, { Component } from 'react'
import './renderVideos.css'
import Header from '../header/header'
import Anime from './anime'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


export default class RenderMidia extends Component {
    state = {
        videos: [],
        tagFormatada: '',
        midia: []
    }

    componentDidMount() {
        this.renderVideos()

    }

    filtraVideos = (videos) => {
        let anime = []
        for (let index = videos.length - 1; index >= videos.length - 25; index--) {
            anime.push(videos[index]);
        }
        return anime
    }

    renderVideos = () => {
        //DOCUMENTAÇÃO: https://www.npmjs.com/package/jwplatform
        //Acessar em node_modelues jwplatform e no arquivo client.js em this.baseUrl alterar para
        //this.baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.jwplatform.com/v1/';
        //Assim liberandos as cors
        const JWPlatformAPI = require('jwplatform');

        const jwApi = new JWPlatformAPI({ apiKey: 'heLimJnV', apiSecret: 'i1u5Qq8aD62PYy2bAemWZ9sy' });

        jwApi.videos.list().then((response) => {
            console.log(response.videos)
            const animes = this.filtraVideos(response.videos)
            console.log(animes)
            this.setState({ videos: animes })

        })

    }

    baseUrlImg = (key) => {
        return `https://cdn.jwplayer.com/v2/media/${key}/poster.jpg?width=320`
    }

    render() {
        const { videos } = this.state

        return (
            <center>
                <h2>Lançamentos</h2>

                <div className="list-videos">

                    {videos.map((videos) => (
                        <Link to={"/anime/" + videos.key} >
                            <div className="videos" key={videos._id}>
                                <img src={this.baseUrlImg(videos.key)} width="125px" height="100px" />
                                <strong>{videos.title}</strong>
                            </div>
                        </Link>
                    ))}

                </div>
            </center>
        )
    }


}