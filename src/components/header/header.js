import React, { Component } from 'react'
import IconeMenu from './imgs/icons/2x/icon2.png'
import logo from '../../logo.svg'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField';
import Drawer from './drawer/headerDrawer'
import './header.css'

import { Link } from 'react-router-dom'


export default class Header extends Component {
    state = {
        open: false,
        search: '',
        searchIsOpen: false,
        resultPesquisa: false,
        animesFilter: []
    }

    renderMenu = () => {
        const { open } = this.state;
        if (open) {
            return <Drawer />
        }
    }

    loadFilterAnimes = async () => {
        const { search } = this.state

        const response = await api.get('/animes/filter/animes', {
            //Envio ao back o parametro (query) titleAnime abaixo
            //no back ficando req.query.titleAnime
            params: {
                titleAnime: search
            }
        })
        this.setState({ animesFilter: response.data.response })

    }

    changeHandler = e => {
        const { search } = this.state
        this.setState({ [e.target.name]: e.target.value })
        let sizeString = e.target.value.length
        if (sizeString > 1) {
            this.setState({ resultPesquisa: true })
        } else {
            this.setState({ resultPesquisa: false })
        }
    }

    resultsPesquisa = () => {
        if (this.state.resultPesquisa) {
            return (
                <div className="results-pesquisa">
                    <li>Teste</li>
                    <p>Chocolate</p>
                    <b>Bola</b>
                </div>
            )
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
                            value={this.state.search}
                            onChange={this.changeHandler}
                            onKeyDown={this.searchAnime}
                            variant="outlined"
                            required />

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