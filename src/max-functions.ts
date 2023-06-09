
// -- Authentication --

emma.setAuthentication({
    type: type, //
    instructionsUrl: "example-documentation.com", // Shown for more info on the auth process - Optional 
    customKey: customKey, // Coda doesn't use this

// For Oauth
setAuthorizationUrl(authorizationUrl),
setTokenUrl(tokenUrl),
setTokenPrefix(tokenPrefix),

    userInputs: userInputs, // Array of objects for each input. 
    getConnectionName: async function (context) {
      let response = await context.fetcher.fetch({
        method: "GET",
        url: "https://api.github.com/user",
      });
      return response.body.login;
    },
  });


// -- Make Object Schema --
// The developer makes a schema variable to set up the structure for incoming data. They define keys for each data point, specify the data type, and provide descriptions, and so on.
let exampleSchema = emma.makeObjectSchema({
    type: emma.ValueType.Object, //Maybe we don't need this because it will always be an object?
    properties = {
      name: {
        description: "The spell name.",
        type: emma.ValueType.String,
      },
      description: {
        description: "A description of the spell.",
        type: emma.ValueType.String,
      },
      higher_level: {
        description: "A description for casting the spell at a higher level.",
        type: emma.ValueType.String,
      },
      level: {
        description: "The level of the spell.",
        type: emma.ValueType.Number,
      },
      range: {
        description: "The range of the spell.",
        type: emma.ValueType.String,
      }
    },
    displayProperty = "name";
    idProperty = "index";
    featuredProperties = ["description", "level", "range"];
  });
  
  
// -- Add data connection --
// A sync table that lists all of the user's repos.
emma.addDataConnection({
  name: "Repos",
  description: "All of the repos that the user has access to.",
  identityName: "Repo",
  // The schema is used to validate the data that is returned from the fetch function.
  schema: exampleSchema,
  fetch : {
    //The developer can add parameters to the fetch function to customize the data that is returned.
    parameters: [],
    execute: async function ([], context) {
      // Get the page to start from.
      let page = (context.sync.continuation?.page as number) || 1;

      // Fetch a page of repos from the GitHub API.
      let url = coda.withQueryParams("https://api.github.com/user/repos", {
        page: page,
        per_page: PageSize,
      });
      let response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      let repos = response.body;

      // If there were some results, re-run this formula for the next page.
      let continuation;
      if (repos.length > 0) {
        continuation = { page: page + 1 };
      }

      // Return the repos and the continuation (if any).
      return {
        result: repos,
        continuation: continuation,
      };
    },
  },
});

// -- Set network domain  --
// This function sets the domain that will allow the integration to access data from. 
emma.addNetworkDomain("twilio.com");