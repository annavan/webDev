# Change Log
Changes throughout the process of creating ecah feature will be documented here

## [0.2.0] - 2025-03-07
This is out submission for Feature 4 which 

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