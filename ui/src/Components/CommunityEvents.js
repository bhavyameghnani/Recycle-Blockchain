import React from "react";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function CommunityEvent() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h6"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Weekend Kartavya
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Be the change you want to see
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Become a Leader
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Join a group
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h4">
                      <center>{card.title}</center>
                    </Typography>
                    <br />
                    <Typography style={{ color: "#5F00D0" }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                    <Button size="small" style={{ color: "#F96740" }}>
                      Share
                    </Button>
                    <Button size="small" style={{ color: "#03AB30" }}>
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const cards = [
  {
    title: "Clean up your local park & streets near your home & office",
    description: "Points:100",
    image: "https://source.unsplash.com/weekly?park",
  },
  {
    title: "Lead & Host a river clean-up challenge in your society",
    description: "Points:150",
    image: "https://source.unsplash.com/weekly?river",
  },
  {
    title: "Build birdhouses for the little birdies in your neighourhood",
    description: "Points:200",
    image: "https://source.unsplash.com/weekly?bird",
  },
  {
    title: "Create your own eco-friendly wrapping paper/gift bags",
    description: "Points:50",
    image: "https://source.unsplash.com/weekly?bag",
  },
  {
    title: "Conduct an enviorment & sustainability session at your work place",
    description: "Points:150",
    image: "https://source.unsplash.com/weekly?work",
  },
  {
    title: "Teach various recycling activities to your younger generation",
    description: "Points:300",
    image: "https://source.unsplash.com/weekly?kid",
  },
];
