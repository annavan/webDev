# Change Log
Changes throughout the process of creating each feature will be documented here

## [0.3.0] - 2025-04-02
This is our submission for Feature 5 which focused on bringing in authentication methods and establishing protected routes

### Added
- Protected routes to prevent unauthenticated users from accessing the home and settings page
- Redirect logged in users away from the login and register pages
- Proper login and register functionality
- Logout functionality 

### Changed
- Modified our login to be a true login, meaning users only have to provide less information (just username and password)
- Changed our old login format to be our register format
- Converted our Login component to be a larger Auth component with child components for login and register

### Fixed
- Made sure the footer and navbar show up on the home page

## [0.2.0] - 2025-03-07
This is our submission for Feature 4 which we:

### Added
- Routing capabilities for our navigation bar using react-router-dom
- Connected to a database where we can store and retrieve data from
- Created several more component branches including Home 
    - Added several child components to the Home module in order to pull posts and comments from our database
- Added two classes, Post and Comment, within our Home component which retrieve posts and comments from our database

### Changed
- Changed over from using Preact to React 
    - Instead of using axios for http requests for user data, we store in a database

### Fixed
- Storing user data within our database 

## [0.1.0] - 2025-02-20
This was our submission for Feature 3 which created the foundation for our login framework

### Added
- Created a Main component with MainList child which handled account creation and passed an event prop back up to Main
- Used axios in a user service to create new user profiles

### Changed

### Fixed