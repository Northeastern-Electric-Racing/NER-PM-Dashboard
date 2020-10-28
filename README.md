# NER-PM-Dashboard

Northeastern Electric Racing Project Management Dashboard

---
### Contributor guide:
- Installing the project for the first time:
	- Decide which folder you would like to place the NER-PM-Dashboard folder in
	- Open your Command Line Interface tool of choice in the folder (e.g. Terminal for Mac, Command Prompt for Windows)
	- Use the `git clone [repo link]` command as such: `git clone https://github.com/Northeastern-Electric-Racing/NER-PM-Dashboard.git`
	- Now navigate to the directory by typing `cd NER-PM-Dashboard`

- To create an issue (or suggest a feature):
	- Open the github URL online
	- Go to the issues tab and click add new issue
	- Give it a name that gives the reader an idea of whats going on. Save all detailed info for the description
	- The naming convention is as follows: `[page on site changed] - [Name of change]`. (e.g. Gantt - Restyle & Move the "View Full Gantt" Button)
	- On the right hand coloumn add labels to your issue to categorise it meaningfully
	- Add it to board_1 **To Do** initially.
	- When you are ready to work on the issue, assign yourself to it and then move it to the **In Progress** board

- Creating branches:
	- In the NER-PM folder on your computer open a terminal window
	- Type `git branch [name of branch]`
	- Branches should follow this format: `i[issue #]-[contributor name]`. (e.g. `i18-james`)
	- They type `git push` to push your branch to the repo
	- If you have been working on your branch for a while and the main repo has changed, type `git pull --rebase` to sync those changes to your branch
	- If you close the terminal window and reopen it, you will be put back onto the master branch by default. This will give errors when trying to push so use `git switch [name of branch]` to switch back to your branch

- Good coding practices:
	- Add meaningful comments in the JSDoc style. [See line #10 of this code as an example](https://github.com/Northeastern-Electric-Racing/NER-PM-Dashboard/blob/master/Code_CovidFabForm.js)
	- If you see that the rest of the code follows a pattern, say a pattern of how functions are laid out, then try to stick to this pattern to improve code uniformity

- Creating commits:
	- Commits are essentially the Cmd+S of github. As such, its useful to save your work often
	- Type `git commit -a -m [message here]` to commit
	- Style your message in the format: `i[issue number] - [description of changes made]`

- To test code using /dev:
	- Make sure you have clasp installed and working
	- Login to clasp using `clasp login` and using your @husky.neu.edu email address
	- **IMPORTANT** ALWAYS inform the pm_dashboard before pushing to clasp. ALSO you are able to access PRODUCTION data so be careful what you upload
	- Now in the terminal type `clasp push` to push your changes to the server
	- Visit https://script.google.com/a/husky.neu.edu/macros/s/AKfycbxKI0iW8IzmKZzaE9zFec-p10aHNK1X4nxWv9H8XA75/dev to test your application
	- When all is good, push your code to your branch

- Creating a pull request:
	- Now that your code is tested, you can create a pull request by going to pull requests on the repo and clicking new pull request
	- Give it a title of the form `i[issue number] - [change made]` (e.g. i14 resolved - added collaboration details to readme.md) and an optional description and then click create pull request
	- All pull requests need atleast 1 review so on the right coloumn select __jamescd18__ to request for a review
	- Also, link at least 1 issue that you are trying to solve with the pull request so that we can keep track of which issues are being worked on better
	- If a change needs to be made in your branch after a pull request is opened, simply add a new commit and this will update the pull request as well

- Deploy to production server:
	- ??