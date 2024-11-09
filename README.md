# OpenStreetMap Sample Project

This project is a simple mapping application built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), utilizing the OpenStreetMap API and the [React Leaflet](https://react-leaflet.js.org/) library for map rendering. The app demonstrates basic map functionality, including displaying a map, adding markers, and tracing routes based on location data.

![Demo](https://raw.githubusercontent.com/mahdi1696/map/refs/heads/main/sampleGif/mapg.gif)

## Features

- **Map Display**: Renders a dynamic map centered on user-defined or default coordinates.
- **Marker & Car Icon**: A custom marker icon representing a "car" is used to display location points on the map.
- **Route Visualization**: Visualizes a path with markers and lines for a selected user and date.
- **Date Selection**: Allows date and time selection for querying specific location data.
- **Animated Navigation**: Supports animating through a list of locations.
- **Responsive Design**: Designed to adapt to various screen sizes.

## Project Structure

- **Map**: Manages map display, custom markers, and route paths.
- **LocationForm**: A user interface to select users and dates, and trigger data fetching.
- **LocationList**: Displays a scrollable list of locations for the selected criteria, with the ability to animate or manually select points.
- **MapProvider**: Provides global map states, including car position and rotation, for sharing data across components.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

Clone the repository and install dependencies:

```bash
npm install
npm dev
```
