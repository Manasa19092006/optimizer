 # OptiCompare

 OptiCompare compares a classical greedy scheduler with a quantum-inspired simulated annealing search. The React frontend submits experiment configurations to a Node/Express API, which runs both algorithms and returns measured results.

 ## Run locally

 Install dependencies:

 ```bash
 npm install
 ```

 For frontend development, run the API and Vite in separate terminals:

 ```bash
 npm run server
 npm run dev
 ```

 Open `http://127.0.0.1:5173/`.

 ## Host in production

 Build and serve the frontend and API from one Node process:

 ```bash
 npm install
 npm run build
 npm start
 ```

 The host should expose the `PORT` environment variable. The default is `4173`.

 ```text
 GET  /api/health
 POST /api/optimize
 ```

 The `POST /api/optimize` endpoint accepts the saved experiment configuration and returns both schedules, objective values, feasibility, and execution timings. No API keys or database are required.
