# unpoliticly.com

Drunk programming 02/04/2022
A fun idea for a website that people can go to and vote on controversial topics


Webhosting nameservers:
- ns1.digitalocean.com
- ns2.digitalocean.com
- ns3.digitalocean.com


# Features
 - Randomly generated set of binary questions
 - Once user chooses reply, analytics dashboard
    - Score by country
    - Porportion by country

# TBD
- Filter and sort results depending on client IP
- Feasibility of geographical heat map and alternatives
- Single comments section
- A method for users to suggest or add in their own questions



# How to run (Development)
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
[nodemon](https://www.npmjs.com/package/nodemon) | Development tool for realtime updates | ^2.0.7
[ejs](https://ejs.co/) | Main templating engine used | ^3.1.6
[express](https://expressjs.com/) | Backend web framework used | ^4.17.1
[MongoDB (mongoose)](https://mongoosejs.com/) | Atlas for main cloud DW | ^5.12.4 
[connect-mongo](https://www.npmjs.com/package/connect-mongo) | Session store with Mongo | 4.4.1 
[dotenv](https://www.npmjs.com/package/dotenv) | Environment manager for secrets | ^8.2.0
[serve-favicon](https://www.npmjs.com/package/serve-favicon) | Websie favicon library | ^2.5.0 
[request-ip](https://www.npmjs.com/package/request-ip) | Extracting client IP | ^2.1.3 |
