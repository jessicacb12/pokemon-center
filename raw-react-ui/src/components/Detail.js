import React from "react";
import {
   Modal, ModalHeader, ModalBody, ModalFooter,
   Button
} from 'reactstrap';
import Base from './Base';

export default class Detail extends Base {

    state = {
        moves: undefined
    }

    loadMoves() {
        this.getFromExternalAPI(
            this.DETAIL + this.props.pokemon.id
        )
            .then(
                res => res.json()
            ).then(
                json => {
                    this.setState({
                        moves: json.moves.map(
                            (m) => m.move.name
                        )
                    })
                }
            );
    }

    render() {
        if (this.props.isOpen) {
            this.loadMoves();
        }

        let nickname = this.props.pokemon.nickname;
        let name = (this.props.pokemon.name === undefined) ? 
            '' : this.capitalize(this.props.pokemon.name);

        if (nickname === undefined) {
            nickname = name;
            name = '';
        }

        return (
            <div>
                {this.props.catchModal}
                <Modal
                    className='detail'
                    isOpen={this.props.isOpen}
                >
                    <ModalHeader style={(Object.keys(this.props.pokemon).length === 0) ? {} : {
                        backgroundColor: this.COLOR[this.props.pokemon.types[0]]
                    }}>
                        <div className='modal-close'>
                            <Button close onClick={() => this.props.toggle()}/>
                        </div>
                        <img src={this.props.pokemon.img} alt={this.props.pokemon.name} />
                        {nickname}
                        <span>{name}</span>
                        <ul>
                            {(this.props.pokemon.types === undefined) ? '' : this.props.pokemon.types.map(
                                (type) => <li key={type}>{type}</li>
                            )}
                        </ul>
                    </ModalHeader>
                    <ModalBody>
                        <p>Moves</p>
                        <ul>
                            {(this.state.moves === undefined) ? '' : this.state.moves.map(
                                (move) => <li key={move}>
                                    {this.capitalize(move.split('-').join(' '))}
                                </li>
                            )}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.button}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}