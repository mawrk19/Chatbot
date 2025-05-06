'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InfoIcon from '@mui/icons-material/Info';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const menuItems = [
  { label: 'New Chat', href: '/', icon: <PlaylistAddIcon /> },
  { label: 'Model', href: '/model', icon: <AutoModeIcon /> },
  { label: 'About', href: '/about', icon: <InfoIcon /> },
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.href} passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="absolute left-[2rem] top-[2rem] gap-4 rounded-lg p-4">
      <Button onClick={toggleDrawer(true)} className="text-4xl">
        <SlideshowIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
