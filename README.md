# Texperts
==================
A MEAN stack app that connects tech experts (texperts) with users who need technical support for a variety of devices.

This application allows users to either sign up as a texpert and select which areas they can provide help, or as a user who is looking for help. 

Live version available at:

http://texpert.herokuapp.com

This is hosted by Heroku in a developer tier so it might take a few seconds for it to spin up and serve the site.

## User Stories
As a non technical individual who doesn't have time to take my electronics into a store or a physical location to get help, I want to be able to get technical service at the touch of a button.

As a student who can only work full time, I would like to use my technical skills to help people solve their problems with their electronics and get them back to their day.

### Usage

You can either Sign Up or Log In in the top right corner of the page.

If you create an account you will have two options - 'I need help' or 'I can help. If you select 'I can help' you will be asked in what areas you can help. 

As a user who is looking for help, you will have the ability to view all Texperts, create a help ticket, view your profile with your open tickets, and join a chat room with a Texpert.

As a Texpert you will have access to view all open help tickets on the help board. On the help board, you can choose a ticket you think you can help with, which will open a chat room. With a chat room open, a link will become active on the users profile page.

### Technologies

This application is built with the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) stack and utilizes [Materialize](http://materializecss.com/) styling framework.

We used [SOCKET.IO](https://socket.io/) to manage the chat room functionality of our app.

### Future Features

* Include Twilio api to text a Texpert when their services are requested.
* Allow users to leave reviews and comments about texperts
