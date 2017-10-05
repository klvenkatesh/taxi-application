<h2>taxi-application</h2>
<h3>Auto Queuing System v1.2</h3>
Problem stmt:
At random times a ride request comes from users.
The request is then broadcast to all drivers.
Whoever picks up first gets to service them.
<b>Assumptions:</b>
1. There are 5 drivers only.
2. All drivers are available at all times
3. A driver can pickup only one request at a time
4. Each request can be picked up by only one driver
5. whoever picksup the request first gets the ride
6. It takes exactly 5 mins to serve each request
7. Every request has 3 states waiting , ongoing,complete
<b>Requirements :</b>
1. All code should be hosted in github and shared with us at the beginning of the project
2. Commit regularly to enable us to see the progress through the development process. (This will help us evaluate even partially complete scenarios)
3. Document the backend API and Architecture along with DB tables and columns and their purposes. Mention any other assumptions made.
4. UI of Apps not important = Simple forms and lists would be fine . Need not be responsive design
5. Some mockups are attached
6. Use JSONs for all API requests and responses and document sample request & responses
7. Build API as POST requests
8. You can build backend in any language of choice (nodeJS, php, Java, python etc..)
9. Build apps using html/css/js as required.

1. DRIVER APPS : Build driver web app with 3 TABS : Waiting requests(tab1) , Ongoing request(tab2), Complete request(tab3).
  a. url: /driverapp.html?id=1 or /driverapp.html?id=2 etc… for the 5 drivers 
  b. refresh button update statuses
  c. Add select button next to ever waiting request .
  Programming Challenge : 
  d. Once select is clicked it is to be verified again that the request is still open before allotting to a particular driver, since another driver may have picked up in the meantime.
  e. Once a request is picked up, the request status is changed to ongoing and moved to tab2
  f. Once a request is picked up by one driver, remove it from the waiting queue of all drivers
  g. Also after 5 mins, the request is automatically set to be complete
2. CUSTOMER APP : Build a simple form to place new request at any time with customer
  a. URL: /customerapp.html
  b. Form will have 1 textbox for customer id and 1 button to place request
  c. Customers can place any number of requests
3. DASHBOARD APP: Build a simple Web App to show list all requests with request ID , time of request, time elapsed and current status(waiting, ongoing) with refresh button
4. BACKEND & DB:
  a. Design & Build necessary Database with relevant tables
  b. Code the necessary API for the Apps
  c. Add the necessary logic in the backend

Once a new request is placed, it is shown in the tab1 of all drivers. Whichever driver clicks first
will gets the request and, it will go to their tab2 (say Auto no :3), then it is removed from other
drivers list and even if they click, they should see “request no longer available”
> DB should have tables for requests with time of request, location of request, status of request(
  0waiting, 
  1ongoing,
  2complete)
and which auto picked up
> Once a request is picked up, all requests take 5 mins to complete
Attached:
  1. Queuing system overall Architecture
  2. Driver App Mockup
  3. Customer App Mockup
  4. Dashboard Mockup

Once the above is developed. These are the features that should be following:
Now extend the Backend to consider locations also
1. Assume Autos are at 5 different locations
  a. Auto 1 is always at (1,1)
  b. Auto 2 = (2,2)
  c. Auto 3 = (3,3)
  d. Auto 4 = (4,4)
  e. Auto 5 = (5,5)
2. Take location also when placing requests from customer App (assume city is a 5km x 5km area )
  a. Customer app should have textboxes to enter x & y location data: where x,y are integers from 0 to 5
3. New requests are shown to only 3 nearest available autos in their TAB1.
4. Remove Refresh buttons in Driver Apps. All Driver apps should update immediately on their own on status changes.
5. If more than 10 requests are waiting, then reject new requests from CUSTOMER APP and inform customer with message: “Rides not available. try again later “
