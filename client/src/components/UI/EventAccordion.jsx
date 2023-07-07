import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "../../assets/user.svg" 
import Box from '@mui/material/Box';

export default function EventAccordion(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={styles.cardItem}>
            {props.data.map((item, index) => (
                <Accordion key={index} disableGutters expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}
                sx={{
                    backgroundColor: "var(--primary-color)", 
                    color: "var(--text-light)",
                    border: "none",
                    boxShadow: "none",
                }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color: "var(--text-light)"}} />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{
                            border: "none",
                            padding: "0",
                            margin: "0",
                            pl:"2rem",
                            pr:"1rem",
                            pt:"1rem"
                        }}
                    >
                        <img src={logo} alt="pic" width={50} />
                        <Box sx={{display:"flex",flexDirection:"column",pl:"1rem"}}>
                            <Typography sx={{ 
                                flexShrink: 0,
                                fontWeight: "bold",
                                fontSize: "1.3rem",
                                }}>
                                {item.name}, {item.date}
                            </Typography>
                            <Typography sx={{
                                color: "var(--text-light)",
                                fontSize: "1rem",
                                opacity: 0.7
                                }}>
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
                                pl:"1.5rem"
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