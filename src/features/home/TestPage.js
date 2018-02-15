import React, { Component } from 'react';
const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

const ipfs = new IPFS({
    repo: 'ipfs/pubsub-demo/' + Math.random(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
})
const room = Room(ipfs, 'ipfs-pubsub-demo')






class TestPage extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    };

    // bind methods
    //this.captureFile = this.captureFile.bind(this);
    this.ipfs = ipfs
    this.room = room
  }


  componentDidMount() {
    ipfs.once('ready', () => ipfs.id((err, info) => {
      if (err) { throw err }
      console.log('IPFS node ready with address ' + info.id)
      // send and receive messages
      //room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'))
      room.on('message', (message) => {
        console.log(message.data.toString());
        this.setState({msg: message.data.toString()})
      })
      // broadcast message every 2 seconds
      //navigator.geolocation.watchPosition((res) => console.log(res.coords.latitude));
      setInterval(() => navigator.geolocation.getCurrentPosition((res) => room.broadcast(String(res.coords.latitude))), 300)
    }))
  }


  render() {
    const {msg} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App">
          <textarea rows="10" cols="45" ref="textarea"></textarea><br />
        </p>
        <p className="App-intro">
          {msg}
        </p>
      </div>
    );
  }
}

export default TestPage;
