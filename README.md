## Five in a row

***Update 18.06.2023***
I performed a lot of optimization in the logic and data structure. It became a mix of OOP and FP, besides all the components were transformed into TypeScript. The original first react-jsx FP prototype is still available in the branch: "version-fp-jsx".

***Description***
The React-Typescript implementation of the famous and super classic board game. Two players can and must play simultaneously, there is no computer player included. You can register easily or if you don't want to, test accounts are also available to use:

 - email: test1@test.com, password: test1pw
 - email: test2@test.com, password: test2pw

The whole authentication is supported by firebase. Local storage helps the users to stay logged in and store their game settings. The application is responsive so it can be played on mobile phones and tablets as well. Please note that the interface is not fully optimised yet for mobile devices.

First concept in Figma:
https://www.figma.com/file/744TFYjpDhno46Ek3cVS7y/Five-in-a-Row?type=design&node-id=0%3A1&t=OEQXCdtQoWLQviCy-1

URL:
https://react-five-in-a-row.web.app/

***Game features:***
 - 2 (human) players
 - 4 board sizes: 10x10, 15x15, 19x19, 24x24
 - player customizing:
	 - players colors
	 - in addition to traditional symbols (circle and cross), unique figures can also be selected
	 - usernames can be modified freely

***Stacks:***
 - HTML
 - SCSS
 - Bootstrap
 - React
 - React Router
	- TypeScript
 - Firebase (auth and hosting)
	- OOP

***Start with NPM***
1. cd frontend
2. npm install
3. npm start