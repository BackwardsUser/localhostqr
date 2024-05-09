# Localhost QR
> Get a QR code that will open your local web server.
> Great for testing your webpages on Mobile.

## Install
```sh
npm i -g localhostqr@latest
```

## Usage
```sh
getqr <port> # The port would be the open web server port.
```

## Example
```sh
getqr 3000
```

This will take your LAN IP,  add "http://" to the beginning and add your port to the end. It'll then return the URL as a QR code.

## Important Notes
This tool has no implementation in code, it is purely a CLI tool.

## Contributing
This project isn't on GitHub yet, if you'd like to contribute a change in code, feel free to [join the Discord](https://discord.gg/Zhq9yjhHKr)!

## License
Copyright © 2024 [BackwardsUser](https://github.com/BackwardsUser).  
This Project is licensed under the [MIT](https://www.tldrlegal.com/license/mit-license) License.