import React, { useEffect, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faSearch, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faPhone, faIdBadge, faPhoneAlt, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';

function Recordings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fetchRecordingsData, setfetchRecordingsData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecordingsData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const result = await axios.get(`${API_BASE_URL}/GetRecordingsData`, 'http://localhost:8090/GetRecordingsData');
        setfetchRecordingsData(result.data.recordingsData);
      } catch (error) {
        console.log("Error fetching recordings: ", error);
      }
    };
    fetchRecordingsData();
  }, []);

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
      {/* <div className="w-full px-6 py-6 mx-auto">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <h6 className="text-xl font-semibold mb-5">Recordings Table</h6>
            </div> */}

            <div className="w-full px-6 py-6 mx-auto">
              <div className="flex-none w-full max-w-full px-3">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                  <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <h6 className="text-xl font-semibold mb-5">Recordings Table</h6>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 mb-8">
                    {/* Calling Number Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">Calling Number</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text" className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with calling no..." />
                      </div>
                    </div>
                    {/* Inum Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">Inum</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text" className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with inum..." />
                      </div>
                    </div>
                    {/* Start Date Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">Start Date</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <input type="date" className="pl-3 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" />
                      </div>
                    </div>
                    {/* Call Type Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">Call Type</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                          <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <select className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow">
                          <option value="">Select call type</option>
                          <option value="incoming">Incoming</option>
                          <option value="outgoing">Outgoing</option>
                        </select>
                      </div>
                    </div>
                    {/* Dialed Number Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">Dialed Number</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input type="text" className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search with dialed no..." />
                      </div>
                    </div>
                    {/* End Date Search Box */}
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">End Date</label>
                      <div className="relative flex items-stretch w-full transition-all rounded-md ease-soft">
                        <input type="date" className="pl-3 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 px-10 mb-8">
                    {/* Global Search Box */}
                    <div className="relative flex flex-wrap items-stretch w-1/6 transition-all rounded-md ease-soft">
                      <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-md rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-gray-700 transition-all">
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                      <input type="text" className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-32 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search anything..." />
                    </div>
                    {/* Buttons with Gradient Hover */}
                    <button className="bg-white text-blue-500 border border-blue-500 px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">Search</button>
                    <button className="bg-white text-green-500 border border-green-500 px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400">Export to Excel</button>
                    <button className="bg-white text-red-500 border border-red-500 px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400">Download PDF</button>
                    <button className="bg-white text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md text-sm shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">Print</button>
                  </div>

                  <div className="flex-auto px-0 pt-0 pb-2">
                    <div className="p-0 overflow-x-auto">
                      <DataTable
                        columns={[
                          {
                            name: 'Day',
                            selector: row => row._startDayName,
                            sortable: true,
                            wrap: true,
                            center: true
                          },
                          {
                            name: 'Date',
                            selector: row => row._startDate,
                            sortable: true,
                            wrap: true,
                            center: true
                          },
                          {
                            name: 'Calling Party',
                            selector: row => row.core_callingparty,
                            sortable: true,
                            wrap: true,
                            center: true
                          },
                          {
                            name: 'Called party',
                            selector: row => row.core_calledparty,
                            sortable: true,
                            wrap: true,
                            center: true
                          },
                          {
                            name: 'Agent Name',
                            selector: row => row.agentname,
                            sortable: true,
                            wrap: true,
                          },
                          {
                            name: 'Global Call ID',
                            selector: row => row.core_globalcallid,
                            sortable: true,
                            wrap: true,
                          },
                          {
                            name: 'Incoming/Outgoing',
                            selector: row => row.isInComing,
                            sortable: true,
                            wrap: true,
                            center: true
                          },
                        ]}
                        customStyles = {{
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
                        data={fetchRecordingsData}
                        pagination
                        fixedHeader
                        paginationPerPage={50}
                        paginationRowsPerPageOptions={[50, 100, 300, 500, 1000]}
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

export default Recordings;
