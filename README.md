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
The WebAPI uses JWT tokens for request authorization.

### How to run AP2-Chat-DotNet-Rank:
1) Clone the repository and open it.
2) Open AP2-Chat-DotNet.sln to open the solution.
3) Right click on AP2-Chat-DotNet-Rank project -> Set as Startup Project.
4) Click Start (green arrow).

### How to run WebAPI + React:
1) Clone the repository and open it.
2) Open AP2-Chat-DotNet.sln to open the solution.
3) Right click on the solution -> Set Startup Projects -> Multiple Startup Projects -> AP2-Chat-DotNet-React (start) + AP2-Chat-DotNet-WebAPI (start).
4) Click Start (green arrow).
* In some cases the react server might come up before the api server and wont connect in time. In that case, refresh the react page.

### Hardcoded Users:
The WebAPI makes use of services and static data structures in order to simulate a database.
The hardcoded users are:
- Username: 'mac' , Password: 123
- Username: 'charlie' , Password: 123
- Username: 'dennis' , Password: 123
- Username: 'dee' , Password: 123
- Username: 'frank' , Password: 123

### How to change ports for the WebAPI server:
1) In the react project go to src -> ApiPort.js -> change the port to the desired number
2) In the api project go to Properties -> launchSettings.json -> change port number in "applicationUrl"
** Note that the hardcoded users belong to the server localhost:7201, and will not be able to send/recieve messages unless their server is also running.

### Changing ports for the react server:
** The CORS policy of the WebAPI only accepts requests from https://localhost:3000, https://localhost:3001, since react-signalr does not allow a AllowAnyOrigin policy **
If you would like to allow additional ports, go to the api project -> Program.cs -> line 42 "allowedOrigins" variable -> add desired URL.
In order to change ports:
1) Go to the react project -> .env -> change port number
2) Go to the react project -> AP2-Chat-DotNet-React.esproj.user -> LaunchJsonTarget -> change the url port