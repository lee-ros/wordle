# The Great Wordle Game!

## Into
A Wordle game implemented using the following stack:
 - postgreSQL
 - FastAPI
 - SQLAlchemy
 - React
 - TailwindCSS

## How to Setup
 1. Clone this repo
 2. Run the development or production environment using vscode tasks (or run it from the `scripts` folder)
 3. Open the browser and go to [dev](localhost:3000) or [prod](localhost:8080)

 ## How to Play
Once the app is up and running on your browser, you can do the following:
 1. Continue a running game by clicking the green Play button
 2. Start a new game by clicking the new game button.

On the game screen, fill in the word you want to guess and submit it for check.
The new guess will be shown at the bottom of the guess list with a color code.<br>
Decoding the colors:
 1. Green - The letter is in it's correct place
 2. Yellow - The letter is corrent but placed wrong
 3. Gray - The letter isn't part of the word to guess

## Manual Controls
### API Calls
In case of need, one can navigate to [swagger](localhost:8000) to manually execute api calls

### PostgreSQL Management
Run the following command in terminal to access the db CLI tool
```bash
docker exec -it {...Container Name Here...} psql -U postgres wordle
```