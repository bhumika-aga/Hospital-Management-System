import { Book, Email, ExpandMore, Phone } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Help: React.FC = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #000000 0%, #2196F3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Help & Support
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Get assistance with HealthSync
        </Typography>
        <Divider />
      </Box>

      {/* FAQ */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I create a treatment plan?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To create a treatment plan, navigate to the Treatments page and
              click "New Treatment". Fill in the patient details, select a
              treatment package, and set the commencement date.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>How do I initiate an insurance claim?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Go to the Claims page and click "New Claim". Enter the patient
              name, treatment cost, and select the appropriate insurance
              provider from the dropdown list.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>What are the different specialist types?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We have Junior and Senior specialists. Package 1 treatments are
              assigned to Junior specialists, while Package 2 treatments are
              assigned to Senior specialists.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Support */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Contact Support
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary="Email Support"
                secondary="support@HealthSync.com"
              />
              <Button variant="outlined" size="small">
                Send Email
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary="Phone Support"
                secondary="+1 (555) 123-4567"
              />
              <Button variant="outlined" size="small">
                Call Now
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText
                primary="Documentation"
                secondary="Access detailed documentation and user guides"
              />
              <Button variant="outlined" size="small">
                View Docs
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Help;
