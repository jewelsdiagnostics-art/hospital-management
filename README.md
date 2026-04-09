# Hospital Management System

A comprehensive frontdesk interface for hospital and pharmacy management software built with HTML, CSS, and JavaScript.

## Features

### Core Modules
- **Dashboard**: Real-time statistics and activity monitoring
- **Patient Management**: Registration, search, and patient records
- **Appointment Scheduling**: Book and manage patient appointments
- **Pharmacy Management**: Prescription processing and medicine inventory
- **Billing System**: Generate and manage patient bills
- **Inventory Management**: Track medical supplies and medicines
- **Reports & Analytics**: Financial and patient statistics

### Key Features
- Responsive design that works on desktop and mobile
- Real-time data updates
- Search and filter functionality
- Modal-based forms for data entry
- Status tracking for all processes
- Keyboard shortcuts for quick navigation

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Clone or download the project files
2. Open the `index.html` file in your web browser
3. The application will load with sample data

### File Structure
```
hospital-management/
|-- index.html          # Main application file
|-- styles.css          # Custom styles and responsive design
|-- script.js           # Application logic and functionality
|-- README.md           # This documentation
```

## Usage Guide

### Navigation
- Use the sidebar menu to navigate between different modules
- Click on module names to switch between sections
- Use keyboard shortcuts:
  - `Ctrl + D`: Dashboard
  - `Ctrl + P`: Patients
  - `Ctrl + A`: Appointments
  - `Escape`: Close modals

### Patient Management
1. Click "Add New Patient" to register a new patient
2. Use the search bar to find existing patients
3. View, edit, or delete patient records using action buttons

### Appointment Scheduling
1. Click "Schedule Appointment" to book new appointments
2. View today's schedule and upcoming appointments
3. Filter appointments by date

### Pharmacy Management
1. View pending prescriptions in the queue
2. Fill prescriptions when ready
3. Search medicines in real-time
4. Track medicine inventory levels

### Billing System
1. Generate new bills for patients
2. Track payment status
3. View bill details and process payments

### Inventory Management
1. Monitor stock levels for all medicines
2. Receive alerts for low stock items
3. Edit inventory details
4. Place reorder requests

## Sample Data

The application comes pre-loaded with sample data including:
- 5 sample patients
- 4 sample appointments
- 3 sample prescriptions
- 3 sample bills
- 5 sample inventory items

This allows you to immediately explore all features without manual data entry.

## Browser Compatibility

This application is compatible with all modern web browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Modules
1. Create a new section in `index.html`
2. Add corresponding navigation link in the sidebar
3. Implement functionality in `script.js`
4. Add styles in `styles.css`

### Styling
The application uses Tailwind CSS for base styling and custom CSS for specific features. You can:
- Modify colors in the CSS variables
- Adjust responsive breakpoints
- Add new animations and transitions

### Data Storage
Currently, the application uses in-memory data storage. For production use:
- Implement localStorage for client-side persistence
- Connect to a backend API for server-side data management
- Add database integration for enterprise deployment

## Security Considerations
- Input validation for all forms
- XSS protection through proper data sanitization
- HTTPS recommended for production deployment
- User authentication system should be implemented for production

## Performance
- Optimized for fast loading
- Minimal external dependencies
- Efficient DOM manipulation
- Responsive design prevents horizontal scrolling

## Support

For issues, questions, or feature requests, please refer to the application documentation or contact the development team.

## License

This project is provided as-is for educational and demonstration purposes.
