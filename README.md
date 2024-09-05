You are tasked with designing and implementing a microservices-based system for a hypothetical e-commerce platform. The system should be able to handle various functionalities such as user management, product catalog, and order processing. The system's architecture should be based on NestJS microservices, using Docker Compose to manage the services, Postgres as the main database, and Kafka for asynchronous communication.
--------------------------------------------------------------------------
Created 3 Microservices
user-ms
product-service
order-service
Docker Compose File
docker-compose.yml (for running appliaction on docker)
--------------------------------------------------------------------------
Steps to run this program.
1) First of all download the complete zip/repo
2) if its zip upzip the file, and put in a folder.
3) open a ternimal and go to the folder in which you download the repo.
4) run the commnad 'docker compose up --build'
5) which will build the services and deploy on docker.
6) Import the postman collection and you can perfrom crud operations on User,Order and Product Micro service.

Note: SomeTimes kafka services is not started, you just need to restart product service so that kafka serive started succesfully
--------------------------------------------------------------------------
Now 6 services will deploy
1) User-MS  (http://localhost:3000/users) --> running on this URL
2) Order-Ms (http://localhost:3001/orders) --> running on this URL
3) Product-MS (http://localhost:3002/products) --> running on this URL
4) Postgres (http://localhost:5433/) --> running on this port
5) Kafka  (http://localhost:9092/) --> running on this port
6) Zookeeper (Kafka need this images for message processing) (http://localhost:2181/) --> running on this port
--------------------------------------------------------------------------
All 3 Services have DockerFile which use for docker image
I have added Postman Collection(AVA-FIVE.postman_collection.json) for the CRUD operations for all three services





OWNER--> Muhammad Bilal