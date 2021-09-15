# Summary

A basic utility for a MAM channel using a sonic sensor.

# Table of Contents

 - `distance.py`: Calulates the distnace from a sonic sensor and if it is within a threshold it activates `count.py` to upload to the IOTA ledger.
 - `count.py`: Controls the `count.txt` file with a get and set fucntion (`getCount()`, `setCount(count)`). If the count is within a certain threshold it will upload `count.txt` onto the IOTA Ledger in `uploadCount()`.
 - `gateway.js`: MAM controller with the latest version of MAM. Will collect the seed form `seed.txt` and the data from `count.txt` and upload it to the ledger.
 - `chanelState.json`: Stores the state of the MAM channel to keep it in a chain. `gateway.js` will update this periodically.
 - `seed.txt`: Your seed for the data, please generate a new seed securly. 
 - `npm-shrinkwrap.json`: From `npm shrink` used to store the NPM packages. Use `npm install` to install the required node packages.

# Dependency Installation

Run 

    npm install

To install the node.js dependencies. The python dependencies are `RPi.GPIO` and `signal` for `distance.py`.

# Basic Test

After installation simply run

    python count.py
	
To test that you can successfully create the count file and upload to the MAM stream.

# Notes

Please update the `seed.txt` to something completly random. Reset `count.txt` back to zero. Update this code really to suite your needs. 
