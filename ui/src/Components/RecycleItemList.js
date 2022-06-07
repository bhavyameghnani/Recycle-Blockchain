import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
  },
});

class RecycleItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      impact: "",
      points: 0,
      city: "",
      company: "",
    };
    this.handleCreateTitle = this.handleCreateTitle.bind(this);
    this.handleCreateImpact = this.handleCreateImpact.bind(this);
    this.handleCreatePoints = this.handleCreatePoints.bind(this);
    this.handleCreateCity = this.handleCreateCity.bind(this);
    this.handleCreateCompany = this.handleCreateCompany.bind(this);
  }

  handleCreateTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleCreateImpact(event) {
    this.setState({ impact: event.target.value });
  }

  handleCreatePoints(event) {
    this.setState({ points: event.target.value });
  }

  handleCreateCity(event) {
    this.setState({ city: event.target.value });
  }

  handleCreateCompany(event) {
    this.setState({ company: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <h2>Blockchain POC on Recycle Items!</h2>
        {/* <h4>
          <i>Be the change you want to see!</i>
        </h4> */}

        <p>
          <b>Your Account:</b> {this.props.account}
        </p>
        <p>
          <b>Your Account Balance (in ethers):</b> {this.props.balance}
        </p>
        <p>
          <b>Recycled Item Count:</b> {this.props.recycleCount}
        </p>
        <br />

        <br />
        {this.props.items &&
          this.props.items.map((item, key) => (
            <div key={key}>
              <Card key={key} className={classes.root}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="450"
                  // image="https://www.wallpaperflare.com/static/933/816/833/digital-art-aircraft-cars-passenger-wallpaper.jpg"
                  image={"https://gateway.ipfs.io/ipfs/" + item.imageLocation}
                  title={item.title}
                />
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <b>Item Id: </b>
                    {item.id}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <p key={key}>{item.title} </p>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Owned by:</b> {item.owner}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Impact:</b> {item.impact}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Location:</b> {item.location}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Company:</b> {item.company}
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    <b>Image Location on IPFS:</b> {item.imageLocation}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    <b>Points:</b> {item.points} ethers
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              <br />
            </div>
          ))}
        <Paper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <center>
                <h3>
                  {" "}
                  <i>Add a new item</i>{" "}
                </h3>
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <TextField
                  id="standard-basic"
                  label="Enter title"
                  onChange={this.handleCreateTitle}
                />
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <TextField
                  id="standard-basic"
                  label="Enter impact"
                  onChange={this.handleCreateImpact}
                />
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <TextField
                  id="standard-basic"
                  label="Enter Points"
                  onChange={this.handleCreatePoints}
                />
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <input
                  type="file"
                  accept="*"
                  onChange={this.props.captureFile}
                  style={{ width: "150px" }}
                />
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <TextField
                  id="standard-basic"
                  label="Enter City"
                  onChange={this.handleCreateCity}
                />
              </center>
            </Grid>

            <Grid item xs={4}>
              <center>
                <TextField
                  id="standard-basic"
                  label="Enter Company"
                  onChange={this.handleCreateCompany}
                />
              </center>
            </Grid>

            <Grid item xs={12}>
              <center>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.createRecycleItem(
                      this.state.title,
                      this.state.impact,
                      this.state.city,
                      this.state.company,
                      this.state.points
                    );
                  }}
                >
                  Submit Now
                </Button>
              </center>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(RecycleItemList);
