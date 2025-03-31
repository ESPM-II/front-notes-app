import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { handleLogout } = useAuth();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "block", sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="#" passHref>
              <Button
                color="inherit"
                sx={{ textDecoration: "none", color: "white" }}
              >
                NoteApp
              </Button>
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <List
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
