import React from "react";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Input, FormFeedback
} from 'reactstrap';
import Base from './Base';
import RootApi from '../api/RootApi';

export default class Catch extends Base {

    state = {
        invalid: false,
        nickname: ''
    }

    async handleSubmit(event) {
        event.preventDefault(true);
        if (this.state.nickname === '') {
            this.setState({ invalid: true });
        } else {
            await RootApi.pokemonCaught({
                id: this.props.pokemon.id,
                nickname: this.state.nickname
            });
            this.props.toggle();
        }
    }

    render() {
        return (
            <div>
                <Modal
                    className='catch'
                    isOpen={this.props.isOpen}
                >
                    <ModalHeader>
                        You've caught {this.capitalize(
                        (this.props.pokemon.name === undefined) ?
                            '' : this.props.pokemon.name
                    )}!
                    </ModalHeader>
                    <ModalBody>
                        <img src={this.props.pokemon.img} alt={this.props.pokemon.name} />
                        <Input
                            type='text'
                            invalid={this.state.invalid}
                            onChange={(e) => this.setState({ nickname: e.target.value })}
                        />
                        <FormFeedback invalid={this.state.invalid}>
                            Please give nickname to your Pokemon!
                        </FormFeedback>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color='danger'
                            size='lg'
                            onClick={(e) => this.handleSubmit(e)}
                        >Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}