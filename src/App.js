import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorsList = [
  '#7683cb',
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
  '#64748b',
  '#0b69ff',
]

class App extends Component {
  state = {
    inputText: '',
    inputWebsite: '',
    inputPassword: '',
    passwordList: [],
    initialPasswordList: [],
    isChecked: true,
    searchValue: '',
  }

  onSearchInput = event => {
    const {passwordList} = this.state
    const result = passwordList.filter(eachText =>
      eachText.inputWebsite.includes(event.target.value.toLowerCase()),
    )
    this.setState({
      searchValue: event.target.value,
      initialPasswordList: result,
    })
  }

  onDeleteItem = event => {
    const {initialPasswordList} = this.state

    const deletedList = initialPasswordList.filter(
      eachText => eachText.id !== event.target.id,
    )
    this.setState({
      initialPasswordList: deletedList,
      passwordList: deletedList,
    })
  }

  toggleOf = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onWebsiteText = event => {
    this.setState({
      inputWebsite: event.target.value,
    })
  }

  onInputText = event => {
    this.setState({
      inputText: event.target.value,
    })
  }

  onPasswordText = event => {
    this.setState({
      inputPassword: event.target.value,
    })
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const logoColor = colorsList[Math.floor(Math.random() * colorsList.length)]

    const {inputWebsite, inputText, inputPassword} = this.state
    const newList = {
      id: v4(),
      inputWebsite: inputWebsite.toLowerCase(),
      inputText,
      inputPassword,
      maskedPassword:
        'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png',
      logoColor,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newList],
      initialPasswordList: [...prevState.passwordList, newList],
      inputText: '',
      inputWebsite: '',
      inputPassword: '',
    }))
  }

  render() {
    const {
      inputWebsite,
      inputText,
      inputPassword,
      initialPasswordList,
      isChecked,
      searchValue,
    } = this.state

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-password-container">
          <div className="password-container">
            <h1 className="head">Add New Password</h1>
            <form className="form" onSubmit={this.onSubmitDetails}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <hr />
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={inputWebsite}
                  className="input"
                  onChange={this.onWebsiteText}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <hr />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={inputText}
                  onChange={this.onInputText}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="icon"
                />
                <hr />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={inputPassword}
                  onChange={this.onPasswordText}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>

        <div className="list-container">
          <div className="password-list-container">
            <div className="password-count-container common-css ">
              <h1 className="head">Your Passwords</h1>
              <p className="para">{initialPasswordList.length}</p>
            </div>
            <div className="input-container-1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icon"
              />
              <hr />
              <input
                type="search"
                className="input-1"
                placeholder="search"
                value={searchValue}
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="check-box">
            <input
              type="checkbox"
              id="check-1"
              onChange={this.toggleOf}
              value="checkbox"
            />
            <label htmlFor="check-1" className="para">
              Show passwords
            </label>
          </div>
          {initialPasswordList.length > 0 ? (
            <ul className="passwords-container common-css">
              {initialPasswordList.map(eachItem => (
                <li
                  key={eachItem.id}
                  className="sub-passwords-container common-css"
                >
                  <div className="li-container">
                    <p
                      className="logo"
                      style={{background: `${eachItem.logoColor}`}}
                    >
                      M
                    </p>
                    <div>
                      <p className="text-style">{eachItem.inputWebsite}</p>
                      <p className="text-style">{eachItem.inputText}</p>

                      {isChecked ? (
                        <img
                          src={eachItem.maskedPassword}
                          alt="stars"
                          className="star-icon"
                        />
                      ) : (
                        <p className="text-style">{eachItem.inputPassword}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="button-1"
                      onClick={this.onDeleteItem}
                      /* testid="delete" */
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete"
                        id={eachItem.id}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                className="manager-image"
                alt="no passwords"
              />
              <p className="head">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
