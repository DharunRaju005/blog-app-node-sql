# CMS

A blogging platform created as part of a DBMS coursework. The platform allows users to create, edit, delete, and comment on posts. Users can also roll back to previous versions of their posts and follow other writers.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Tech Stack

- **Frontend:** React
- **Backend:** Express, Node.js
- **Database:** SQL
- **Authentication:** JWT

## Features

- Add, edit, delete posts
- Comment on posts
- Roll back to previous versions of posts
- Follow other writers
- JWT-based authentication ensuring users can only modify their own posts

## Installation

To get the project up and running, follow these steps:

1. Clone the repository:

    ```sh
    git clone [https://github.com/DharunRaju005/blog-app-node-sql.git]
    
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the database:

    - Create a SQL database and configure the connection in the project.

4. Start the development server:

    ```sh
    npm start
    ```

## Usage

To start using the CMS platform, follow these steps:

1. Register for an account or log in if you already have one.
2. Create a new post by clicking on the "New Post" button.
3. Edit or delete your posts using the options available on each post.
4. Comment on posts by other users.
5. Follow other writers to stay updated on their latest posts.
6. Use the rollback feature to revert to previous versions of your posts.

## Contributing

We welcome contributions from the community. To contribute, follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a new Pull Request
