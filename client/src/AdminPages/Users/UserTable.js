import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserService from '../../services/UserService';
import { Box, Stack } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function AcccessibleTable() {
    const [user, setUser] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [reducer, forceUpdate] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => {
        getUser();
    }, [reducer, search])
    const getUser = async () => {
        const data = await UserService.getAllUser();
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const deleteHandler = async (id) => {
        setOpen(true);
        await UserService.deleteUser(id)
        forceUpdate();
    }
    const handleClose = () => {
        setOpen(false);
        forceUpdate();
    };
    return (
        <>
            <Card>
                <Box sx={{ mt: 3 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Search>
                </Box>
                <CardContent style={{ overflow: 'auto' }}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Box>
                            <Typography variant='h5' style={{ fontWeight: 600, color: "black", opacity: 0.5 }} sx={{
                                ml: 1, mt: 2, mb: 2
                            }}>
                                Users
                            </Typography>
                        </Box>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user && user?.filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item : item.name.toLowerCase().includes(search)
                                }).map((doc) => (
                                    <TableRow key={doc.name}>
                                        <TableCell component="th" scope="row">
                                            {doc.name}
                                        </TableCell>
                                        <TableCell align="right">{doc.email}</TableCell>
                                        <TableCell onClick={(e) => deleteHandler(doc.id)} align="right"><DeleteIcon/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure yo want to delete the User"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete User
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
