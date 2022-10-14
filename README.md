# Getting started with TeknoPlat
TeknoPlat is divided into three main parts which follows the MVT framework:
1. teknoplat (View or Controller)
2. frontend (Template)
3. api (Models)


## Prequisites
If you haven't installed NodeJS on your system, download and install the package here:
[Download Node and NPM](https://nodejs.org/en/download/)

If you haven't installed Python and Django, follow this guide here:
[How to install Django and Python](https://docs.djangoproject.com/en/1.8/howto/windows/)

## 1. Clone Repo
```
git clone 'https://github.com/SkrowRepap/Teknoplat'
```

## 2. Create and start a a virtual environment
```
# you can use either py / python / python3
py -m virtualenv env

# run this afterwards
env/Scripts/activate
```

If you haven't installed virtual env, install by opening cmd and type the command: `python -m pip install virtualenv`

## 3. Install the project dependencies:
```
pip install -r requirements.txt
```

## 4. After installing, run the Django Project for the first time. (I recommend running the command using Powershell)
```
py manage.py runserver

// in case you are using powershell
py .\manage.py runserver
```

---

# React
## Running react for the first time
- Go to the 'frontend' directory, then run this code in the terminal:
- ```npm install```
- After installing you can type this in command to start the application:
- ```npm start```

## Applying your react in the django app.
### Note
- Django will only use React's build bundle, so in order to apply your changes make sure you build first your react and reload the django server.
- When adding new page, you can add your newly created page in App.js via Router. To learn more about react-router-dom, (Read here](https://v5.reactrouter.com/web/guides/quick-start)

---
# Rule for development standard process
1. Create a new branch of your assigned module (module1, module2, etc.)
```
git checkout -b <branch-name>
```
2. When doing a commit, commit message must be easy to understand.
   - Title of the commit (e.g. 'Added <feature name>',' Fixed <feature name>' etc.)
   - Summary detail of the commit
   
**Commit Message Sample**
```
Updated Login Page
- Added login button
- Added login button functionality
- Added button functionality to register
```

3. When pushing to the repo, avoid making changes to the main branch, just push to your designated branch module
```
git push origin <branch-name>
```

4. Go to Github to create a pull request

---
## Branches and main
This will servee as guide on where should we push our codes to the branches
	| branch | Description |
| ----------- | ----------- |
| main | This will serve as the main branch for our application |
| releases | All release version of the app will be pushed here. |
| ui-master | All UI related codes of the app will be pushed here  |
| features-master | All backend related codes of the app will be pushed here. |



