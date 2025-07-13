# Simple Server

A Node.js Express application that provides a REST API for managing contacts and groups. This project serves as a simple example of a contact management system with JSON file-based storage.

## Features

- **Contact Management**: Create, read, update, and delete contacts
- **Group Management**: Organize contacts into groups (Dev, Design, Marketing, Family)
- **REST API**: JSON-based API endpoints for all operations
- **Web Interface**: Simple HTML interface showing available endpoints
- **JSON Storage**: File-based storage using JSON files for persistence
- **Modern JavaScript**: Built with ES modules and modern Node.js features

## Project Structure

```
simple-server/
├── app.js                 # Main Express application
├── bin/www               # Server startup script
├── package.json          # Dependencies and scripts
├── data/                 # JSON data files
│   ├── contacts.json     # Contact data storage
│   └── groups.json       # Group data storage
├── models/               # Data models
│   ├── contact.js        # Contact model
│   └── group.js          # Group model
├── routes/               # API route handlers
│   ├── index.js          # Home page route
│   ├── contacts.js       # Contact API routes
│   ├── groups.js         # Group API routes
│   └── users.js          # User routes
├── services/             # Business logic layer
│   ├── contacts-db.js    # Contact database service
│   ├── groups-db.js      # Group database service
│   ├── database.service.js
│   └── class.mock.database.service.js
├── views/                # Handlebars templates
│   ├── layout.hbs        # Main layout template
│   ├── index.hbs         # Home page template
│   └── error.hbs         # Error page template
└── public/               # Static assets
    └── stylesheets/      # CSS files
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on port 3000 by default. You can specify a different port using the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## API Endpoints

### Contacts

- `GET /contacts` - Get all contacts
- `GET /contacts?firstName=John` - Get contacts filtered by any property
- `POST /contacts` - Create a new contact
- `PUT /contacts/:id` - Update an existing contact
- `DELETE /contacts/:id` - Delete a contact

### Groups

- `GET /groups` - Get all groups
- `GET /groups/used` - Get groups that have contacts assigned
- `GET /groups/group/:groupName` - Get all contacts in a specific group
- `POST /groups` - Create a new group
- `PUT /groups/:id` - Update an existing group
- `DELETE /groups/:id` - Delete a group

### Web Interface

- `GET /` - Home page with API documentation

## Contact Data Structure

Each contact contains the following fields:

```json
{
  "id": 1,
  "firstName": "Alice",
  "lastName": "Wong",
  "title": "Ms.",
  "company": "Acme Inc",
  "jobTitle": "Frontend Developer",
  "employeeNumber": "ACM001",
  "primaryContactNumber": "+1-555-101-1001",
  "otherContactNumbers": [],
  "primaryEmailAddress": "alice.wong@acme.com",
  "emailAddresses": ["alice.wong@acme.com"],
  "groups": ["Dev"]
}
```

## Group Data Structure

Each group contains the following fields:

```json
{
  "id": 1,
  "name": "Dev",
  "slug": "dev"
}
```

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Handlebars** - Templating engine for views
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie parsing middleware
- **HTTP Errors** - Create HTTP error objects
- **Debug** - Debug logging utility

## Development

The project uses ES modules (`"type": "module"` in package.json) and modern JavaScript features. The data is stored in JSON files in the `data/` directory, making it easy to inspect and modify the data during development.

### Available Groups

The system comes with predefined groups:
- **Dev** - Development team members
- **Design** - Design team members  
- **Marketing** - Marketing team members
- **Family** - Family contacts

### Sample Data

The project includes sample data with 15 contacts across various companies and roles, demonstrating the relationship between contacts and groups.

## Configuration

The server can be configured through environment variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Error Handling

The application includes comprehensive error handling:
- 404 errors for undefined routes
- Development vs. production error pages
- Graceful error responses for API endpoints

## Future Enhancements

This simple server is designed to be extensible. Potential improvements include:

- Database integration (MongoDB, PostgreSQL, etc.)
- Authentication and authorization
- Data validation and sanitization
- Pagination for large datasets
- Search functionality
- File upload support
- Email integration
- API versioning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is intended for educational and demonstration purposes.