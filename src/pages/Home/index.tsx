import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { IJourney } from "../../types/app";
import { getAllJourney } from "../../libs/api/call/callJourney";
import API from "../../libs/api";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/ModalLogin"; // Importing the BasicModal component

const Home = () => {
  const [allJourney, setAllJourney] = React.useState<IJourney[] | []>([]);
  const [isLogin, setIsLogin] = React.useState(!!localStorage.getItem("token"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [authLogin, setAuthLogin] = React.useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const _hostUrl = "http://localhost:3001/uploads/";

  const getJourney = async () => {
    try {
      const res = await getAllJourney();
      setAllJourney(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await API.post("/login", authLogin);
      console.log("login :", res);
      handleClose();
      setIsLogin(true);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney();
  }, []);

  return (
    <Box display={"flex"} height={"100vh"}>
      <Box flex={1}>
        {isLogin ? (
          <Box
            height={"85px"}
            width={"100%"}
            sx={{
              backgroundColor: "#F1F1F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "50px",
            }}
          >
            <Box>
              <img src="src/assets/icon.png" alt="" />
            </Box>

            <Avatar
              onClick={handleClick}
              src="src/assets/Alive.jpg"
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/bookmark")}>
                Bookmark
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLogin(false);
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
              <MenuItem onClick={() => navigate("/")}>
                My Journey
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                p: 7,
              }}
            >
              <Box>
                <img src="src/assets/icon.png" style={{ objectFit: "cover" }} />
              </Box>
              <Box>
                <Button onClick={handleOpen}>Login</Button>
                {/* BasicModal component with necessary props */}
                <BasicModal
                  open={open}
                  handleClose={handleClose}
                  handleChange={handleChange}
                  handleLogin={handleLogin}
                  authLogin={authLogin}
                />
                <Button>Register</Button>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                width: "100%",
                p: 7,
                top: "30%",
                transform: "translateY(-50%)",
              }}
            >
              {!isLogin ? (
                <Box>
                  <Typography variant="h2" color={"white"}>You Must Be Login</Typography>
                </Box>
              ) :(
              <Box>
                <Typography variant="h2" color={"white"}>
                  The Journey you ever dreamed of.
                </Typography>
                <Typography variant="h6" color={"white"}>
                  We made a tool so you can easily keep & share your travel
                  memories. But there is a lot more
                </Typography>
              </Box>

              )}
              
            </Box>
            <Box width={"100%"}>
              <img
                src="src/assets/Alive.jpg"
                style={{ width: "100%", height: "510px", objectFit: "cover" }}
              />
            </Box>
          </>
        )}

        {isLogin && (
          <>
            <Box sx={{ my: 5, ml: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Journey
              </Typography>
            </Box>

            <Box display="flex" sx={{ px: 7 }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                sx={{ borderRight: "none" }}
                size="small"
              />
              <Button variant="contained">Search</Button>
            </Box>

            <Box sx={{ display: "flex", m: 5, flexWrap: "wrap" }}>
              <Box gap={1} flexWrap={"wrap"} display={"flex"}>
                {allJourney?.map((journey) => (
                  <Card key={journey.id} sx={{ maxWidth: 290 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={_hostUrl + journey.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {journey.nama}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {journey.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
