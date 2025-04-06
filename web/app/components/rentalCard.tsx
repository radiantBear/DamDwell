import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function RentalCard({
  image,
  rent,
  address,
  availableDate,
}: {
  image: string | null;
  rent: number;
  address: string;
  availableDate: string;
}) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image ?? ""}
        alt="Rental property"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Tooltip title="Monthly Rent" arrow className="w-fit">
            <Box display="flex" alignItems="center" mb={1}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">{rent ?? "--"}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Earliest Start Date" arrow className="w-fit">
            <Box display="flex" alignItems="center">
              <CalendarTodayIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body2">{availableDate ?? "--"}</Typography>
            </Box>
          </Tooltip>
        </Box>

        <Tooltip title="Address" arrow className="w-fit">
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOnIcon color="action" sx={{ mr: 1 }} />
            <Typography variant="body2">{address ?? "--"}</Typography>
          </Box>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
