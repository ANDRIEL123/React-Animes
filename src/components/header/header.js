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
        open: false
    }

    renderMenu = () => {
        const { open } = this.state;
        if (open) {
            return <Drawer />
        } else {
            return
        }
    }

    render() {
        const { open } = this.state;

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
                    <Link to="/">
                        <div className="logo">
                            <p>React</p>
                            <img src={logo} className="App-logo" />
                            <p>Animes</p>
                        </div>
                    </Link>
                    <div className="search">
                        <Search className="icon-search" />
                    </div>
                </div>

                <div className="main-drawer">
                    {this.renderMenu()}
                </div>
            </div>

        )

    }
}