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
Feel free to contribute as you feel necessary.  
If you have an issue, feel free to open an [issue](https://github.com/BackwardsUser/localhostqr/issues)  
If you'd like to donate your unique OS, [join the Discord](https://discord.gg/Zhq9yjhHKr) and ask to become a tester.  
Any thoughts on optimizations, feel free to open a [pull request](https://github.com/BackwardsUser/localhostqr/pulls)


## License
Copyright © 2024 [BackwardsUser](https://github.com/BackwardsUser).  
This Project is licensed under the [MIT](https://www.tldrlegal.com/license/mit-license) License.