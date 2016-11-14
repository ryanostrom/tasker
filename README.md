![Ember-Sails](http://ryandevelops.com/resources/assets/ember-sails.png)

## About

A Ember+Sails starter application.

## Stack

Ember+Sails stack with RESTful API.

* **Front End:** Ember (using pods)
* **Web Server + Back End:** Sails on Node
* **Database:** MongoDB

## Benefits

* Leverage front-end conventions of Ember and RESTful conventions of Sails
* Automated testing
* Rock solid frameworks with minimal configuration
* No need for Apache or Nginx webserver
* Write everything in one language (javascript) for your whole stack

#### Example

Take note of the 'user' model created in both Ember and Sails. We are able to create both models and call the API with extremely minimal code. Because we've created a 'user' model/controller in Sails, it automatically knows how to handle a 'find' request received from Ember.

## Local Dependencies

* Node (5.10.1)
* Npm
* Bower
* Ember Cli
* Sails Cli

## Local Setup

#### Step 1: Clone Repo
* ```git clone https://github.com/ryanostrom/ember-sails.git ~/sites/ember-sails```

#### Step 2: Import MongoDB
* ```cd ~/sites/ember-sails/ && tar-zxvf mongo.tar.gz && mongorestore --db=ember-sails ember-sails```
* ```rm -rf ember-sails && mongo.tar.gz```

#### Step 3: Set local env
* ```cp ~/sites/ember-sails/server/.env-template ~/sites/ember-sails/server/.env```
* Remove lines for username and password

#### Step 4: Install local deps
* ```cd ~/sites/ember-sails/client && npm install && bower install```
* ```cd ~/sites/ember-sails/server && npm install```

#### Step 5: Build and Link Ember to Sails
* ```cd ~/sites/ember-sails/client && ember build```
* ```ln -s ~/sites/ember-sails/client/dist/ ~/sites/ember-sails/server/assets```

#### Step 6: Run sails
* ```cd ~/sites/ember-sails/server```
* ```sails lift```
* Visit site at http://localhost:1337

#### Note
For local development, rather than building ember and running it through sails, you may run both ember and sails and link them as follows:
* ```cd ~/sites/ember-sails/client && ember serve --proxy=http://localhost:1337```
* In a new terminal tab: ```cd ~/sites/ember-sails/server && sails lift```
* Visit site at http://localhost:4200

## Deployment (Ubuntu 14.01 / Node 5.10.1)

* Push Master Branch
* SSH to server
* ```cd /var/www/{{site}}/path/to/root```
* ```git pull origin master```
* ```cd client && ember build --environment=production```
* ```cd ../server && ln -s ../client/dist htdocs && nohup sails lift --prod &```

#### Notes:
* Ember is symlinked to /server/assets
* Symlink only needs to be created on initial deployment
* If server is configured with apache or nginx, you will need to setup reverse proxy for 127.0.0.1:1337/ in order for port 80 to direct to the node webserver

#### Example of Apache reverse proxy

```
<VirtualHost *:80>
  ServerAdmin example@gmail.com
  ServerName example.com
  ServerAlias www.example.com

  ProxyRequests Off
  <Proxy *>
    Order deny,allow
    Allow from all
  </Proxy>

  ProxyPass / http://127.0.0.1:1337/
  ProxyPassReverse / http://127.0.0.1:1337/
</VirtualHost>
```
