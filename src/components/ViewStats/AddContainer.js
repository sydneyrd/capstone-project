import React, { Component } from 'react';
import { AddModal } from './AddModal';
import { AddButton } from './AddButton';
export class AddContainer extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    return (
      <React.Fragment>
        <AddButton
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButton = n)}
          triggerText={this.props.triggerText}
        />
        {this.state.isShown ? (
          <AddModal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            getPlayersAgain={this.props.getPlayersAgain}
            calculatedRosterId={this.props.calculatedRosterId}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddContainer;

//i do not need player information passed down here
//should there also be a button to add a new character to the database to then add to the roster?
//i need to add a button to add a new character to the database
//i just need to render an identical form with this modal
//except it will call a post request istead of put
//and there should be a searchable dropdown menu for the character name