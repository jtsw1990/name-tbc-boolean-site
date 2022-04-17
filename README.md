# unpoliticly.com
A fun idea for a website that people can go to and vote on controversial topics

# Features
 - Randomly generated set of binary questions
 - Once user chooses reply, analytics dashboard
    - Score by country
    - Porportion by country

# TBD
- Model for scoring, current model may become long
- Feasibility of geographical heat map and alternatives



# How to run
- ` git clone` repository
- Ensure that you have the appropriate `.env` file. Contact owner for more details
- run `npm install` to get all dependencies
- Optionally, run `npm install --save-dev nodemon` for live development
- run `npm run devStart`



# Stack & Dependencies
Tool/Library | Description  | Version 
------------ | ------------ | ------------
[NodeJS](https://nodejs.org/en/) | JS runtime on v8 | v14.16.1
[bootstrap.js CDN](https://getbootstrap.com/) | CSS framework | 4.5.2
[JQuery CDN](https://jquery.com/) | Mainly for CSS elements | 3.3.1
[nodemon](https://www.npmjs.com/package/nodemon) | Development tool for realtime updates | ^2.0.7
[ejs](https://ejs.co/) | Main templating engine used | ^3.1.6
[express](https://expressjs.com/) | Backend web framework used | ^4.17.1
[MongoDB (mongoose)](https://mongoosejs.com/) | Atlas for main cloud DW | ^5.12.4 
[connect-mongo](https://www.npmjs.com/package/connect-mongo) | Session store with Mongo | 4.4.1 |
[dotenv](https://www.npmjs.com/package/dotenv) | Environment manager for secrets | ^8.2.0
[serve-favicon](https://www.npmjs.com/package/serve-favicon) | Websie favicon library | ^2.5.0
