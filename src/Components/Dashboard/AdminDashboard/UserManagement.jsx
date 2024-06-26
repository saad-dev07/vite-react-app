import React, { useEffect, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function UserManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fetchUsersData, setFetchUsersData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
    
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const result = await axios.get(`${API_BASE_URL}/GetUserData`, 'http://localhost:8090/GetUserData');
        setFetchUsersData(result.data.userData);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (row) => {
    const UserId = row.UserId;
    console.log('Edit user with ID:', UserId);
    // Add your edit logic here
  };

  const handleDelete = async (UserId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Delete`, 'http://localhost:8090/Delete', {
        params: { UserId }
      });
      setFetchUsersData(fetchUsersData.filter(user => user.UserId !== UserId));
      window.alert(response.data.message);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      
      {/* Sidebar */}
      <div className={`fixed z-50 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out xl:translate-x-0`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 bg-light">
        
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Table */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="text-xl font-semibold mb-5">User Management</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                      columns={[
                          {
                              name: 'Profile Image',
                              selector: row => {
                                  const image = `/assets/img/user/${row.ProfileImage}`;
                                  return row.ProfileImage ? (
                                      <div className="flex justify-center">
                                          <img src={image} alt="Profile" className="h-10 w-10 rounded-full" />
                                      </div>
                                  ) : (
                                      "No Image"
                                  );
                              },
                              sortable: false,
                              center: true,
                              wrap: true,
                          },
                          {
                              name: 'Username',
                              selector: row => row.FullName,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'Email',
                              selector: row => row.Email,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'First Name',
                              selector: row => row.FirstName,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'Last Name',
                              selector: row => row.LastName,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'Contact No',
                              selector: row => row.ContactNo,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'Date Created',
                              selector: row => row.DateCreated,
                              sortable: true,
                              wrap: true,
                          },
                          {
                              name: 'Actions',
                              cell: row => (
                                  <div className='flex justify-center space-x-4'>
                                      <button className='hover:text-blue-800 hover:font-semibold' onClick={() => handleEdit(row)}>
                                          <FontAwesomeIcon icon={faEdit} />
                                      </button>
                                      <button className='hover:text-rose-800 hover:font-extrabold' onClick={() => handleDelete(row.UserId)}>
                                          <FontAwesomeIcon icon={faTrashCan} />
                                      </button>
                                  </div>
                              ),
                              sortable: false,
                              center: true,
                              wrap: true,
                          }
                      ]}
                      customStyles={{
                          headCells: {
                              style: {
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                  textTransform: 'uppercase',
                                  backgroundColor: '#e8e8e8',
                              },
                          },
                          rows: {
                              style: {
                                  minHeight: '50px',
                                  '&:not(:last-of-type)': {
                                      borderBottomStyle: 'solid',
                                      borderBottomWidth: '1px',
                                      borderBottomColor: '#d1d1d1',
                                  },
                                  '&:hover': {
                                      backgroundColor: '#f1f1f1',
                                  },
                              },
                          },
                          pagination: {
                              style: {
                                  borderTopStyle: 'solid',
                                  borderTopWidth: '1px',
                                  borderTopColor: '#d1d1d1',
                              },
                          },
                      }}
                      fixedHeader
                      data={fetchUsersData}
                      pagination
                      paginationPerPage={10}
                      paginationRowsPerPageOptions={[10, 30, 50, 100]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}

export default UserManagement;
