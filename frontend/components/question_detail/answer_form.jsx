import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      answer: "",
      imageFile: null,
      imageUrl: null,
      toggle: "answer-box"
    };
    this.updateFile = this.updateFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggle() {
    if (this.state.toggle === "answer-box") {
      this.setState({ toggle: "answer-box toggled" });
    } else {
      this.setState({ toggle: "answer-box"});
    }
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.id;
    const formData = new FormData();

     if (this.state.imageFile !== null) {
       formData.append("answer[image]", this.state.imageFile);
     }
     formData.append("answer[body]", this.state.answer);
     formData.append("answer[question_id]", this.props.id);
     formData.append("answer[author_id]", this.props.currentUser.id);

    this.props.createAnswer(formData);

    this.setState({
      answer: "",
      toggle: "answer-box",
    });
  }

  enableButton() {
    if(this.state.answer) {
      return "submit-button";
    } else {
      return "hidden";
    }
  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function() {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <section className="detail-page-answer">
        <div className={this.props.toggled}>
          <form className="hidden-form" onSubmit={this.handleSubmit}>
            <div>
              <div className="author-photo" />
              <div>
                <h4>{this.props.currentUser.username}</h4>
                <a>Add Bio</a>
              </div>
            </div>
            <ul className="form-style">
              <li><input type="file"
                         onChange={this.updateFile} /></li>
            </ul>
            <textarea className="answer-bio"
              onChange={this.handleChange("bio")}
              value={this.state.bio} />
            <textarea className="answer-input"
              onChange={this.handleChange("answer")}
              placeholder="Write your answer"
              value={this.state.answer} />
            <input className={this.enableButton()} type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }
}

export default AnswerForm;

// <div className="form-style">
// // <ul>
// // </ul>
//
// </div>
