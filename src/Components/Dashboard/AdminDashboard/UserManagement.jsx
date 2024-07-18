import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import api from '../../../utils/api';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
// import register from '../../Auth/Register';

function UserManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fetchUsersData, setFetchUsersData] = useState([]);
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };
  const closeSidebar = () => { setIsSidebarOpen(false); };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.get('/GetUserData');
        setFetchUsersData(result.data.userData);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const CreateNewUser = async () => {
    navigate('/UserManagement/Register');
  }

  const handleEdit = (row) => {
      const userId = row.UserId;
      // console.log('Edit user with ID:', userId);
      navigate(`/UserManagement/UserProfile/${userId}`);
  };
  
  const handleDelete = async (UserId) => {
    try {
      const response = await api.delete('/Delete', {
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
              <div className="flex justify-between items-center p-6 pb-0 mb-3 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="text-xl font-semibold">User Management</h6>
                <button className="text-sm font-bold bg-gradient-to-r from-red-700 to-pink-600 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-700 rounded-full px-5 py-2 transition duration-300" onClick={CreateNewUser}>Create User</button>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <DataTable
                      columns={[
                          {
                              name: 'Profile Image',
                              selector: row => {
                                  const image = `/images/users/${row.ProfileImage}`;
                                  return row.ProfileImage ? (
                                      <div className="flex justify-center">
                                          <img src={image} alt="Profile" className="h-10 w-10 rounded-full" />
                                      </div>
                                  ) : (
                                      "No Image"
                                  );
                              },
                              sortable: false,
                              center: "true",
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
