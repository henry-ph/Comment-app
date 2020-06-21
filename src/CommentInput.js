import React, { Component } from 'react'

class CommentInput extends Component {


    constructor() {
        super();
        this.state = {
            userName: '',
            content: ''
        }
    }

    _loadUserName() {
        const userName = localStorage.getItem('userName')
        if (userName) {
            this.setState({ userName })
        }
    }

    componentWillMount() {
        this._loadUserName()
    }

    componentDidMount() {
        this.textarea.focus()
    }

    handleUserNameChange (event) {
        this.setState({
            userName: event.target.value
        })
    }

    handleContentChange (event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit () {
        if (this.props.onSubmit) {
            const { userName, content } = this.state
            this.props.onSubmit({userName, content})
        }
        this.setState({ content: ''})
    }

    _saveUserName (userName) {
        localStorage.setItem('userName', userName)
    }

    handleUserNameBlur (event) {
        this._saveUserName(event.target.value)
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.userName}
                            onBlur={this.handleUserNameBlur.bind(this)}
                            onChange={this.handleUserNameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export  default CommentInput