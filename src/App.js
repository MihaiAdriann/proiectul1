// App.js
import React from 'react';
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: 'white',
      color: 'black',
      users: [],
      loading: false,
      posts: [],
      isPostListVisible: false,
      showUsersOnly: true,
      showPostsOnly: false
    };

    this.submitAddForm = this.submitAddForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 5);
        data.forEach(user => {
          user.isGoldClient = false;
        });
        this.setState({ users: data });
      });
  }

  changeColor(event) {
    this.setState({ background: event.target.value });
  }

  handleTextColorChange(event) {
    this.setState({ color: event.target.value });
  }

  getMaxId(users) {
    let maxId = 0;
    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });
    return maxId;
  }

  submitAddForm(event, name, email, salariu, image, isGoldClient) {
    event.preventDefault();

    if (name.trim() === '') {
      alert('Introduceti un nume');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Introduceti o adresa de email valida');
      return;
    }

    if (image) {
      const reader = new FileReader();
      reader.onload = event => {
        const user = {
          id: this.getMaxId(this.state.users) + 1,
          name,
          email,
          salariu,
          image: event.target.result,
          isGoldClient
        };

        this.setState(prevState => ({
          users: [...prevState.users, user]
        }));
      };

      reader.readAsDataURL(image);
    } else {
      const user = {
        id: this.getMaxId(this.state.users) + 1,
        name,
        email,
        salariu,
        image: null,
        isGoldClient
      };

      this.setState(prevState => ({
        users: [...prevState.users, user]
      }));
    }
  }

  deleteUser(userId) {
    const updatedUsers = this.state.users.filter(user => user.id !== userId);
    const updatedPosts = this.state.posts.filter(post => post.userId !== userId);

    this.setState({ users: updatedUsers, posts: updatedPosts });
  }

  loadPosts() {
    this.setState(prevState => ({
      loading: true,
      isPostListVisible: !prevState.isPostListVisible,
      showUsersOnly: false,
      showPostsOnly: true
    }));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false, posts: data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  showUsersOnly() {
    this.setState({
      showUsersOnly: true,
      showPostsOnly: false
    });
  }

  showPostsOnly() {
    this.setState({
      showUsersOnly: false,
      showPostsOnly: true
    });
  }

  render() {
    const { users, posts, showUsersOnly, showPostsOnly } = this.state;

    return (
      <div className="app" style={{ color: this.state.color, background: this.state.background }}>
        <h1>Admin panel - Proiectul 1</h1>

        <input type="color" onChange={event => this.handleTextColorChange(event)} />

        <UserAddForm submitAddForm={this.submitAddForm} />
        <input type="color" onChange={event => this.changeColor(event)} />
        <div className="buttons">
          <button onClick={() => this.showUsersOnly()}>Afiseaza doar utilizatori</button>
          <button onClick={() => this.showPostsOnly()}>Afiseaza doar postari</button>
        </div>

        {showUsersOnly && (
          <div>
            {users.map(user => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.salariu}</p>
                <img src={user.image} alt="NoImage" style={{ width: '100px' }} />
                {user.isGoldClient ? <h3>Client GOLD</h3> : null}
                <button onClick={() => this.deleteUser(user.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {showPostsOnly && (
          <div>
            <PostList posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
