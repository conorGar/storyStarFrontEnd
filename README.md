This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Story Star

![](storyStarGif.gif)
- A story-sharing web app with full CRUD functionality. Users can post their own stories and chapters for the world to see. They can also review the chapters of other user's stories. The idea of the app is to support collaboration and constructive criticism between different users. You can post reviews on other user's pages, and how many 'stars'(likes) your reviews get determines how likely it is that YOUR stories get featured.

**domain**: - https://naughty-dijkstra-919f5c.netlify.com/

NOTE: This is only the repo for the front end of this app. The back end repo can be found here: https://github.com/conorGar/StoryStar

## description
- I found that there weren't many places online where you can easily post your work with the intention of getting helpful critique back. The intention here was to allow users to just 'set it and forget it' (post their stories and not bother with the community) if they wanted to, but it HELPED if they participated in community discussions.

## technologies & packages
- React
- CSS
- AWS s3(for image/chapter uploading)
- Express
- PSQL
- auth


## launch/build 
- if you clone this repo, you can run the front end with npm start in you CLI

## major problems & solutions
- Uploading multiple chapter pages at once to AWS took a while to get working, finally got it by uploading them after the user clicks the image upload section, instead of when they upload the entire chapter.

## MVP
- Create, Edit, and Delete your own stories
- Working authentification for user login/signup


## FUTURE -> databases and relations; APIs; component library
This is very much a WIP, I am adding and fixing things nearly everyday in hopes of one day making it actually useful. The current list of future improvements is as follows:

- protected routes: right now other users can upload chapters on other people's stories. 
- aws s3 upload with deployed version: currently aws upload only works locally due to a bug
- loading icons while chapters/images are being uploaded to AWS
- Better Review post display/templates to help users give better reviews.
