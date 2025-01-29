import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  TextField, 
  Typography,
  InputLabel 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange"
  });

  const userDetails = localStorage.getItem("token");
  const { user } = userDetails ? JSON.parse(userDetails) : { user: {} };

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const fullName = `${firstName} ${lastName}`.trim();

  const onSubmit = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    toast.success("Profile Updated Successfully!", {
      position: "top-right",
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Box sx={{ width: "100%", bgcolor: "#F8F8F8", minHeight: "100vh" }}>
      
        <Box sx={{ 
          p: 2, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: "1px solid #E0E0E0"
        }}>
          <Typography 
            component="h1" 
            sx={{ 
              fontSize: "24px", 
              fontWeight: "bold",
              color: "#6941C6"
            }}
          >
            Wave
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button sx={{ color: "#000" }}>Home</Button>
            <Button sx={{ color: "#000" }}>My Jobs</Button>
          </Box>
        </Box>

        {/* Profile Content */}
        <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}>
          <Card sx={{ 
            bgcolor: "#F0F9FF",
            p: "24px 48px",
            borderRadius: "8px",
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 3
          }}>
            <Avatar 
              sx={{ 
                bgcolor: "#1B224B", 
                width: 80, 
                height: 80,
                fontSize: "28px",
                fontWeight: "500"
              }}
            >
              {getInitials(fullName) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "500", fontSize: "20px" }}>
                {fullName || "User"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#475467", fontSize: "16px" }}>
                {email || "No email provided"}
              </Typography>
            </Box>
          </Card>

          <Box sx={{ 
            maxWidth: "700px", 
            mx: "auto",
            bgcolor: "white", 
            p: "32px 48px", 
            borderRadius: "8px" 
          }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#101828" }}>
                  Edit Profile
                </Typography>
                <EditIcon sx={{ fontSize: 18, color: "#344054" }} />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                <Box>
                  <Box sx={{ 
                    position: "relative",
                    mb: 3
                  }}>
                    <Typography 
                      component="span"
                      sx={{ 
                        position: "absolute",
                        top: -9,
                        left: 10,
                        px: 1,
                        fontSize: "12px", 
                        color: "#666",
                        bgcolor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      First Name
                    </Typography>
                    <Box sx={{ 
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      p: "8px 14px",
                    }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        defaultValue={firstName}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ 
                          "& input": {
                            p: 0,
                            fontSize: "14px",
                            color: "#101828"
                          }
                        }}
                        {...register("firstName")}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ 
                    position: "relative",
                    mb: 3
                  }}>
                    <Typography 
                      component="span"
                      sx={{ 
                        position: "absolute",
                        top: -9,
                        left: 10,
                        px: 1,
                        fontSize: "12px", 
                        color: "#666",
                        bgcolor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      Last Name
                    </Typography>
                    <Box sx={{ 
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      p: "8px 14px",
                    }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        defaultValue={lastName}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ 
                          "& input": {
                            p: 0,
                            fontSize: "14px",
                            color: "#101828"
                          }
                        }}
                        {...register("lastName")}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ 
                    position: "relative",
                    mb: 3
                  }}>
                    <Typography 
                      component="span"
                      sx={{ 
                        position: "absolute",
                        top: -9,
                        left: 10,
                        px: 1,
                        fontSize: "12px", 
                        color: "#666",
                        bgcolor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      Email address
                    </Typography>
                    <Box sx={{ 
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      p: "8px 14px",
                    }}>
                      <TextField
                        fullWidth
                        variant="standard"
                        defaultValue={email}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        sx={{ 
                          "& input": {
                            p: 0,
                            fontSize: "14px",
                            color: "#101828"
                          }
                        }}
                        {...register("email")}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, position: "relative" }}>
                      <Typography 
                        component="span"
                        sx={{ 
                          position: "absolute",
                          top: -9,
                          left: 10,
                          px: 1,
                          fontSize: "12px", 
                          color: "#666",
                          bgcolor: "#fff",
                          zIndex: 1,
                        }}
                      >
                        Phone No
                      </Typography>
                      <Box sx={{ 
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        p: "8px 14px",
                      }}>
                        <TextField
                          fullWidth
                          variant="standard"
                          placeholder="Add phone no"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          sx={{ 
                            "& input": {
                              p: 0,
                              fontSize: "14px",
                              color: "#101828",
                              "&::placeholder": {
                                color: "#667085",
                                opacity: 1
                              }
                            }
                          }}
                          {...register("phone")}
                        />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#F2F4F7",
                        color: "#344054",
                        fontSize: "14px",
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        height: "40px",
                        marginTop: "4px",
                        borderRadius: "8px",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#E4E7EC",
                          boxShadow: "none"
                        }
                      }}
                    >
                      Verify
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
                <Button 
                  type="submit"
                  sx={{ 
                    bgcolor: "#E4E7EC",
                    color: "#344054",
                    textTransform: "none",
                    fontSize: "14px",
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#D3D7DE"
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDetails;
