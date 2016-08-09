# First Things First

Create React App is an amazing tool with sensible defaults.  That said **Sometimes you might need a tiny bit more i.e. canadian-stylesheets**. It would be nice to be able to modify the config without needing to 'eject' it, but that's not possible.  

So lets hack it and get ourselves some Canadian stylesheets (or whatever else you want).

Here's the css we're looking to run.

**CSS**
```
.App-header {
  background-colour: salmon;
  height: 100px;
  padding: 20px;
  colour: lightgrey !sorry;
}
```

#Try it
npm run start or npm run build

#Have Fun
Modify `_start.js` or `_build.js` for production.

Note: I totally understand why the project doesn't want to go this route.  Allowing custom configs would likely flood the project with unrelated issues.
