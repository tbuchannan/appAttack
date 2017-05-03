## appAttack!

### Background

appAttack is a classic beat'em up style game. appAcademy is under attack! and you must choose your fighter to defend it and keep everyone safe.


### Functionality & MVP  

With appAttack, users will be able to:

- [ ] Start and  pause the game
- [ ] Attack enemies
- [ ] Various Levels and enemies
- [ ] Choose from different characters who have different abilities

In addition, this project will include:

- [ ] An About screen describing the background and rules of the game
- [ ] A production README


### Wireframes

This app will consist of multiple screens, including the start screen, info screen, character select, and the actual game screen with game board, game controls, and nav links to the Github, LinkedIn, and the About modal.  Game controls will include Start, Pause buttons.  On the top left, players health and power bar will be displayed. On the top right will be the players current score.  

![GameBoard](/wireframes/GameBoard.png)

![InfoScreen](/wireframes/InfoScreen.png)

![SplashPage](/wireframes/SplashPage.png)

![CharacterSelect](/wireframes/CharacterSelect.png)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Easel.js` for effects rendering
- `Browserify` to bundle js files.

In addition to the entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Player` elements and rendering them to the DOM.

`enemy.js`: this script will handle the logic behind the scenes.  An Enemy object will hold an `enemy type`, and attack amount.  It will be responsible for the enemy random movements and attacks.

`player.js`: this lightweight script will house the constructor and update functions for the `Player` object. Each `Player` will have a set of abilities and associated health.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed. Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `Browserify`
- Learn enough `Easel.js` to render a basic start page

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Player` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the player, ideally a player and enemy.  Build in the ability to move the player.  Goals for the day:

- Complete the `player.js` module (constructor, update functions)
- Render a player to the `Board` using `Easel.js`
- Make the player movable with controls
- Do the same for enemies

**Day 3**: Create the enemy AI logic.  Build out 3-5 levels and various enemies unique abilities and stats.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Enemy` object with correct type and handling logic
- Have a functional grid on the `Board` frontend that correctly handles the player and enemy movement and attacks


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Finish  controls for game
- Have a styled `Board`, fluid controls with a nice looking title

### Bonus features

There are many directions this beat-em up game could eventually go.  Some anticipated updates are:

- [ ] Add multiple levels and enemies
- [ ] Add more Characters
- [ ] smarter AI
- [ ] different game modes
