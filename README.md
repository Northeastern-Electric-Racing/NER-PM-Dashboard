# NER-PM-Dashboard

Northeastern Electric Racing Project Management Dashboard

**Any and all questions should be directed to @Northeastern-Electric-Racing/pm-dashboard or @jamescd18**
---

## Table of Contents:
- [First Time Project Installation](#First-Time-Project-Installation)
- [To create an issue (or suggest a feature)](#To-create-an-issue-(or-suggest-a-feature))
- [Creating a branch](#Creating-a-branch)
- [Good coding practices](#Good-coding-practices)
- [Creating commits](#Creating-commits)
- [Run / Check Code in the Google runtime environment](#Run-/-Check-Code-in-the-Google-runtime-environment)
- [Creating a pull request](#Creating-a-pull-request)
- [Deploy-to-production-server](#Deploy-to-production-server)

---

## Contributor guide:
- ### First time project installation:
	- Decide which folder you would like to place the NER-PM-Dashboard folder in
	- Open your Command Line Interface tool of choice in the folder (e.g. Terminal for Mac, Command Prompt for Windows)
	- Use the `git clone [repo link]` command as such: `git clone https://github.com/Northeastern-Electric-Racing/NER-PM-Dashboard.git`
	- Now navigate to the directory by typing `cd NER-PM-Dashboard`

- ### To create an issue (or suggest a feature):
	- Open the github URL online
	- Go to the issues tab and click add new issue
	- Give it a name that gives the reader an idea of whats going on. Names should follow this format: `[Page or "General"] - [Description]`. Save all detailed info for the description
	- The naming convention is as follows: `[page on site changed] - [name of change]`. (e.g. `Gantt - Restyle & Move the "View Full Gantt" Button` or `General - Resize Page Content Boxes`)
	- On the right hand coloumn add labels to your issue to categorise it meaningfully
	- Add it to board_1 **To Do** initially.

- ### Creating a branch:
	- In the NER-PM folder on your computer open a terminal window
	- Type `git branch [name of branch]`
	- Branches should follow this format: `i[issue #]-[contributor name]`. (e.g. `i18-james`)
	- They type `git push` to push your branch to the repo. If this throws an error `fatal: The current branch i12-rahul has no upstream branch` type `git push --set-upstream origin [name of branch]` and then `git push`
	- If you have been working on your branch for a while and the main repo has changed, type `git pull --rebase` to sync those changes to your branch
	- If you close the terminal window and reopen it, you will be put back onto the master branch by default. This will give errors when trying to push so use `git switch [name of branch]` to switch back to your branch

- ### Good coding practices:
	- Add meaningful comments in the JSDoc style. [See line #10 of this code as an example](https://github.com/Northeastern-Electric-Racing/NER-PM-Dashboard/blob/master/server-code/CovidFabForm.js)
	- If you see that the rest of the code follows a pattern, say a pattern of how functions are laid out, then try to stick to this pattern to improve code uniformity
	- Generally it is good practice to follow the mantra: One Function, One Job. Utilizing helper functions / methods can assist with this.

- ### Creating commits:
	- Commits are essentially the Cmd+S of github. As such, its useful to save your work often
	- Type `git commit -a -m [message]` to commit
	- Style your message in the format: `i[issue number] - [description of changes made]` (e.g. `i18 - fixed typo in variable name`)

- ### Run / Check Code in the Google runtime environment:
	- Make sure you have clasp installed and working
	- Make sure to go to https://script.google.com/ then into settings and turn google appscript API on 
	**WHILE LOGGED INTO @husky.neu.edu**
	- Login to clasp using `clasp login` and **USING YOUR @husky.neu.edu EMAIL ADDRESS**
	- **IMPORTANT** ALWAYS mention in the pm_site Slack channel that you are using clasp for testing BEFORE pushing to clasp. ALSO you are able to access PRODUCTION data so be careful what you upload
	- Now in the terminal type `clasp push` to push your changes to the server
	- Visit the dev URL to check your version of the application and ensure your updates are working properly
	- When all is good, push your code to your branch

- ### Creating a pull request:
	- Now that you have checked your code, you can create a pull request by going to pull requests on the repo and clicking new pull request
	- Give it a title of the form `i[issue number] - [change made]` (e.g. `i14 - added collaboration details to readme.md`) and an optional description, and then click create pull request
	- All pull requests need at least 1 review so on the right column select __jamescd18__ to request for a review
	- Also, link at least 1 issue that you are trying to solve with the pull request so that we can keep track of which issues are being worked on better
	- If a change needs to be made in your branch after a pull request is opened, simply add a new commit and this will update the pull request as well

- ### Deploy to production server:
	- TBD
