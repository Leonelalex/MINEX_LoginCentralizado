import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core/";
import { CardActionArea } from "@material-ui/core/";
import { CardContent } from "@material-ui/core/";
import { CardMedia } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

const useStyles = makeStyles({
  root: {
    //    maxWidth: 345,
  },
  action: {
    height: 300,
  },
});

export function AppCard({ sistem }) {
  const classes = useStyles();

  return (
    <Link to={`/${sistem.siglas}`}>
      <Card className={classes.root}>
        <CardActionArea className={classes.action}>
          <CardMedia
            component="img"
            alt={sistem.sistema}
            height="140"
            width="140"
            image={toAbsoluteUrl("/media/apps/logo.png")}
            title={sistem.sistema}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {sistem.sistema}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {sistem.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
