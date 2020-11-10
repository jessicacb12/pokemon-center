import React from "react";
import {
    Card, CardTitle, CardSubtitle,
    Row, Button
} from 'reactstrap';

import Base from './Base';
import Detail from './Detail';
import Catch from './Catch';
import Header from '../page-component/header';
import RootApi from '../api/RootApi';

export default class Pokedex extends Base {

    state = {
        uri: `https://pokeapi.co/api/v2/pokemon?limit=${this.LIMIT}&offset=0`,
        data: [],
        detailOpen: false,
        detailFor: {},
        isCaught: false
    }

    bottomDetectFn = function () {
        const pokedex = this;
        if (window.scrollY >= window.innerHeight) {
            window.removeEventListener('scroll', this.bottomDetectFn);
            pokedex.loadList();
        }
    }.bind(this);

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        this.getFromExternalAPI(this.state.uri)
            .then(
                res => res.json()
            ).then(
                json => {
                    this.setState({ uri: json.next });
                    this.loadDetails(json.results);
                }
            );
    }

    loadDetails(data) {
        let list = this.state.data;
        for (let pokemon of data) {
            this.getFromExternalAPI(
                this.DETAIL + this.getIDFromURL(pokemon.url)
            )
                .then(
                    res => res.json()
                ).then(
                    json => {
                        list.push({
                            id: json.id,
                            name: json.name,
                            types: json.types.map(
                                (t) => t.type.name
                            ),
                            img: json.sprites.front_default
                        });
                    }
                );
        }

        setTimeout(() => this.loadOwned(list), 1000);
    }

    loadOwned(list) {
        for (let pokemon of list) {
            RootApi.pokemonCount({ id: pokemon.id })
                .then(
                    total => {
                        pokemon['owned'] = total.owned;
                    }
                )
        }

        setTimeout(() => {
            this.setState({ data: list });
            window.addEventListener('scroll', this.bottomDetectFn);
        }, 3000);
    }

    card(pokemon) {
        return (
            <Card
                key={pokemon.id}
                style={{ backgroundColor: this.COLOR[pokemon.types[0]] }}
                onClick={() => {
                    this.setState({
                        detailOpen: true,
                        detailFor: pokemon
                    });
                }}
            >
                <div className='owned'>
                    Owned:<br />
                    {pokemon.owned}
                </div>
                <div className='content'>
                    <div className='text'>
                        <CardTitle>{this.capitalize(pokemon.name)}</CardTitle>
                        <ul>
                            {pokemon.types.map(
                                (type) => <li key={`${pokemon.id}-${type}`}>
                                    <CardSubtitle>{type}</CardSubtitle>
                                </li>
                            )}
                        </ul>
                    </div>
                    <img src={pokemon.img} alt={pokemon.name} />
                </div>
            </Card>
        );
    }

    displayList() {
        return (
            <Row>
                {this.state.data.map(
                    pokemon => this.card(pokemon)
                )}
            </Row>
        )
    }

    catchPokemon() {
        if (this.isPokemonCaught()) {
            this.setState({ isCaught: true });
        } else {
            alert("Sorry, you don't catch the Pokemon!");
        }
    }

    render() {
        return (
            <div className='component pokemon_list'>
                <Detail
                    isOpen={this.state.detailOpen}
                    toggle={() => this.setState({ detailOpen: !this.state.detailOpen })}
                    pokemon={this.state.detailFor}
                    catchModal={<Catch
                        isOpen={this.state.isCaught}
                        pokemon={this.state.detailFor}
                        toggle={() => this.setState({ isCaught: !this.state.isCaught })}
                    />}
                    button={<Button 
                        color='danger' 
                        size='lg'
                        onClick={() => this.catchPokemon()}
                    >Catch Pokemon</Button>}
                />
                <Header back={this.props.back} title='Pokedex' />
                <div className='content'>
                    {this.displayList()}
                </div>
            </div>
        );
    }
}