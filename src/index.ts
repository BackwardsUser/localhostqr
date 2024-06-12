#! /usr/bin/env node
import { networkInterfaces, platform } from 'node:os';
import { exec } from 'node:child_process';
import { program } from 'commander';
import { join } from 'node:path';
import { toFile } from 'qrcode';
import { existsSync, mkdir, mkdirSync, readdirSync } from 'node:fs';

const outputFile = join(__dirname, 'qr', 'localhost.png');

const validAdapters = [
  "Wi-Fi", // Windows Wi-Fi
  "eth", // Windows Ethernet
  "wlan0", // Kali Linux
  "wlo1", // Arch Linux
]

function httpify(host: string, port: number): string {
  return `http://${host}:${port}`;
}

function getNets(): Promise<any> {
  return new Promise((res, rej) => {
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
      const netName = nets[name];
      if (!netName) continue;
      for (const net of netName) {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }

    res(results);
  })
}

async function generateQR(port: number) {
  const results: any = await getNets();
  let ip;
  for (var adapter of validAdapters) {
    if (results[adapter] != undefined) {
      ip = results[adapter];
      break;
    }
  }
  if (!ip) {
    console.log("Cannot find an IP.")
    return;
  }

  if (!existsSync(join(__dirname, "qr"))) {
    mkdirSync(join(__dirname, "qr"));
  }

  const url = httpify(ip, port);
  console.log(`Got IP ${url}.`);

  toFile(outputFile, url, function (error) {
    if (error) console.error(error);
    console.log('Successfully wrote file.')
    // let platform = () => { return "none" } // For testing.
    if (platform() == "win32") {
      exec(`start ${outputFile}`, (err, output) => {
        if (err) {
          console.error("Could not execute the command: ", err);
          return;
        }
      });
    } else if (platform() == "linux") {
      exec(`xdg-open ${outputFile}`, (err, output) => {
        if (err) {
          console.error("Could not execute the command: ", err);
          console.log(`Your distribution doesn't support the "xdg-open" command. You can find it here: ${outputFile}`);
        }
      });
    } else {
      console.log(`Successfully Created the file at: ${outputFile}`);
    }
  });
}

function main() {
  program
    .arguments('<port>')
    .description("Gets the QR Code for the local device IP with the given port.\nUsed for easy web testing on the go.")
    .action((port) => {
      generateQR(parseInt(port) || 3000);
    });

  program.parse(process.argv);
}

main()