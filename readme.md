# Summary

This framework is designed to automate API testing for the PetStore application. It integrates popular tools and libraries like **Supertest**, **JEST**, **Jest HTML Reports**, and **CI/CD - Github Actions**  to provide a robust and maintainable testing solution.

## How to run

The different test 'packets' are located under `packages` folder.

In most of the cases the setup would still be the same, something along the following lines to be run within the relevant pack:

1. `nvm use`
2. `npm ci` (or if adding new dependencies then `npm install`)
3. `npm run test`