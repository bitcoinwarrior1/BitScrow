# todo-knex
Command line todo app using knex raw

## Intro

We're building a simple command line app to manage our list of todos. We're finally at the point of storing our data in a database! Woooo!

We're using the knex module to talk to our sqlite3 database.

## Setup
### Install knex globally
```npm i -g knex```

### Run the migrations

```knex migrate:latest```  
What just happened? There is a new file in your folder. What is it?
Install SQLite Manager as a firefox addon. Open your new sqlite db file and have a look around. Try and understand how the migration file corresponds to how the db looks in SQLite Manager.

### Seed the db

```knex seed:run```  
Now go check out your db in SQLite Manager. You should see some rows in your table!
While you are there, write a query that adds a new task to the database.

### Set file permissions

Instead of running our file like ```node todo.js``` we'd like to be able to run it like any other script on our computer, just to make it easier to use.

Run ```chmod +x todo``` in your console to add the excutable flag to the file.

Now you can just run in in your console like ```./todo list```

You should see some tasks that were seeded in your db.

## Release 0: Add task id to program output.

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them.

Add some code so that when we log out a task it gives the id number too. eg
```./todo list``` => ```1: clean my room```

## Release 1: Delete a task by id.

Users should be able to complete tasks. We'd like to be able to do something like ```./todo done 1``` which will remove the task with id 1 from the database. 

You'll want to add a new function that returns a promise that can delete a row by a given id. Look at how the other functions work. You might need to review promises. 

What is happening with those .catch and .finally bits of code?

What happens when you remove the .finally calls?

## Release 2: Update a task by id.

Users make mistakes. Let them update a task like so: ```./todo upate 1 'clean my room thoroughly'```

## Release 3: Searching

Busy people are complaining about having 200 tasks in their consoles. Add a feature that searches in the task string for a given set of words. Something like

```./todo search 'clean wire' ``` should return tasks 1 and 3 that are seeded in the db 

## Release 4: Add a migration

We've got this production database set up, lots of users and a new feature request. 

We need some way of updating our db without destroying all the existing data. Migrations!

Users want to be able to mark a task as complete without removing it from the db.

Use ```knex migrate:make addCompleteColumn``` to create a new blank migration.

Snoop on the other migration and read the knex docs to work out how to add a new column to our table. Hint: knex.schema.table lets you modify an existing table.

What type should we use to store our data?

Fill in the .down function in our migration. It should be the inverse of the .up function.

Run ```knex migrate:latest``` to run your new migration. If you didn't get any errors check out your db in SQLite Manager. Is it what you expected? What happened to existing data in the db? 

Run ```knex migrate:rollback``` Look in your db. 

Run ```knex migrate:latest``` 

## Release 5: Build out the feature from Release 4.

It's up to you to decide how far you want to go with this. Should listing all the tasks show completed and uncompleted tasks? Maybe you should add the task completed status when printing out a task. Maybe you can filter by completed when listing?

## Release 6: Use the knex query builder.

Concatenating strings together to make SQL queries is PAINFUL. The whole point of knex is to make query strings for us so that we don't have to do it manually. It's like hyperscript for SQL. Hyperscript makes HTML strings for us. Knex makes SQL strings for us. 

Refactor the todo file and change all the calls to knex.raw. Check out the "Query Builder" part of the knex docs. Your getAll() function will change to something like ```return knex.select().table('tablename')```

Soooo much nicer!

