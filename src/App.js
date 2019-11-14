import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceAround",
    width: "80%"
  }
};

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    count: 0,
    highScore: 0,
    playing: true
  };

  clickFriend = async id => {
    // console.log(this.state.friends);
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const clickedFriend = this.state.friends.filter(friend => friend.id === id);
    // const OTHER = this.state.friends.filter(friend => friend.id !== id);
    if (!clickedFriend[0].clicked) {
      clickedFriend[0].clicked = true;
      await this.setState({ count: this.state.count + 1 });
      if (this.state.count > this.state.highScore) {
        this.setState({ highScore: this.state.count });
      }
      if (this.state.count % 12 === 0) {
        this.restart();
      }
    } else {
      this.setState({ count: 0 });
      this.setState({ playing: false });
    }
    // console.log(clickedFriend[0].clicked);
    // Set this.state.friends equal to the new friends array
    // this.setState({ friends: clickedFriend, count: this.state.count + 1 });
    // console.log(this.state.count);
    // console.log(this.state.friends);
    // console.log("---------");
    this.randomize();
  };

  restart = () => {
    // return <h1>Playing</h1>;
    console.log("test");
    const test = this.state.friends.filter(friend => friend.clicked === true);

    // const test = this.state.friends;
    console.log(test);
    test.forEach(friend => (friend.clicked = false));
    console.log(this.state.friends);
    if (this.state.playing === false) {
      this.setState({ playing: true });
      this.setState({ count: 0 });
    }
  };

  checkMessage() {
    if (!this.state.playing) {
      return (
        <div>
          <h1 onClick={this.restart}>You Lost. Play Again?</h1>
        </div>
      );
    }
  }

  componentDidMount() {
    this.randomize();
  }

  randomize() {
    // console.log(this.state.friends);
    const stateArr = this.state.friends;
    // console.log(stateArr);
    const randomArr = [];
    while (stateArr.length > 0) {
      let position = Math.floor(Math.random() * stateArr.length);
      randomArr.push(stateArr[position]);
      stateArr.splice(position, 1);
    }
    // console.log(randomArr);
    this.setState({ friends: randomArr });
  }

  loadFriends() {
    if (this.state.playing) {
      return this.state.friends.map(friend => (
        <FriendCard
          clickFriend={this.clickFriend}
          id={friend.id}
          key={friend.id}
          name={friend.name}
          image={friend.image}
        />
      ));
    }
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Game</Title>
        <div style={styles.main}>
          <Title>Current Score: {this.state.count}</Title>
          <Title>High Score: {this.state.highScore}</Title>
        </div>
        {this.checkMessage()}
        <Title></Title>
        {this.loadFriends()}
      </Wrapper>
    );
  }
}

export default App;
