import React from "react";
// eslint-disable-next-line no-restricted-imports
import { useTheme } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core/";
import { Tabs } from "@material-ui/core/";
import { Tab } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import { Box } from "@material-ui/core/";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AlertTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Alerta" />
          <Tab label="Boletines" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
    </div>
  );
}

export { AlertTabs, TabPanel };
