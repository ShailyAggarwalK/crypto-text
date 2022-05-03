1. Tried github action with npm start but that means workflow will continuosly run so better is deploy react app using bundled code and with a server (eg: aws)
2. Or referring to <a>https://codeburst.io/deploying-a-react-app-using-github-pages-and-github-actions-7fc14d380796</a>, we can use peaceiris/actions-gh-pages@v3 to deploy static field (bundle) to gh pages. 
3. Since create-react-app script already comes with dotenv bundled, we just create .env file and declare variables with prefix REACT_APP_ . Then node can access normally (eg: process.env.REACT_APP_VAR)
4. Above step done using create env file in github actions.

App Link -> https://shailyaggarwalk.github.io/crypto-text/
