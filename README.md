# Explora

Explora is a web application based off of the popular web forum Quora. Explora allows users to ask questions, 
answer questions, and comment on answers across a seamless API.

![Alt text](/app/assets/images/entry.png?raw=true "Login")

## Features

### Single Page Application

```jsx
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
```

Explora utilizes a single static webpage facilitated by React.js. All elements of the application are rendered 
collectively onto one page. 

```jsx
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={_redirectUnlessLoggedIn}>
        ...
      </Route>
    </Router>
  </Provider>
```

Each separate component of the application is individually updated or replaced in 
real-time based on window location and user input. Newly created content is rendered immediately and different
components have the ability to persist on the same page without needing re-rendering. This allows the app to
flow smoothly and with an appreciable reduction in load-times. In addition, information persists as well reducing
the number of calls to the backend that need to be made.

![Alt text](/app/assets/images/index.png?raw=true "Login")

### Diverse Components

There are many different components in the App database including Questions, Answers, Comments, Users, Topics, 
and more.

### Questions & Answers

Questions are stored in the database in one table which contains columns for ```id```, ```title```, ```body```,
and ```author_id``` as well as various image-related columns. Similarly, answers are stored in their own table 
with the following columns: ```author_id```, ```question_id```, and ```body```. On login, the user is redirected 
to ```/home``` which once mounted dispatches a question request to populate the page's ```QuestionIndex``` with 
```QuestionIndexItems```. A ```QuestionIndexItem``` pulls a question's title and uses ActiveRecord associations 
to extract it's first answer's author and body and that answer's associated comments.

Each question has its own ```QuestionDetail``` page that contains more information about the given question as
well as a full list of that question's associated answers, and those answers' associated comments. The layouts of
each page are inspired heavily by Quora.

![Alt text](/app/assets/images/detail.png?raw=true "Login")

### Search

Perhaps the most complex component of the entire application is the Search Bar. The Search Bar functions as a form
element that communicates with the backend for question creation. As the Search Bar is being interacted with, the
Search Bar dynamically updates a search-list that searches three separate classes for matches:

```js
  case Search.RECEIVE_SEARCH_TOPICS:
    if (action.matches < 1) {
      API.fetchSearchUsers(
        (matches) => dispatch(Search.receiveSearchUsers(action.query, matches)),
        action.query
      )
      break;
    } else {
      return next(action);
    }
```

As can be seen above, if the search returns no matches, the middleware dispatches the next search action. Otherwise,
the results of the query are passed along to the reducer and added to the app's store.

Additionally, on question creation, the Search Bar searches the question for keywords and automatically create
instances of ```TopicTaggings```. TopicTaggins are a class that connect a question using ActiveRecord associations.

### Topics

Topics are categories of questions. As mentioned above, a question is given categories upon creation. Topics contain two main columns: ```name``` and ```description```. Topics are associated with questions through a connector class: ```TopicTaggings```. On the Topic page, TopicTaggings are used to alternate between two feeds - the overview of each questions most upvoted answers and a page where you can answer the questions yourself.

### Actionables

Actionables, or UserActions as they exist in the database, are a polymorphic join table that unites a User to each of the other elements of the application. A User has several actions at their disposal: following, upvoting, downvoting, and passing. These actions can each be performed on a variety of different classes.

```rb
 class UserAction < ActiveRecord::Base
  validates :user_id, :actionable_id, :actionable_type, :user_action, presence: true
  validates :user_id, uniqueness: { scope: [:actionable_id, :actionable_type, :user_action]}

  belongs_to :user

  belongs_to :actionable,
    polymorphic: true
 end
```

The current user's actions are requested upon log in and are kept in the store. As a result, the feed can be easily manipulated to alter the content as acted upon by the user.


## To Be Implemented

- Enhanced user pages (messaging/profile pictures)
- Infinite Scroll
- Using follows to manipulate feed
