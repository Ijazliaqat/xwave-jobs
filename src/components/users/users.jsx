import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersListQuery } from "../../services/api";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const {
    data: userList,
    error: userListErr,
    isLoading: isUserList,
  } = useGetUsersListQuery();

  const handleSearch = (event) => {
    const value = event?.target?.value.toLowerCase();
    setSearchText(value);

    // Filter rows based on search input
    const filteredRows = userList?.users?.filter((row) =>
      row?.name?.toLowerCase().includes(value)
    );
    setRows(filteredRows);
  };

  // Handle button click
  const handleButtonClick = (row) => {
    console.log("Row Data:", row);
  };

  useEffect(() => {
    const userData = userList?.users?.map((user) => ({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      myJobsLength: user?.myJobs?.length,
    }));

    setRows(userData);
  }, [userList]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "myJobsLength",
      headerName: "Applied",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            backgroundColor: "#08008F",
            "&:hover": {
              backgroundColor: "#08008F",
            },
            textTransform: "capitalize",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => handleButtonClick(params.row)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, mt: 5 }}>
      <Typography variant="h5">Users List</Typography>
      <div className="mt-2" style={{ height: 500, width: "100%" }}>
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
          fullWidth
          size="small"
        />
        <DataGrid rows={rows} columns={columns} pageSize={10} pagination />
      </div>
    </Box>
  );
};

export default Users;
