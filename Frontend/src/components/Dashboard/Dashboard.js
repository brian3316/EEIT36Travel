import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { blue, green, purple, white } from '@mui/material/colors';
import Dropdownbar from '../Navbar/DropDownBar'
import { useState } from 'react';
import Areachart from './Areachart';
import Agechart from './Agechart'
import { height, margin, padding } from '@mui/system';
import Githubapi from './Githubapi';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gettestadminname, setfradminloginpage, setisadmin } from '../DashBoardLogin/DBoardLoginInfo';
import Membertime from './Membertime'
import { zhTW } from '@mui/material/locale';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        <b>EEIT36 Travel Maker</b>
      </Link>{' '}
      {'Since 2021 - '}
      {new Date().getFullYear()}

    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#81c784',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    usewhite: {
      main: green[50]
    }
  }
});

export const logout = async () => {

  localStorage.setItem("adminloginpage", "false")
  window.location.href = "/";
  setisadmin();

}


function DashboardContent({ name }) {


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // DropDownBar
  /* const [anchorEl, setAnchorEl] = useState(null);
  const Elopen = Boolean(anchorEl);
  const handleMenuOpen = (e) => {
      setAnchorEl(e.currentTarget);
      console.log(e.currentTarget.style)
  };
  const handleMenuClose = () => {
      setAnchorEl(null);
  }; */

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />
        <AppBar position="absolute" open={open}  >

          <Toolbar

            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >

              <MenuIcon />

            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
            >

              旅。行 ｜ 後台首頁
            </Typography>
            <Avatar sx={{ marginRight: '10px', transition: 'width 0.15s ,height 0.15s', '&:hover': { cursor: 'pointer', width: 50, height: 50, boxShadow: ' 3px 7px #888888' } }} >{name.substring(0, 1)}</Avatar>
            <IconButton color="usewhite" >
              {/* Content可以塞data state */}
              <Badge badgeContent={0} color="neutral" >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button onClick={logout} sx={{ bgcolor: 'white', color: '#a5d6a7', '&:hover': { backgroundColor: 'whitesmoke', color: '#a5d6a7', fontWeight: 'bold', boxShadow: ' 3px 7px #888888' }, borderRadius: '10%', width: 90, height: 40 }}>登出</Button>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Membertime></Membertime>

                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}

              <Grid container spacing={2}>
                <Grid item xs={9} >
                  <Paper sx={{ height: 400, p: 2, display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 3 }}>
                    <Chart />


                  </Paper>
                </Grid>
                { /* <Grid item xs={5}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' ,marginTop:2,paddingLeft:0}}>
                
                  <Agechart></Agechart>
              
                </Paper>
              </Grid> */}

                <Grid item xs={3}>
                  <Paper sx={{ height: 400, p: 2, display: 'flex', flexDirection: 'column', marginTop: 2, marginLeft: 1 }}>

                    <Githubapi></Githubapi>

                  </Paper>
                </Grid>

              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  const [name, setName] = useState("");
  React.useEffect(() => {
    const test6 = async () => {

      setName(await gettestadminname());
    };
    test6();
  }, []);


  return <DashboardContent name={name} />;
}
