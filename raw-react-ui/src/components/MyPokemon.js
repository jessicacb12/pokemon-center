import React from 'react';
import {
    Row, Card, CardTitle, CardSubtitle,
    Button
} from 'reactstrap';
import RootApi from '../api/RootApi';
import Base from './Base';
import Detail from './Detail';
import Header from '../page-component/header';

export default class MyPokemon extends Base {
    state = {
        offset: 0,
        data: [],
        detailOpen: false,
        detailFor: {
            index: -1,
            creature: {}
        }
    }

    componentDidMount() {
        this.loadList();
    }

    bottomDetectFn = function () {
        const pokedex = this;
        if (window.scrollY >= window.innerHeight) {
            window.removeEventListener('scroll', this.bottomDetectFn);
            pokedex.loadList();
        }
    }.bind(this);

    loadList() {
        RootApi.myList({ offset: this.state.offset })
            .then(
                result => this.loadDetails(result)
            );
    }

    loadDetails(data) {
        let list = this.state.data;
        for (let pokemon of data) {
            this.getFromExternalAPI(
                this.DETAIL + pokemon.id
            )
                .then(
                    res => res.json()
                ).then(
                    json => {
                        list.push({
                            numb: pokemon.numb,
                            id: pokemon.id,
                            name: json.name,
                            nickname: pokemon.nickname,
                            types: json.types.map(
                                (t) => t.type.name
                            ),
                            img: json.sprites.front_default,
                            isDeleted: false
                        });
                    }
                );
        }

        setTimeout(() => {
            this.setState({
                data: list,
                offset: this.state.offset + this.LIMIT - 1
            });
            window.addEventListener('scroll', this.bottomDetectFn);
        }, 1000);
    }

    card(pokemon, i) {
        return (
            <Card
                key={pokemon.id}
                style={{ backgroundColor: this.COLOR[pokemon.types[0]] }}
                onClick={() => {
                    this.setState({
                        detailOpen: true,
                        detailFor: {
                            index: i,
                            creature: pokemon
                        }
                    });
                }}
            >
                <div className='content'>
                    <div className='text'>
                        <CardTitle>{pokemon.nickname}</CardTitle>
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

    releasePokemon() {
        if (window.confirm(`Are you sure you want to release ${this.state.detailFor.creature.nickname}`)) {
            RootApi.pokemonRelease({ numb: this.state.detailFor.creature.numb });
            let pokemons = this.state.data;
            pokemons.splice(this.state.detailFor.index, 1);
            this.setState({
                data: pokemons,
                detailOpen: !this.state.detailOpen
            });
        }
    }

    render() {
        return (
            <div className='component pokemon_list'>
                <Detail
                    isOpen={this.state.detailOpen}
                    toggle={() => this.setState({ detailOpen: !this.state.detailOpen })}
                    pokemon={this.state.detailFor.creature}
                    button={<Button
                        size='lg'
                        style={{
                            backgroundColor: 'white',
                            border: '2px solid #dc3545',
                            color: '#dc3545'
                        }}
                        onClick={() => this.releasePokemon()}
                    >Release</Button>}
                />
                <Header back={this.props.back} title='My Pokemon' />
                <div className='content'>
                    <Row>
                        {this.state.data.map(
                            (pokemon, i) => this.card(pokemon, i)
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}