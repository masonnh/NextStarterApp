# NextJS Starter App
A starter app in NextJS.

## Functionality
Supports creating a user profile with Google OAuth and saving it to Supabase.

## Setup
### 1. Environment Variables
You will need a .env.local file located in the root of your project directory.
Copy ```.env.example``` to a new file called ```.env.local``` and fill out the environment variables inside.

```cp .env.example .env.local```

### 2. External Technology
You will need to connect 2 technologies before this will work:
- Supabase
- Google OAuth (from the Google Cloud Console)

Tutorials on how to do this are beyond the scope of this repository. If you go through and ensure that you have legitimate values for each of the environmental variables, you will be well on your way.

### 3. Database Schema
This app is extremely simple. Supabase automatically creates an Auth table for you. This is all you need for the app to work.

## Tech Stack
- NextJS
- Typescript
- Supabase
- Google OAuth

## Pages
### General
- Home/Landing Page
- Login
- Profile (must be logged in)
- Coming Soon

### Legal
- Privacy Policy
- Terms and Conditions

### Product
- Version