# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?

* React - I created the SPA (Single Page Application) with it.
* AntD - a component library. I made use of the toggle component.
* axios - I made use of this for the REST API calls.
* react-epic-spinners - I used a spinner from this library to create a good-looking loading page
* styled-components - I made use of this to style the application while scoping styles to components

### Q) What's the command to start the frontend application locally?

`yarn start` - ensure you're in the frontend folder, and you've installed all the dependencies by running `yarn install`

### Q) What libraries did you add to the backend? What are they used for?

* Typescript - I used this to add types in the application, make the code more maintainable by imbibing a statically
  typed approach.
* axios - I made use of this for the REST API calls.
* debug - I used this to debug and log insights to the console
* http-errors - I used this to create HTTP errors for the express application
* morgan - I used this as a request logger (to view information about incoming requests elegantly)

### Q) What's the command to start the backend application locally?

`yarn run dev`. ensure you're in the backend folder, and you've installed all the dependencies by running `yarn install`

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

I would add support for multiple currency pairs, perhaps (not just BTC-USD). I would also migrate the frontend to
Typescript as well. I would write tests for the backend and frontend code.

### Q) Which parts are you most proud of? And why?

To be completely honest, I'm not 'most proud' of any part in particular. I'm equally proud of all the parts. I always
take pride in ALL the code I put out as an engineer. I believe I structured and architected the solutions in ways that
are easily maintainable and readable, while following best practices in the respective domains. It would be really quick
and painless for another developer to take over the codebase and become productive with it.

### Q) Which parts did you spend the most time with? What did you find most difficult?

The backend. Integrating with the third-party APIs (coinbase, bitfinex and binance), understanding how order books work.
Nothing too difficult but I had to go through a lot of documentation/articles, so I spent longer than I normally would

### Q) How did you find the test overall? Did you have any issues or have difficulties completing?If you have any suggestions on how we can improve the test, we'd love to hear them.

All good. No issues. No suggestions :)
