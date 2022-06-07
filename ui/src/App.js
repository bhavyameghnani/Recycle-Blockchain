import React, { Component } from "react";
import Web3 from "web3";
import { KARTAVYA_ABI, KARTAVYA_CONTRACT_ADDRESS } from "./config";
import RecycleItemList from "./Components/RecycleItemList";
import CommunityEvent from "./Components/CommunityEvents";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Route, Switch, HashRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//Declare IPFS
const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      allAccounts: [],
      accountBalance: 0,
      recycle: null,
      recycleCount: 0,
      items: [],
      price: 0,
      loading: true,
      shareValueOfCID: 0,
      shareValueOffered: 0,
      web3State: null,
    };

    this.createRecycleItem = this.createRecycleItem.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
  }

  async onAccountChange(event, value) {
    var balance = await this.state.web3State.eth.getBalance(value);
    this.setState(
      {
        account: value,
        accountBalance: balance,
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.account);
      }
    );
  }

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    //Initialise Web3 and get Network
    const web3 = new Web3("http://127.0.0.1:7545"); // new Web3(Web3.givenProvider || "http://localhost:8545")
    this.setState({ web3State: web3 });

    const network = await web3.eth.net.getNetworkType();
    console.log("network", network);

    //Fetch Accounts & Save it in react-state
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.setState({ allAccounts: accounts });
    console.log("accounts", accounts);

    //Get Balance of the current account
    var balance = await web3.eth.getBalance(this.state.account);
    this.setState({ accountBalance: balance });

    //Load Smart Contract
    const recycle = new web3.eth.Contract(
      KARTAVYA_ABI,
      KARTAVYA_CONTRACT_ADDRESS
    );
    this.setState({ recycle: recycle });
    console.log("recycle", recycle);

    //Get Recycled Item Count from Blockchain by calling Recycle Count()
    const recycleCount = await recycle.methods.recycleCount().call();
    this.setState({ recycleCount: recycleCount });
    console.log("recycleCount", recycleCount);

    for (var i = 0; i < recycleCount; i++) {
      const item = await recycle.methods.recycleitem(i).call();
      this.setState({
        items: [...this.state.items, item],
      });
    }
    console.log("items", this.state.items);

    //Set the state:loading to false once we have loaded our Blockchain
    this.setState({ loading: false });
  }

  //Get Image
  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  createRecycleItem(title, impact, city, company, points) {
    console.log("just wait...creating item now");
    console.log(title);

    ipfs.add(this.state.buffer, (e, data) => {
      // add on blockchain
      if (e) {
        console.error(e);
        return;
      }
      console.log(data);
      this.setState({ loading: true });
      this.state.recycle.methods
        .createRecycleItem(
          title,
          data[0].hash,
          city,
          impact,
          company,
          parseInt(points)
        )
        .send({ from: this.state.account, gas: 3000000 })
        .once("receipt", (receipt) => {
          this.setState({ loading: false });
          window.location.reload();
        });
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.loading ? (
          <>Hold Tight, Blockchain is getting loaded</>
        ) : (
          <>
            <AppBar position="relative">
              <Toolbar>
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{ right: 30 }}
                >
                  Home
                </Typography>

                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{ margin: 30 }}
                >
                  Community Events
                </Typography>
              </Toolbar>
            </AppBar>
            <center>
              <br />
              <div style={{ width: 900 }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.allAccounts}
                  getOptionLabel={(option) => option}
                  onChange={this.onAccountChange}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Please select an Account / User"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
            </center>
            <HashRouter>
              <Switch>
                <Route exact path="/" component={CommunityEvent} />

                <Route
                  exact
                  path="/home"
                  render={() => (
                    <RecycleItemList
                      account={this.state.account}
                      balance={this.state.accountBalance}
                      recycleCount={this.state.recycleCount}
                      items={this.state.items}
                      captureFile={this.captureFile}
                      createRecycleItem={this.createRecycleItem}
                    />
                  )}
                />
              </Switch>
            </HashRouter>
          </>
        )}
      </div>
    );
  }
}
export default App;
