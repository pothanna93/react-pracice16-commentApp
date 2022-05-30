import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onDeleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachCom => {
        if (id === eachCom.id) {
          return {...eachCom, isLiked: !eachCom.isLiked}
        }
        return eachCom
      }),
    }))
  }

  renderCommentsLists = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        onDeleteComment={this.onDeleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBgColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBgColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="all-comments-container">
          <h1 className="heading">Comments</h1>
          <div className="input-elements-container">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="technologies-para">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="user-input"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="6"
                className="text-from-user"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="comment-heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsLists()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
