import React from 'react';
import SideBarContainer from './functional_components/sidebar_container.js';
import HeaderContainer from './functional_components/header_container.js';
import SuggestionContainer from './functional_components/suggestions_container.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: "modal" };
    this.untoggleModal = this.untoggleModal.bind(this);
    this.toggleModalFocus = this.toggleModalFocus.bind(this);
  }

  toggleModalFocus() {
    if (this.state.modal === "modal") {
      this.setState({ modal: "modal focused"});
    }
  }

  untoggleModal() {
    this.setState({ modal: "modal"});
  }

  render() {
    return (
      <div className="home">
        <HeaderContainer
          untoggleModal={this.untoggleModal}
          toggleModalFocus={this.toggleModalFocus}
          modal={this.state.modal}/>
        <div className={this.state.modal} onClick={this.untoggleModal} />
        <section className="home-main">
          <SideBarContainer location={this.props.location.pathname} className="home-left-sidebar"/>
          <div className="content-main">
            {this.props.children}
          </div>
          <SuggestionContainer />
        </section>
      </div>
    );
  }
}

export default App;
