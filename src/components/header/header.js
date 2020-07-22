import React, { Component } from 'react'
import IconeMenu from './imgs/icons/2x/icon2.png'
import logo from '../../logo.svg'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField';
import Drawer from './drawer/headerDrawer'
import api from '../../services/api'
import './header.css'

import { Link, Navigate } from 'react-router-dom'


class Header extends Component {
    state = {
        open: false,
        search: '',
        searchIsOpen: false,
        resultPesquisa: false,
        animesFilter: [],
        auxRota: ''
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderMenu = () => {
        const { open } = this.state;
        if (open) {
            return <Drawer />
        }
    }


    loadFilterAnimes = async (valueSearch) => {
        console.log('entro')

        const response = await api.get('/animes/filter/animes', {
            //Envio ao back o parametro (query) titleAnime abaixo
            //no back ficando req.query.titleAnime
            params: {
                titleAnime: valueSearch
            }
        })
        this.setState({ animesFilter: response.data.response, resultPesquisa: true })
    }


    baseUrlUploads = (imgAnime) => {
        return `${process.env.REACT_APP_API_URL}/uploads/${imgAnime}`
    }


    resultsPesquisa = () => {
        const { resultPesquisa, animesFilter } = this.state
        if (resultPesquisa) {

            let validaPath = window.location.pathname.split('/')
            /* Se estiver na rota /anime, então usa o gerirRotas para dar reload
            já que está na mesma página, porém em um anime diferente */
            if (validaPath[1] === 'anime') {
                return (
                    <center>
                        <div className="results-animes">
                            {animesFilter.map(anime => (

                                <div className="results-pesquisa" onClick={() => this.gerirRotas(`/anime/${anime.idanimes}`)}>
                                    <img src={this.baseUrlUploads(anime.imgAnime)} width="50px" height="65px" />
                                    <strong>{anime.titleAnime}</strong>
                                </div>

                            ))}
                        </div>
                    </center>
                )
            } else {
                return (
                    <center>
                        <div className="results-animes">
                            {animesFilter.map(anime => (
                                <Link to={`/anime/${anime.idanimes}`}>
                                    <div className="results-pesquisa" onClick={() => this.setState({ resultPesquisa: false })}>
                                        <img src={this.baseUrlUploads(anime.imgAnime)} width="50px" height="65px" />
                                        <strong>{anime.titleAnime}</strong>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </center>
                )
            }

        }
    }

    searchAnime = () => {


        const { searchIsOpen } = this.state
        if (searchIsOpen) {
            return (
                <div>
                    <div className="search-anime">
                        <TextField
                            label="Pesquise o anime pelo nome"
                            type="text"
                            name="search"
                            className="input-search"
                            variant="outlined"

                            onChange={(event) => {
                                let lengthSearch = event.target.value.length
                                if (lengthSearch > 1) {
                                    this.loadFilterAnimes(event.target.value)
                                } else {
                                    this.setState({ resultPesquisa: false })
                                }
                            }} />
                    </div>
                    {this.resultsPesquisa()}
                </div>
            )
        }
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    gerirRotas = (rota) => {
        window.location.href = this.pegaUrlAtual() + rota
    }

    render() {
        const { open, searchIsOpen } = this.state;

        return (
            <div>
                <div className="main-header">
                    <div className="icon-menu">
                        <a><img src={IconeMenu} alt="icon-menu" onClick={() => {
                            if (open) {
                                this.setState({ open: false })
                            } else {
                                this.setState({ open: true })
                            }
                        }} /></a>
                    </div>
                    <div className="logo" onClick={() => this.gerirRotas("/")}>
                        <p>React</p>
                        <img src={logo} className="App-logo" />
                        <p>Animes</p>
                    </div>
                    <div className="search" onClick={() => {
                        if (searchIsOpen) {
                            this.setState({ searchIsOpen: false })
                        } else {
                            this.setState({ searchIsOpen: true })
                        }
                    }}>
                        <Search className="icon-search" />

                    </div>

                </div>

                <div className="main-drawer">
                    {this.renderMenu()}
                </div>

                {this.searchAnime()}

            </div>

        )

    }
}

export default Header;