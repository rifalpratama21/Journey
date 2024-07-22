import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../libs/api";
import { IJourney } from "../../types/app";
import { getAllJourney } from "../../libs/api/call/callJourney";

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const _hostUrl = "http://localhost:3000"
  // const [journeyById, setJourneyById] = useState<any>([]);
  const [allJourney, setAllJourney] = React.useState<IJourney[] | []>([]);
  const _hostUrl = "http://localhost:3001/uploads/";

  const getJourneyByuserId = async () => {
    const res = await API.get("/journey", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
  };

  const getJourney = async () => {
    try {
      const res = await getAllJourney();
      setAllJourney(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourneyByuserId();
    getJourney();

    if (localStorage.getItem("token")) {
    }
  });
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <Box display={"flex"} height={"100vh"}>
      <Box flex={1}>
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
            <img src="src/assets/icon.png" alt=""/>
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
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/bookmark")}>Bookmark</MenuItem>
            <MenuItem onClick={() => navigate("/login")}>Logout</MenuItem>
            <MenuItem onClick={() => navigate("/")}>
              My Journey
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{pl:6,pt:2}}>
          <Typography variant="h4">Profile</Typography>
        </Box>
        <Box
          width={"100%"}
          height={"300px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        //   bgcolor={"red"}
        >
          <Box sx={{ flex: "column" }}>
            <Box
            //   bgcolor={"yellow"}
              sx={{ textAlign: "center", justifyContent: "center", }}
            >
              <img
                src="src/assets/Alive.jpg"
                style={{ borderRadius: "50%", width: "200px", height: "200px" }}
              />
              <Box sx={{ flex: "column",mt:1, textAlign: "center" }}>
                <Typography variant="h5">Rifal Pratama</Typography>
                <Typography variant="h5">rifalpratama21@gmail.com</Typography>
              </Box>
            </Box>
          </Box>
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
      </Box>
    </Box>
  );
};
