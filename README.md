# cycl3d
A monorepo full-stack digital twin for cycling infrastructure in Melbourne, Victoria. Currently a work in progress, however currently displayed features include road information, bike locks, trees, and buildings.

Built using CesiumJS, Bun, Elysia, and Vite. 

## Instructions 
The deployed app can be viewed [here](#). 

### Building Locally
This project was built using Bun, which is required for the server-side due to the reliance on [Elysia](https://elysiajs.com/). The front end however can be compiled and run with the JavaScript runtime of your choice. 

1. Clone this repo 
2. Installed required dependencies `bun install`
3. Ensure relevant `.env.example` files are replicated (i.e. `.env.development`) with relevant values
4. The fullstack dev environment can then be start with `bun dev` from the root directory. Alternatively, `bun dev` can be run within either `./client` or `./server` to run either workspace only. 

