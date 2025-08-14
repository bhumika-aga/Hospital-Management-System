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
  const handleSendEmail = () => {
    const subject = 'HealthSync Support Request';
    const body = 'Hello HealthSync Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you for your help!\n\nBest regards';
    const mailtoUrl = `mailto:support@healthsync.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleCallNow = () => {
    window.open('tel:+15551234567', '_self');
  };

  const handleViewDocs = () => {
    // Create a new window/tab with the README content
    const readmeUrl = 'https://raw.githubusercontent.com/bhumika-aga/hospital-management-system/main/README.md';
    
    // Fetch the README content and display it
    fetch(readmeUrl)
      .then(response => response.text())
      .then(content => {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>HealthSync Documentation</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                        line-height: 1.6;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        color: #333;
                    }
                    pre {
                        background-color: #f6f8fa;
                        border-radius: 6px;
                        padding: 16px;
                        overflow-x: auto;
                        border: 1px solid #e1e4e8;
                    }
                    code {
                        background-color: #f6f8fa;
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        color: #24292e;
                        border-bottom: 1px solid #eaecef;
                        padding-bottom: 10px;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 20px 0;
                    }
                    th, td {
                        border: 1px solid #dfe2e5;
                        padding: 8px 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f6f8fa;
                        font-weight: 600;
                    }
                    .highlight {
                        background-color: #fff3cd;
                        padding: 10px;
                        border-left: 4px solid #ffc107;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="highlight">
                    <strong>📚 HealthSync Documentation</strong><br>
                    This is the official documentation for the HealthSync Hospital Management System.
                </div>
                <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </body>
            </html>
          `);
          newWindow.document.close();
        }
      })
      .catch(error => {
        console.error('Error fetching documentation:', error);
        // Fallback: open a simple documentation page
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>HealthSync Documentation</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; color: #0070F3; margin-bottom: 30px; }
                    .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🏥 HealthSync - Hospital Management System</h1>
                    <p>Comprehensive Healthcare Management Solution</p>
                </div>
                
                <div class="section">
                    <h2>🚀 Quick Start</h2>
                    <p>Welcome to HealthSync! This system provides comprehensive hospital management capabilities including:</p>
                    <ul>
                        <li>Patient Registration & Management</li>
                        <li>Treatment Package Selection</li>
                        <li>Specialist Assignment</li>
                        <li>Insurance Claims Processing</li>
                        <li>Treatment Plan Generation</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>🔐 Authentication</h2>
                    <p>Use these demo credentials to access the system:</p>
                    <ul>
                        <li><strong>Username:</strong> admin, user, doctor, or patient</li>
                        <li><strong>No password required</strong> for demo access</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>📋 Features</h2>
                    <ul>
                        <li><strong>Dashboard:</strong> Overview of system statistics and quick actions</li>
                        <li><strong>Treatment Packages:</strong> Browse and select medical packages</li>
                        <li><strong>Specialists:</strong> View available medical specialists</li>
                        <li><strong>Treatments:</strong> Manage treatment plans and timelines</li>
                        <li><strong>Claims:</strong> Process insurance claims efficiently</li>
                        <li><strong>Profile:</strong> Manage your account information</li>
                        <li><strong>Settings:</strong> Customize application preferences</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>🛠️ Tech Stack</h2>
                    <p><strong>Frontend:</strong> React 19.1.1, TypeScript, Material-UI</p>
                    <p><strong>Backend:</strong> Spring Boot 3.1.5, Java 17, H2 Database</p>
                    <p><strong>Deployment:</strong> Render.com</p>
                </div>

                <div class="section">
                    <h2>📞 Support</h2>
                    <p><strong>Email:</strong> bhumika.aga@gmail.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>GitHub:</strong> https://github.com/bhumika-aga/hospital-management-system</p>
                </div>
            </body>
            </html>
          `);
          newWindow.document.close();
        }
      });
  };

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
                secondary="support@healthsync.com"
              />
              <Button 
                variant="outlined" 
                size="small"
                onClick={handleSendEmail}
              >
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
              <Button 
                variant="outlined" 
                size="small"
                onClick={handleCallNow}
              >
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
              <Button 
                variant="outlined" 
                size="small"
                onClick={handleViewDocs}
              >
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
