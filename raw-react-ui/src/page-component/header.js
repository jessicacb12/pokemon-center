import React from 'react';
import back from '../assets/back_ic.png';

export default class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <button className='back' onClick={() => this.props.back()}>
                    <img src={back} alt='back' />
                </button>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}