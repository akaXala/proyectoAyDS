"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

// Componentes del Login y Signup
import Login from "@/components/Login";
import Signup from "@/components/Signup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const TabsComponent: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className='modal'
    >
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider", textAlign: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="auth tabs"
          centered
        >
          <Tab label="Registrate" {...a11yProps(0)} />
          <Tab label="Acceder" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Box>
  );
};

export default TabsComponent;
