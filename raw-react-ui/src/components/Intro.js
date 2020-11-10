import React from 'react';
import pokedex from '../assets/pokedex_ic.png';
import pokeball from '../assets/pokeball_ic.png';

export default class Intro extends React.Component {
    state = {
        menu: [
            '',
            {
                img: pokedex,
                alt: 'Pokedex'
            },
            {
                img: pokeball,
                alt: 'My Pokemon'
            }
        ]
    }

    getMenuItem(index) {
        const data = this.state.menu[index];
        return (
            <div className='menu_item'>
                <button onClick={() => this.props.changeDisplay(index)}>
                    <img src={data.img} alt={data.alt.toLowerCase()} />
                </button>
                <p>{data.alt}</p>
            </div>
        );
    }

    render() {
        return (
            <div className='intro'>
                <div className='top'>
                    <h1>WELCOME TO POKEMON CENTER</h1>
                </div>
                <div className="separator"></div>
                <div className='content'>
                    <div className='menu'>
                        {this.getMenuItem(1)}
                        {this.getMenuItem(2)}
                    </div>
                </div>
            </div>
        );
    }
}