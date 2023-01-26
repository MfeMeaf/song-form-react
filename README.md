## Spotify Search with Embed.

This projekt was for learning how to work with React.JS

## Want to use this projekt? Follow the steps below

First of you need to login and get a token from the (Spotify Developer Dasboard)[https://developer.spotify.com/dashboard/login]

Once you've logged in create a new app and view your client ID

If you specifically wan't to be able to search as I do in this projekt you can see the means to do that here.
(Spotify documentation Search/v1)[https://developer.spotify.com/console/get-search-item/]

To be able to use fetch as I do you need to verify the token so scroll down to OAuth Token and paste your client Secret in there and press "Get Token".
It will prompt you to log in and once you've done that you can highlight the text in OAuth Token and copy it into your programs code.

This will go into the fetch part inside the Form component.
```js
fetch(`https://api.spotify.com/v1/search?q=${event.target.songN.value}&type=track&limit=10&offset=5`, {
        method: "GET",
        headers: {
            Authorization: "Bearer 'Token goes here'"
        }
    })
    .then(response => response.json())
    .then(({tracks}) => {
```

Now the program should work without any problems.