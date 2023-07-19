import * as React from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../assets/user.svg";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";

export default function EventAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <div>
      {props.data.map((item, index) => (
        <Accordion
          key={index}
          disableGutters
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            backgroundColor: "var(--primary-color)",
            color: "var(--text-light)",
            border: "none",
            boxShadow: "none",
            marginBottom: "1rem",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "var(--text-light)" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              border: "none",
              padding: "0",
              margin: "0",
              pl: "2rem",
              pr: "1rem",
              pt: "1rem",
            }}
          >
            {/* <img src={logo} alt="pic" width={isMobile ? 75 : 100} height={isMobile ? 75 : 100} /> */}
            <Avatar
              src={logo}
              sx={{
                width: isMobile ? "3rem" : "5rem",
                height: isMobile ? "3rem" : "5rem",
                marginRight: "1rem",
                alignSelf: "center",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", marginRight: "1rem"}}>
              <Typography
                sx={{
                  flexShrink: 0,
                  fontWeight: "bold",
                  fontSize: isMobile ? "1rem" : "1.5rem",
                  color: "var(--text-light)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.name}
                <span className="text-lg font-normal opacity-75">
                  {dayjs(item.startDate).format("DD/MM/YYYY")}
                </span>              
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-light)",
                  fontSize: "1rem",
                  opacity: 0.7,
                }}
              >
                {item.organizedBy}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                color: "var(--text-light)",
                fontSize: "1rem",
                opacity: 0.75,
                pl: "1.5rem",
              }}
            >
              {item.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}