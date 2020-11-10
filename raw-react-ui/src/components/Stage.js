import React from "react";

import Base from "./Base";
import Intro from './Intro';
import Pokedex from './Pokedex';
import MyPokemon from './MyPokemon';

export default class Stage extends Base{
    state = {
        INDEX: {
            intro: 0,
            pokedex: 1,
            mypokemon: 2,
            detail: 3
        },
        current: 0,
        isshow: true,
        url: '',
        pokeid: -1
    }
    components = [
        <Intro changeDisplay= {(index) => this.toggleFragment(index)}
        />,
        <Pokedex 
            back={() => this.toggleFragment(this.state.INDEX.intro)}
        />,
        <MyPokemon back={() => this.toggleFragment(this.state.INDEX.intro)} />
    ]

    render() {
        return (
            <div className={`stage ${(this.state.isshow) ? 'show' : 'hide'}`}>
                {this.components[this.state.current]}
            </div>
        );
    }
}