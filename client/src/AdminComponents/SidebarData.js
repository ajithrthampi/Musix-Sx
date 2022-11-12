import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export const SidebarData = [
    {
        title: "Dashboard",
        path: "dashboard",
        icon: <DashboardIcon />,
    },
    {
        title: "Users",
        path: "users",
        icon: <PeopleAltIcon />,
    },
    {
        title: "Add Music",
        path: "addmusic",
        icon: <AddCircleOutlineIcon />,
    },
    {
        title: "Edit Music",
        path: "editmusic",
        icon: <LibraryMusicIcon />,
    },
]