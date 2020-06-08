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
        searchIsOpen: false
    }

    renderMenu = () => {
        const { open } = this.state;
        if (open) {
            return <Drawer />
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    searchAnime = () => {
        const { searchIsOpen } = this.state
        if (searchIsOpen) {
            return (
                <div className="search-anime">
                    <TextField
                        label="Pesquise o anime"
                        type="text"
                        name="search"
                        className="input-search"
                        value={this.state.search}
                        onChange={this.changeHandler}
                        variant="outlined"
                        required />
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