import React, { Component } from 'react'
import './renderVideos.css'
import api from '../../services/api'

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
    renderVideos = async () => {
        const response = await api.get('/episodios/limit24')
        this.setState({ videos: response.data.response })

    }

    baseUrlUploads = (imagemEpisodio, imagemAnime) => {
        if (imagemEpisodio !== null) {
            return `${process.env.REACT_APP_API_URL}/uploads/${imagemEpisodio}`
        } else {
            return `${process.env.REACT_APP_API_URL}/uploads/${imagemAnime}`
        }
    }

    render() {
        const { videos } = this.state

        return (
            <center>
                <h2>Lançamentos</h2>

                <div className="list-videos">
                    {videos.map((videos) => (

                        <Link to={"/episodio/" + videos.idepisodios} >
                            {console.log(videos)}
                            <div className="videos" key={videos._id}>
                                <strong className="title">{videos.titleAnime}</strong>
                                <img src={this.baseUrlUploads(videos.imgEpisodio, videos.imgAnime)} width="125px" height="125px" />
                                <strong className="num-episodio">{`Episódio ${videos.titleEpisodio}`}</strong>
                            </div>
                        </Link>
                    ))}

                </div>
            </center>
        )
    }


}