import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Person3Icon from '@mui/icons-material/Person3';
import PendingIcon from '@mui/icons-material/Pending';
import { useNavigate, useLocation } from "react-router-dom"
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppStore } from '../appStore';
import { pages } from '../common/constants'
const drawerWidth = 240;

const openedMixin = (theme) => ({
    
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideNav() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const activeLink = location.pathname;

    const handleNavigation = (link) => {
        navigate(link);
    };

    const updateOpen = useAppStore((state) => state.updateOpen);
    const open = useAppStore((state) => state.dopen);

    const ref = React.useRef(null);

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    React.useLayoutEffect(() => {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
    }, []);
    console.log("Width:", width, "height:", height)
    return (
        // <Box sx={{ display: 'flex' }} ref={ref}>

            <Drawer variant="permanent" open={open} ref={ref}>
                <DrawerHeader >
                    <IconButton>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                                ml: "8px",
                                color: activeLink === pages.ROOT ? 'blue' : 'inherit', // Set background color based on activeLink
                                '&:hover': {
                                    color: 'blue',
                                },
                            }}
                            onClick={() => handleNavigation(pages.ROOT)}
                        >
                            <ListItemIcon>
                                <InboxIcon sx={{
                                    ml: "18px"
                                }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                ml: "8px",
                                justifyContent: 'center',
                                px: 2.5,
                                color: activeLink === pages.ALL_MERCHANTS_DATA ? 'blue' : 'inherit', // Set background color based on activeLink

                            }}
                            onClick={() => handleNavigation(pages.ALL_MERCHANTS_DATA)}
                        >
                            <ListItemIcon>
                                <Person3Icon sx={{
                                    ml: "18px"
                                }} />
                            </ListItemIcon>
                            <ListItemText primary="All Merchants Data" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5, ml: "8px",
                                color: activeLink === pages.SUCESS_HISTORY ? 'blue' : 'inherit', // Set background color based on activeLink
                                '&:hover': {
                                    color: 'blue',
                                },
                            }}
                            onClick={() => handleNavigation(pages.SUCESS_HISTORY)}
                        >
                            <ListItemIcon>
                                <CheckCircleOutlineIcon sx={{
                                    ml: "18px"
                                }} />
                            </ListItemIcon>
                            <ListItemText primary="Sucess history" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48, ml: "8px",
                                justifyContent: 'center',
                                px: 2.5,
                                color: activeLink === pages.PENDING_HISTORY ? 'blue' : 'inherit', // Set background color based on activeLink
                                '&:hover': {
                                    color: 'blue',
                                },
                            }}
                            onClick={() => handleNavigation(pages.PENDING_HISTORY)}
                        >
                            <ListItemIcon>
                                <PendingIcon sx={{
                                    ml: "18px"
                                }} />
                            </ListItemIcon>
                            <ListItemText primary="Pending history" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48, ml: "8px",
                                justifyContent: 'center',
                                px: 2.5,
                                color: activeLink === pages.FAILED_HISTORY ? 'blue' : 'inherit', // Set background color based on activeLink
                                '&:hover': {
                                    color: 'blue',
                                },
                            }}
                            onClick={() => handleNavigation(pages.FAILED_HISTORY)}
                        >
                            <ListItemIcon>
                                <CancelIcon sx={{
                                    ml: "18px"
                                }} />
                            </ListItemIcon>
                            <ListItemText primary="Failed history" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
            </Drawer>
        // </Box >
    );
}