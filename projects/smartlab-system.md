---
title: "SmartLab System"
link: ""
description: "System build for measuring and monitoring temperature, light sound and other environmental factors in a lab, using Raspberry Pi Pico Ws."
techStack:
  [
    "C",
    "C++",
    "Kotlin",
    "React",
    "Typescript",
    "PlatfromIO",
    "Raspberry Pi",
    "PostgreSQL",
  ]
---

No link to this repository is provided as it is a private repository.

## Description

This project was completed with a team of 5 developers, including myself. The project was completed in 3 months and was a part of a university course. The project was a system build for measuring and monitoring temperature, light sound and other environmental factors in a lab, using Raspberry Pi Pico Ws.

The system was built using a Raspberry Pi as a communicator between the sensors and the backend, and the Raspberry Pi Pico Ws as the sensors. The system was built using C, C++, Kotlin, Docker, React, and Typescript. The system was built using PlatformIO, and the data was stored in a PostgreSQL database.

The system was built to be able to monitor the environmental factors in a lab, and to be able to alert the user if any of the factors were outside of the normal range. The system was built to be able to monitor the environmental factors in real-time, and to be able to store the data for later analysis.

## Features

### Frontend

I personally took the role of FrontEnd Developer Lead in the team, mentoring two developers by defining tasks and reviewing their code.

In this section, I prioritised developing a scalable architecture with a focus on reusability and accessibility. I designed components in Figma, and implemented them using React and Typescript, ensuring an intuitive user experience.

I also made the app compatible with mobile devices. I did this by using Capacitor, which allowed me to build a native app using our already existing web app.

To ensure quality of the frontend, i followed best practices by implementing Gestalt principles. Also, we developed questionnaires to gather feedback from users, which we used to improve the user experience.

Moreover, we added unit tests to ensure the quality of the codebase using Vitest.

Finally, I implemented a CI/CD pipeline using GitHub Actions, which allowed us to automate the deployment process.

Here are some images of the frontend:

Zone detector throught network strength:
![Bubbles that show who is in each zone](https://i.imgur.com/yRWjq1J.jpeg)
Video:
[![](Video of zones)](https://i.imgur.com/6hgcvcO.mp4)

Graphs that show the temperature, light and sound in the lab for the last 24 hours:
![Graphs that show the temperature, light and sound in the lab for the last 24 hours](https://i.imgur.com/uiKPZqd.jpeg)

### Backend

We built a robust backend with Kotlin to handle API requests from the frontend. We used Docker to containerize the backend, which allowed us to easily deploy it to the cloud.

I worked closely with the backend team to design and integrate scalable and secure APIs.

### Machine Learning

We developed and trained a machine learning model with Edge Impulse to detect certain sounds to trigger different actions in the system. For example, if the system detected the word "Christmas", it would turn on the Christmas lights in the lab and would alert the frontend to start playing Christmas music. Another example, if the system detected "SOS", it would start flashing the ligts and using the buzzer to alert the user.

### Database

I developed the database schema and implemented it using PostgreSQL. I ensured that the database was scalable and secure, and that it could handle large amounts of data.

I adhered to best practices by implementing indexes and foreign keys to ensure data integrity and performance. I aslo normalised the database to BCNF level, to reduce redundancy and improve data consistency.

Here is the database schema:
![Database schema](https://i.imgur.com/uiKPZqd.jpeg)

### Testing

We focused on unit, integration, and automated testing frameworks for both backend and frontend to ensure system robustness.

### DevOps & CI/CD

We used Github Actions to automate the deployment process, which allowed us to deploy the system quickly and efficiently. Also, we used pull requests and pull reviews to ensure the quality of the codebase. We also created tickets for issues, which allowed us to track the progress of the project.

Incorporated agile methodologies with a strong emphasis on continuous delivery (CD) and continuous integration (CI) to streamline development and deployment processes.

We also used Docker to containerize the backend, which allowed us to easily deploy it to the cloud.
