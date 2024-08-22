import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Navbar/Navbar';
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
  Paper,
  FormControl, MenuItem, InputLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from '@mui/icons-material/LockReset';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import './Admin.css';
import '../Styles.css'
import Select from 'react-select';

function Admin() {
  const paperStyle = { padding: 20, height: '60vh', width: 400, margin: "20px auto" }
  const btnstyle = { margin: '30px 0', width: 150 }
  const [course, setCourse] = useState()
  const courseInfo = ["Java", "AWS"]
  const [role, setRole] = useState()
  const roleInfo = ["USER", "ADMIN"]



  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    courseNames: [],
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [userToEdit, setUserToEdit] = useState(null);
  const [editedUser, setEditedUser] = useState({ fullName: '', email: '', courseNames: [], role: '' }); 
  const [editOpen, setEditOpen] = useState(false);

  const handleChange = (selectedOptions) => {
    const selectedCourses = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewUser({ ...newUser, courseNames: selectedCourses });
  };

  const courseOptions = [
    { value: 'Java', label: 'Java' },
    { value: 'Devops', label: 'DevOps' },
    { value: 'Html', label: 'Html' },
  ];




  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '350px', // Adjust the width here
      fontSize: '16px', // Adjust the font size here
    }),
    menu: (provided) => ({
      ...provided,
      minWidth: '300px', // Adjust the width here
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '16px', // Adjust the font size for options here
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '16px', 
    }),
    multiValue: (provided) => ({
      ...provided,
      fontSize: '16px', 
    }),
  };

  //Getting users list

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    axios
      .get("http://localhost:8080/admin/users-with-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Log the response data
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!newUser.email) newErrors.email = 'Email is required';
    if (!newUser.fullName) newErrors.fullName = 'Full Name is required';
    if (!newUser.role) newErrors.role = 'Role is required';
    if (newUser.courseNames.length === 0) newErrors.courseNames = 'Course selection is required';
    return newErrors;
  };

  const validateUpdated = () => {
    const newErrors = {};
    if (!editedUser.email) newErrors.email = 'Email is required';
    if (!editedUser.fullName) newErrors.fullName = 'Full Name is required';
    if (!editedUser.role) newErrors.role = 'Role is required';
    if (editedUser.courseNames.length === 0) newErrors.courseNames = 'Course selection is required';
    return newErrors;
  };


  // Adding user

  const handleAddUser = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    axios
      .post("http://localhost:8080/admin/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {

        console.log(response.data);
        setUsers([...users, response.data]);
        setNewUser({ fullName: "", email: "", courseNames: [], role: "" }); //, role: ""
        setErrors({});
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;


  //   if (name === "courseNames") {
  //     setNewUser({
  //       ...newUser,
  //       courseNames: value.split(",").map((course) => course.trim()),
  //     });
  //   } else {
  //     setNewUser({ ...newUser, [name]: value });
  //     console.log(newUser);
  //   }
  // };

  // Deleting user

  const handleClickOpen = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      setUserToDelete(index);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = () => {
    if (userToDelete === null || userToDelete < 0 || userToDelete >= users.length) {
      console.error("Invalid user index");
      handleClose();
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      handleClose();
      return;
    }

    const userId = users[userToDelete].id;

    axios
      .delete(`http://localhost:8080/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers(users.filter((_, i) => i !== userToDelete));
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        handleClose();
      });
  };


  //Editing User

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedUser({ ...editedUser, [name]: value });
  //   if (name === "courseNames") {
  //     setEditedUser({
  //       ...editedUser,
  //       courseNames: value.split(",").map((course) => course.trim()),
  //     });
  //   } else {
  //     setEditedUser({ ...editedUser, [name]: value });
  //     console.log(newUser);
  //   }
  // };

  const handleEditChange = (selectedOptions) => {
    const selectedCourses = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setEditedUser({ ...editedUser, courseNames: selectedCourses });
  };

  const handleEditOpen = (id) => {
    const index = users.findIndex(user => user.id === id);
    setUserToEdit(index);
    const user = users[index];
    setEditedUser({ ...user });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setUserToEdit(null);
    setEditedUser({ fullName: '', email: '', courseNames: [], role: '' });
    setErrors({});
  };

  const handleEditUser = () => {

    const newErrors = validateUpdated();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (userToEdit === null || userToEdit < 0 || userToEdit >= users.length) {
      console.error('Invalid user index:', userToEdit);
      return;
    }
    const userId = users[userToEdit].id;
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:8080/admin/users/${userId}`, editedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const updatedUsers = [...users];
        updatedUsers[userToEdit] = editedUser;
        setUsers(updatedUsers);
        handleEditClose();
        
      })
      .catch((error) => {
        console.error('Error editing user:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  // Edit user ends

  // User reset-password by Admin

  const handleResetPassword = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      console.error("User not found");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .post(`http://localhost:8080/admin/users/${id}/reset-password`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        alert('Password has been reset successfully. User can now login with the default password.');
        // Optionally, you can refresh the user data or perform other actions here
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        alert('Failed to reset the password.');
      });
  };

  // User reset-password by Admin ends


  //Handling user Account Status

  const handleToggleStatus = (id, currentStatus) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      console.error("User not found");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const enable = !currentStatus; // Toggle the status

    axios
      .post(`http://localhost:8080/admin/users/${id}/toggle-status?enable=${enable}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        alert(`User status has been ${enable ? 'enabled' : 'disabled'} successfully.`);
        // Optionally, update the user's status in the state
        const updatedUsers = [...users];
        updatedUsers[index].enabled = enable; // Assuming `enabled` is the status field
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(`Error ${enable ? 'enabling' : 'disabling'} user:`, error);
        alert(`Failed to ${enable ? 'enable' : 'disable'} the user.`);
      });
  };



  //Handling user Account Status ends


  const handleChangePage = (params) => {
    setPage(params.page);
  };

  const handleChangeRowsPerPage = (params) => {
    setRowsPerPage(params.pageSize);
    setPage(0);
  };

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "courseNames", headerName: "Courses", width: 300 },
    {
      field: "enabled", headerName: "Account Status", width: 300,

      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color={params.row.enabled ? "primary" : "default"}
            onClick={() => handleToggleStatus(params.row.id, params.row.enabled)}
          >
            {params.row.enabled ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </IconButton>
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            {params.row.enabled ? "Active" : "Inactive"}
          </Typography>

        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEditOpen(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleClickOpen(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleResetPassword(params.row.id)}>
            <LockResetIcon />
          </IconButton>

        </div>
      ),
    },
  ];

  const rows = users.map((newUser, index) => ({
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    //  courseNames: Array.isArray(user.courseNames) ? user.courseNames.join(", ") : "",
    // courseNames: newUser.courseNames.join(", "), // Join course names into a single string
    courseNames: Array.isArray(newUser.courseNames) ? newUser.courseNames.join(", ") : "", // Ensure courseNames is an array
    // courseNames: Array.isArray(newUser.courseNames) ? newUser.courseNames.map(course => course.courseName).join(", ") : "", 
    // courseNames: newUser.courseNames,
    enabled: newUser.enabled,
    // courseNames: newUser.courseNames ? newUser.courseNames.map(course => course.courseName).join(", ") : "", 
    //courseNames: newUser.courseNames,
    role: newUser.role,
  }));

  return (
    <>
      {/* <Navbar>

  </Navbar> */}
      <div className='admin-container'>
        <div style={{ marginTop: "80px" }} className='admin-content'>

          <div className='container'>
            <div className='header'>
              <div className="text">Add User</div>
              <div className="underline"></div>
            </div>
            
            <div className="inputs">
              <div className="input-group">
              {errors.email && <div className="error">{errors.email}</div>}
                <input type="email" name="email" placeholder="Email" 
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  value={newUser.email}
                  required
                />
              </div>
              <div className="input-group">
              {errors.fullName && <div className="error">{errors.fullName}</div>}
                <input type="text" name="fullName" placeholder="Full Name" 
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                 required
                  value={newUser.fullName}
                />

              </div>
              <div className="input-group">
              {errors.role && <div className="error">{errors.role}</div>}
                <input type="text" name="role" placeholder="Enter role" 
                 onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  value={newUser.role}
                  required
                />
              </div>

             
              <div className="input-group">
                {/* <select
                   name="courseNames"
                  value={newUser.courseNames.join(", ")}
                  onChange={handleChange}
                  >
                  <option value=""  hidden>
                  Select Course
                 </option>
                 <option value="Java">Java</option>
                 <option value="Devops">DevOps</option>
                 </select> */}
                 
                 {errors.courseNames && <div className="error">{errors.courseNames}</div>}
                <Select
                  name="courseNames"
                  options={courseOptions}
                  isMulti
                  onChange={handleChange}
                  placeholder="Select Course"
                  value={courseOptions.filter(option => newUser.courseNames.includes(option.value))}
                  styles={customStyles}
                  required
                />
              </div>
            </div>
            <div className="submit-container">
              <div className="submit" onClick={handleAddUser}  >
                Add User
              </div>
            </div>

          </div>



          <Container>

            <h2 className='admin-title' >Users List</h2>

            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={12}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    className="data-grid-custom"
                    rows={rows}
                    columns={columns}
                    pageSize={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onPageSizeChange={handleChangeRowsPerPage}
                  />
                </div>
              </Grid>
            </Grid>
          </Container>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={editOpen} onClose={handleEditClose} style={{ width: '100%' }}>

            <DialogTitle >
              <div className='header'>
                <div className="text">Edit User</div>
                <div className="underline"></div>
              </div>

            </DialogTitle>
            <DialogContent style={{ fontSize: '26px' }}>

              <div className="inputs">
                <div className="input-group">
                {errors.email && <div className="error">{errors.email}</div>}
                  <input type="email" name="email" placeholder="Email" value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                {errors.fullName && <div className="error">{errors.fullName}</div>}
                  <input type="text" name="fullName" placeholder="Full Name" value={editedUser.fullName}
                   onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                    required
                  />


                </div>
                <div className="input-group">
                {errors.role && <div className="error">{errors.role}</div>}
                  <input type="text" name="role" placeholder="Enter role" 
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <select
                   name="courseNames"
                  value={editedUser.courseNames.join(", ")}
                  onChange={handleEditChange}
                  >
                  <option value=""  hidden>
                  Select Course
                 </option>
                 <option value="Java">Java</option>
                 <option value="Devops">DevOps</option>
                 </select> */}
                 {errors.courseNames && <div className="error">{errors.courseNames}</div>}

                  <Select
                    name="courseNames"
                    options={courseOptions}
                    isMulti
                    onChange={handleEditChange}
                    placeholder="Select Course"
                    value={courseOptions.filter(option => editedUser.courseNames.includes(option.value))}
                    styles={customStyles}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} sx={{ backgroundColor: 'grey' }} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleEditUser} color="primary" sx={{ backgroundColor: '#4c00b4' }} variant="contained">
                Save
              </Button>
            </DialogActions>

          </Dialog>

          <footer className="footer">
            &copy; copyright @ 2024 by <span>ManthaTech Solutions</span> | all
            rights reserved!
          </footer>
        </div>
      </div>
    </>
  );
}

export default Admin;
