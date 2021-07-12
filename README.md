# Exam #2: "Meme Generator"
## Student: s283502 SANTANGELO ALESSIO 

## React Client Application Routes

- Route `/`: home page which contains all the public memes (also the protected ones if user logged in)
- Route `/createMeme`: page which contains the list of meme templates and, after selecting one, it allows to create a personalized meme
- Route `/login`: log in page

## API Server

- GET `/api/memes` (get list of memes)
  - request body content: none
  - request parameters: none
  - response body content: list of memes (all if authenticated, just public if not); error message in case of problems

- POST `/api/memes` (insert a new meme)
  - request body content: meme's data
  - request parameters: none
  - response body content: none; error message in case of problems

- DELETE `/api/memes/<id>` (delete meme id)
  - request body content: none
  - request parameters: meme's id to be deleted
  - response body content: none; error message in case of problems

- POST `/api/sessions` (log in)
  - request body content: username and password
  - request parameters: none
  - response body content: username; error message in case of problems

- DELETE `/api/sessions/current` (log out)
  - request body content: none  
  - request parameters: none
  - response body content: none

- GET `/api/sessions` (check if logged in)
  - request body content: none
  - request parameters: none
  - response body content: username, ; error message in case of problems

## Database Tables

- Table `creators` - contains all creators and has fields: username, hash
- Table `memes` - contains all memes and has fields: id, title, image, sentence1, sentence2, sentence3, public, creator, font, fontColor

## Main React Components

- `Main` (in `App.js`): it is the main component which contains all the other major components, states and useEffects
- `Navigation` (in `Navigation.js`): it displays the navigation bar
- `TemplatesList` (in `CreateMeme.js`): it displays the list of templates
- `LoginForm` (in `Login.js`): it provides the form and functionalities to perform the log in
- `MemeWrapper` (in `Memes.js`): it associates each meme with the right component which displays it correctly with the right sentences positions
- `MemesList` (in `MemesList.js`): it provides the list of memes to the home page
- `ModalHome` (in `Modals.js`): it displays the informations of the meme selected on the home page
- `ModalCreate` (in `Modals.js`): it provides the form and functionalities to create a meme from the selected template

## Screenshot

![Screenshot](./img/CreateMemeForm.png)

## Users Credentials

- Jack
  - Username: Jack
  - Password: imjackps
  - Created memes: "JS developer's mind", "No flame", "Every developer's mind" (copied from Noyze), "I'm the best meme template", "Incrementing a counter variable"

- Noyze
  - Username: Noyze
  - Password: aRandomPassword
  - Created memes: "Python developer's mind" (copied from Jack), "State of mind", "Recursion explanation"

- xMarcoLux
  - Username: xMarcoLux
  - Password: 1234567
  - Created memes: "Memes hierarchy", "Not caring about variable types", "Mood", "While loop explanation" (copied from Noyze)
