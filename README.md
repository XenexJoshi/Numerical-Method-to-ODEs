Numerical Methods to ODEs:

This program contains three numerical methods to first-order ODEs, namely Euler method, Runge-Kutta method, and Adams-Bashforth method.
The input is read and parsed by the useof an AST, and a custom parser that support most standard mathematical functions. The output is 
displayed as a graph through Plotly.js. The program is created using React and Vite, and be run using npm commands after setting the node
modules required for running the Vite application, which can be done by:

    npm install
    npm run dev

The test cases are generated using Vitest, which can be run using:

    npm t

The test cases for the compiler, and the base code for each numerical method is placed in the tests folder, and the source code for React
component is placed in src/components, and the implementation for numerical methods are placed in src/lib folder.

Required modules before running program:
  react-plotly.js
  react-router-dom
  vitest
