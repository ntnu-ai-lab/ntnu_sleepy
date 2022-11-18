# ntnu_sleepy

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## This Project
This project was developed by students at NTNU in TDT4290 Customer Driven Project for the Musculoskeletal Research Group at the Department of Public Health and Nursing at NTNU.

It consists of a prototype of an app for evidence-based self-treatment of sleep problems. The course consists of one or more theory modules defined in an admin panel, a sleep diary used for self evaluation and calibration, and a sleep restriction module where the user is given a strict bedtime and wake time every day to acclimmatise their bodies to a more desireably circadian rhythm.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With
[![React][React Native]][React-url]
[![Django][Django]][Django-url]
[![NodeJS][NodeJS]][NodeJS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
All prerequisites are provided in the README of the subfolders within the repo.

The following is needed to run the app locally:
* Node.js
* Docker
* Python




<!-- LICENSE -->
## License

Distributed under the GPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/ntnu-ai-lab/ntnu_sleepy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/ntnu-ai-lab/ntnu_sleepy/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/ntnu-ai-lab/ntnu_sleepy/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/ntnu-ai-lab/ntnu_sleepy/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/ntnu-ai-lab/ntnu_sleepy/blob/master/LICENSE.txt
[React Native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactnative.dev
[Django]: https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://www.djangoproject.com
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
## Development
The three folders contain the configuration and instructions for running each part locally for development.

Before starting you will need Docker, Docker Compose, NodeJS, and Python, all in recent versions.

### `kratos/`
Kratos essentially just needs to be running on the host machine, but we don't really touch it. So `kratos/` contains a config suitable for running a local instance in development mode.

It runs in Docker, using Docker Compose.

### `somnus/`

This contains the API, written in Django. There are detailed instructiuons inside for running the development server locally, including starting the databases needed as Docker containers.

### `sleepynativeapp/`

This contains the native mobile app, written in React Native and using Expo. Running the app can be done either on your device using Expo Go or in an emulator running on your machine.

## Deployment

### Kratos
Kratos needs a somwehat different config in production mode than in development mode. The config contained in `kratos/config` may serve as a useful starting point, with some key differences:

```yaml
log:
  level: error leak_sensitive_values: false
```

`leak_sensitive_values` should obvisously never be set to true in a production environment.

### Django

Django builds to a Docker container in CI, which is pushed to Docker Hub as karlinator/somnus (for ease of the initial setup, otherwise it would have pushed to a group namespace).

To deploy it, use a `docker-compose.yml` akin to this:

```yaml
version: "3.9"

services:
  db:
    image: postgres:14-alpine
    restart: always
    networks:
      - django
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: django
      POSTGRES_USER: django
      POSTGRES_DB: django

  profile_db:
    image: postgres:14-alpine
    restart: always
    networks:
      - django
    volumes:
      - ./user-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: django
      POSTGRES_USER: django
      POSTGRES_DB: django

  django:
    depends_on: 
      - django_migrate
    image: karlinator/somnus:latest
    restart: always
    networks:
      - django
    ports:
      - "8000:8000"
    volumes:
      - /lhome/www/static/api:/var/www/static
    environment:
      - DATABASE_URL
      - PROFILE_DATABASE_URL
      - HOST
      - SECRET
      - DEBUG
      - ORY_SDK_URL
    labels:
      com.centurylinklabs.watchtower.enable: 'true'
    command: sh -c "./manage.py collectstatic --no-input && gunicorn --bind :8000 somnus.wsgi"

networks:
  django:
```

Obviously change secrets and the like.

The environment variables referenced can be provided in a `.env` file akin to `.env.example`.

This config will collect all static files and dump them in a folder which is mounted from the host machine, from where they can be served with e.g. `nginx`. For a more robust system, `./manage.py collectstatic could be run in CI, and the files uploaded to AWS S3 or any other static file host.

Note that this config will not pull changes automatically or apply migrations. We can suggest `Watchtower` as a pull-based container updater, but we have no ready-made solution for automating migrations.

### Native app

Currently, the CI pipeline publishes the app to a release channel on Expo, the link to which can be found in the logs for that CI job. You can run it against the production service using the Expo Go app, though for iOS devices the user must register an account and be invited to the team for reasons of Apple.

We cannot provide documentation on Firebase App Distribution, TestFlight, the Play Store or the App Store.

