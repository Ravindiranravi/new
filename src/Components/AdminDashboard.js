import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [newStudent, setNewStudent] = useState({id:0, username: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interestToStudy: '' });
    const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

    useEffect(() => {
        fetchStudents();
        fetchUsers();
    }, []);

    const API_URL = 'https://localhost:5001/api/admin';  // Adjust according to your backend

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5078/api/Admin/Students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5078/api/Admin/Users");
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5078/api/Admin/students/${id}`);
            fetchStudents(); // Refresh the student list
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${'http://localhost:5078/api/Admin'}/users/${id}`);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddStudent = async () => {
        try {
            await axios.post('http://localhost:5078/api/Admin/Students', {
                "id": 0,
                "username": newStudent.username,
                "password": "jjhkflklhf",
                "email":newStudent.email,
                "contact": newStudent.contact,
                "gender": newStudent.gender,
                "dateOfBirth":newStudent.dateOfBirth,
                "address": newStudent.address,
                "qualification": newStudent.qualification,
                "interestToStudy": newStudent.interestToStudy
              });
            setNewStudent({id:0, username: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interestToStudy: '' });
            fetchStudents(); // Refresh the student list
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post(`${'http://localhost:5078/api/Admin'}/users`, newUser);
            setNewUser({ username: '', password: '', role: '' });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <h2>Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Qualification</th>
                        <th>Interests</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.contact}</td>
                            <td>{student.gender}</td>
                            <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                            <td>{student.address}</td>
                            <td>{student.qualification}</td>
                            <td>{student.interests}</td>
                            <td>
                                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Student</h2>
            <input type="text" placeholder="Name" value={newStudent.username} onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })} />
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
            <input type="text" placeholder="Contact" value={newStudent.contact} onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })} />
            <input type="text" placeholder="Gender" value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} />
            <input type="date" value={newStudent.dateOfBirth} onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })} />
            <input type="text" placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} />
            <input type="text" placeholder="Qualification" value={newStudent.qualification} onChange={(e) => setNewStudent({ ...newStudent, qualification: e.target.value })} />
            <input type="text" placeholder="Interests" value={newStudent.interestToStudy} onChange={(e) => setNewStudent({ ...newStudent, interestToStudy   : e.target.value })} />
            <button onClick={handleAddStudent}>Add Student</button>

            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New User</h2>
            <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <input type="text" placeholder="Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   AppBar, Box, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem,
//   ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, ThemeProvider, createTheme
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import FaceIcon from '@mui/icons-material/Face';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import MenuIcon from '@mui/icons-material/Menu';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// import GroupsIcon from '@mui/icons-material/Groups';
// import PersonIcon from '@mui/icons-material/Person';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//     const [students, setStudents] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [newStudent, setNewStudent] = useState({ id: 0, username: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interestToStudy: '' });
//     const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const isMobile = useMediaQuery('(max-width:600px)');

//     const theme = createTheme({
//         palette: {
//             primary: {
//                 main: '#1976d2',
//             },
//             background: {
//                 default: '#f4f6f8',
//             },
//         },
//     });

//     useEffect(() => {
//         fetchStudents();
//         fetchUsers();
//     }, []);

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get('http://localhost:5078/api/Admin/Students');
//             setStudents(response.data);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5078/api/Admin/Users");
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const deleteStudent = async (id)=> {
//         try {
//             await axios.delete(`http://localhost:5078/api/Admin/students/${id}`);
//             fetchStudents();
//         } catch (error) {
//             console.error('Error deleting student:', error);
//         }
//     };

//     const deleteUser = async (id)=> {
//         try {
//             await axios.delete(`http://localhost:5078/api/Admin/users/${id}`);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleAddStudent = async () => {
//         try {
//             await axios.post('http://localhost:5078/api/Admin/Students', newStudent);
//             setNewStudent({ id: 0, username: '', email: '', contact: '', gender: '', dateOfBirth: '', address: '', qualification: '', interestToStudy: '' });
//             fetchStudents();
//         } catch (error) {
//             console.error('Error adding student:', error);
//         }
//     };

//     const handleAddUser = async () => {
//         try {
//             await axios.post('http://localhost:5078/api/Admin/users', newUser);
//             setNewUser({ username: '', password: '', role: '' });
//             fetchUsers();
//         } catch (error) {
//             console.error('Error adding user:', error);
//         }
//     };

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     const drawer = (
//         <div>
//             <Toolbar />
//             <Divider />
//             <List>
//                 <ListItem disablePadding>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <GroupsIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Students" />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem disablePadding>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <PersonIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Users" />
//                     </ListItemButton>
//                 </ListItem>
//                 <Divider />
//                 <ListItem disablePadding>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <PlaylistAddIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Add New Student" />
//                     </ListItemButton>
//                 </ListItem>
//                 <ListItem disablePadding>
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <PersonAddAlt1Icon />
//                         </ListItemIcon>
//                         <ListItemText primary="Add New User" />
//                     </ListItemButton>
//                 </ListItem>
//             </List>
//         </div>
//     );

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ display: 'flex' }}>
//                 <CssBaseline />
//                 <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//                     <Toolbar>
//                         <IconButton
//                             color="inherit"
//                             aria-label="open drawer"
//                             edge="start"
//                             onClick={handleDrawerToggle}
//                             sx={{ mr: 2, display: { sm: 'none' } }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" noWrap>
//                             Admin Dashboard
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <Drawer
//                     variant={isMobile ? "temporary" : "permanent"}
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{
//                         keepMounted: true, // Better open performance on mobile.
//                     }}
//                     sx={{
//                         display: { xs: 'block', sm: 'none' },
//                         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//                 <Box
//                     component="main"
//                     sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
//                 >
//                     <Toolbar />
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <Typography variant="h6">Students</Typography>
//                             <Box>
//                                 <table className="dashboard-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                             <th>Contact</th>
//                                             <th>Gender</th>
//                                             <th>Date of Birth</th>
//                                             <th>Address</th>
//                                             <th>Qualification</th>
//                                             <th>Interests</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {students.map((student) => (
//                                             <tr key={student.id}>
//                                                 <td>{student.username}</td>
//                                                 <td>{student.email}</td>
//                                                 <td>{student.contact}</td>
//                                                 <td>{student.gender}</td>
//                                                 <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
//                                                 <td>{student.address}</td>
//                                                 <td>{student.qualification}</td>
//                                                 <td>{student.interestToStudy}</td>
//                                                 <td>
//                                                     <Button variant="contained" color="secondary" onClick={() => deleteStudent(student.id)}>
//                                                         Delete
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </Box>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Typography variant="h6">Add New Student</Typography>
//                             <Box>
//                                 <input type="text" placeholder="Name" value={newStudent.username} onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })} />
//                                 {/ Other inputs /}
//                                 <Button variant="contained" color="primary" onClick={handleAddStudent}>
//                                     Add Student
//                                 </Button>
//                             </Box>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Typography variant="h6">Users</Typography>
//                             <Box>
//                                 <table className="dashboard-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Username</th>
//                                             <th>Role</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {users.map((user) => (
//                                             <tr key={user.id}>
//                                                 <td>{user.username}</td>
//                                                 <td>{user.role}</td>
//                                                 <td>
//                                                     <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)}>
//                                                         Delete
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </Box>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Typography variant="h6">Add New User</Typography>
//                             <Box>
//                                 <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
//                                 {/ Other inputs /}
//                                 <Button variant="contained" color="primary" onClick={handleAddUser}>
//                                     Add User
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default AdminDashboard;