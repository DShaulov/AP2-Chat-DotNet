### Packages Used For React-Clientside:

- react-router-dom
- react-bootstrap
- react-bootstrap-icons
- @microsoft.signalr

### Solution Structure:

Consists of 3 projects:
1) AP2-Chat-DotNet-React
2) AP2-Chat-DotNet-WebAPI
3) AP2-Chat-DotNet-Rank

AP2-Chat-DotNet-Rank is a standalone project for part 1 of the exercise.

AP2-Chat-DotNet-WebAPI and AP2-Chat-DotNet-React must run together in order to function properly.

** The WebAPI and React projects must run on the ports specified in their configuration files in order for singalR to work:
  7201 for the API and 3000 for React. **

### How to run AP2-Chat-DotNet-Rank:
1) Open solution in Visual Studio.
2) Right click on AP2-Chat-DotNet-Rank project -> Set as Startup Project.
3) Click Start (green arrow).

### How to run WebAPI + React:
1) Open solution in Visual Studio.
2) Right click on the solution -> Set Startup Projects -> Multiple Startup Projects -> AP2-Chat-DotNet-React (start) + AP2-Chat-DotNet-WebAPI (start).
3) Open AP2-Chat-DotNet-React in terminal and run "npm install" to install required packages.
4) Click Start (green arrow).

### Hardcoded Users:
The WebAPI makes use of services and static data structures in order to simulate a database.
The hardcoded users are:
- Username: 'mac' , Password: 123
- Username: 'charlie' , Password: 123
- Username: 'dennis' , Password: 123
- Username: 'dee' , Password: 123
- Username: 'frank' , Password: 123
