# NER-PM-Dashboard

Northeastern Electric Racing Project Management Dashboard

### Some helpful steps:
- Installing the project for the first time:
	- Make a folder somewhere (note this is not the NER dashboard parent directory. That directory will be placed inside the one you create)
	- Open a terminal in the folder
	- Type `git clone https://github.com/Northeastern-Electric-Racing/NER-PM-Dashboard`
	- Now enter the directory by typing `cd NER-PM-Dashboard`

- To create an issue (or suggest features):
	- Open the github URL online
	- Go to the issues tab and click add new issue
	- Give it a name that gives the reader an idea of whats going on. Save all detailed info for the description
	- On the right hand coloumn add labels to your issue to categorise it meaningfully
	- Add it to board_1 **To Do** initially.
	- When you are ready to work on the issue, assign yourself to it and then move it to the **In Progress** board

- Creating branches:
	- In the NER-PM folder on your computer open a terminal window
	- Type `git branch __name of branch__`
	- By convention, your branch should contain your username to make it easier to track development progress and pull requests
	- They type `git push` to push your branch to the repo
	- If you have been working on your branch for a while and the main repo has changed, type `git rebase origin` to sync those changes to your branch
	- If you close the terminal window and reopen it, you will be put back onto the master branch by default. This will give errors when trying to push so use `git switch __name of branch__` to switch back to your branch

- Creating commits:
	- Commits are essentially the Cmd+S of github. As such, its useful to save your work often
	- Type `git commit -a -m __message here__` to commit
	- Style your message in the format: __i-issue number__ - __change made__

- To test code using /dev:
	- Make sure you have clasp installed and working
	- Login to clasp using `clasp login` and using your @husky.neu.edu email address
	- **IMPORTANT** ALWAYS inform the pm_dashboard before pushing to clasp. ALSO you are able to access PRODUCTION data so be careful what you upload
	- Now in the terminal type `clasp push` to push your changes to the server
	- Visit https://script.google.com/a/husky.neu.edu/macros/s/AKfycbxKI0iW8IzmKZzaE9zFec-p10aHNK1X4nxWv9H8XA75/dev to test your application
	- When all is good, push your code to your branch

- Creating a pull request:
	- Now that your code is tested, you can create a pull request by going to pull requests on the repo and clicking new pull request
	- Give it a nice title and an optional description and then click create pull request
	- All pull requests need atleast 1 review so on the right coloumn select __jamescd18__ to request for a review
	- Also, link at least 1 issue that you are trying to solve with the pull request so that we can keep track of which issues are being worked on better
	- If a change needs to be made in your branch after a pull request is opened, simply add a new commit and this will update the pull request as well

- Deploy to production server:
	- ??