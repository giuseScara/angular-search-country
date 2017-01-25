# Angular search country
A UI which allows the user to search for countries by names, add them to a list one by one, and submit list of selected countries  to the server.

Frameworks and Tools:
- AngularJS 
- Font awesome
- Toastr
- Gulp
- Bower
- npm
- json-server (fake REST API)

Open terminal:
<pre>
 git clone https://github.com/giuseScara/angular-search-country.git<br>
 cd angular-search-country <br>
 npm run run-app <br>
 Open browser to http:localhost:3000
</pre>

Other commands:
<pre>
  1) npm run compile-app (compile app and create dist folder)
  2) npm run run-server (start json-server)
  3) npm run browser-sync (compile app, create dist folder and watch change file)
  $) npm run run-app (compile app, create dist folder and put content under json-server/public and start server)
</pre>

Fake db: json-server/originalDB.json

Fake REST API server: (https://github.com/typicode/json-server)
<pre>
  http://localhost:3000/country
  http://localhost:3000/selectedCountries
</pre>
