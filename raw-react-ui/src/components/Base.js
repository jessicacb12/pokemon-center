import React from "react";
import RootApi from '../api/RootApi';

export default class Base extends React.Component {

    DETAIL = `https://pokeapi.co/api/v2/pokemon/`;
    LIMIT = 50;

    COLOR = {
        normal: '#a8a878',
        fire: '#f08030',
        fighting: '#c03028',
        water: '#6890f0',
        flying: '#a890f0',
        grass: '#78c850',
        poison: '#a040a0',
        electric: '#f8d030',
        ground: '#e0c068',
        psychic: '#f85888',
        rock: '#b8a038',
        ice: '#98d8d8',
        bug: '#a8b820',
        dragon: '#7038f8',
        ghost: '#705898',
        dark: '#705848',
        steel: '#b8b8d0',
        fairy: '#ee99ac',
        '???': '#68a090'
    }

    toggleFragment(index) {
        this.temporaryFadeIn(() => this.setState({ current: index }));
    }

    temporaryFadeIn(display) {
        this.setState({ isshow: false });
        setTimeout(() => {
            this.setState({ isshow: true })
            display();
        }, 500);
    }

    openDetail(id) {
        this.setState(
            { pokeid: id },
            () => {
                this.toggleFragment(this.state.INDEX.detail)
            }
        );
    }

    capitalize(string) {
        var splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    getIDFromURL(url) {
        return url.match(/\d+\/$/i)[0].replace('/', '');
    }

    async getFromExternalAPI(url = this.state.uri) {
        return await RootApi.getFromPokemonAPI(url);
    }

    isPokemonCaught() {
        return (Math.floor(Math.random() * 2) === 0) ? false : true;
    }
}