# Newsletter

Github’s Repository

Task:
Create a system to accept user email ids , content , topic and time to send the emails to specific users regarding the content after the given time.

Pre-Requisites : 
○	Node.js
○	Expres.js
○	MongoDB
○	JavaScript     

Assumptions : 
If the request of the user fails then we will simply log “Not accepted” on the screen. We can also implement other features e.g: Notifying the user of the reason for the failure.

Results: 
●	Status Code: 200 (If accepted)
●	Status Code: 404 or 500 according to the cause of denial (If not accepted)   

Direction / Approach:
At the normal times of the day when there is a relatively less number of requests, it can be handled in the normal way. The main task is to handle the API at the peak time because that will create a bottleneck for our database . To implement a counter method for preventing this condition, we can use LOAD BALANCING which can handle this condition very efficiently. Below are some references for Load Balancing.

LOAD BALANCING :
A load balancer is a process that takes in HTTP requests and forwards these HTTP requests to one of a collection of servers. Load balancers are usually used for performance purposes: if a server needs to do a lot of work for each request, one server might not be enough, but 2 servers alternating handling incoming requests might.

![image](https://user-images.githubusercontent.com/56034219/167151595-69cc6de8-5280-4597-8c32-2de9b803ee0f.png)

![image](https://user-images.githubusercontent.com/56034219/167151683-793b05e9-b52c-432c-a66e-6a10a6fed38e.png)

                           A flowchart depicting the functioning of the Task 



Some SnapShots of working of API with Postman:
![image](https://user-images.githubusercontent.com/56034219/167151886-9ead0dd1-a4ea-4d96-a9a2-59b048a46880.png)

![image](https://user-images.githubusercontent.com/56034219/167151913-1177d9d2-165a-4b75-b37e-bebf4e075c90.png)

![image](https://user-images.githubusercontent.com/56034219/167151947-f784f1c0-86c4-4944-98e9-1f0c421a2ba4.png)

![image](https://user-images.githubusercontent.com/56034219/167151972-d98f9a86-195c-4e71-b09b-ccc089d65c3b.png)

Ideal Architecture :
●	The architecture uses REST API.
●	Currently, we’re using body-parser to use JSON formatting.
●	For handling a burst of requests we can use Load Balancing and distribute the load on different machines rather than assigning it to one single system.
