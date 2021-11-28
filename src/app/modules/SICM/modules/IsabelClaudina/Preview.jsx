import React from "react";
import { Grid } from "@material-ui/core";
// eslint-disable-next-line
import { makeStyles } from "@material-ui/core/";
import { PreviewAlert } from "../../components";
import { PreviewBulletin } from "../../components";

const useStyles = makeStyles({
  root: {
    marginTop: "30px",
    flexWrap: 1,
  },
});

function Preview({ alert, formData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <PreviewAlert alert={alert} formData={formData} />
        </Grid>

        {alert.sicmBoletines
          ? alert.sicmBoletines.map((boletin) => (
              <Grid
                item
                sx={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                key={boletin.codigoBoletin}
              >
                <PreviewBulletin
                  alert={2}
                  boletin={boletin}
                  formData={formData}
                />
              </Grid>
            ))
          : alert.boletines.map((boletin, index) => (
              <Grid item sx={12} sm={12} md={6} lg={6} xl={6} key={index}>
                <PreviewBulletin
                  alert={2}
                  boletin={boletin}
                  formData={formData}
                />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export { Preview };
