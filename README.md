# DevSpace

DevSpace is a social platform demo made with Express, Typescript, React, Redux, MaterialUI and Node. You can check it out at www.devspace.micosita.es, and there is an api spec at www.api.devspace.micosita/docs

### Disclaimer
This app was made over the course of a week and a half of work. It is by no means production ready, and many things need to be changed for it to be scalable to a sizable userbase. It is fun toy to play with, or to implement new features.

## Features

- User authentication
- Create, read, update, and delete posts
- User search
- Follow other users
- Notifications
- Private or public profiles
- Responsive design
- Liking and commenting posts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm
- docker

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/your_username_/devspace.git
   ``` 
2. Set the docker-compose.yml to match your environment, pay special attention at the secrets, and routes set in the environment variables.

3. Run the docker stack
    ```sh
    docker compose up -d
    ```    
We are done!

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### TODO:

- [ ] Implement image uploads (using multer and multipart forms)
- [ ] Real time chat feature (using websockets)
- [ ] Implement a proper paging middleware in the backend for typeORM
- [ ] Refreshing the page causes requests to be sent without JWT

## License

Distributed under the MIT License. See `LICENSE` for more information.

