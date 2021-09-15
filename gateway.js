const { composeAPI } = require('@iota/core');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const { channelRoot, createChannel, createMessage, parseMessage, mamAttach, mamFetch, mamFetchAll } = require('@iota/mam.js');
const fs = require('fs')
const file = require('fs').promises;

//Iota node
const api = composeAPI({ provider: "https://nodes.thetangle.org:443" });

//Uploads the current state of the sensor. 
const uploadState = async ()=>{
    //Settings 
    const seed = (await getSeed()).substring(0,81);
    const mode = 'public';
    const security = 2;
    const depth = 3;
    const MWM = 14; //Minimum weight magnitude
    const count = asciiToTrytes(getCount()); //Fetch the current sensor count
    
    console.log("Attaching message to tangle");
    var channelState = await getState(seed,security,mode);
    var mamMessage = createMessage(channelState, count);
    //const decodedMessage = parseMessage(mamMessage.payload, mamMessage.root);
    await mamAttach(api, mamMessage, depth, MWM)
    console.log("Attached, saving state.")
    saveState(channelState);
    var fetched = await mamFetch(api, mamMessage.root, mode)
    console.log(fetched);
}

//Looks for seed.txt for 81 Char seed.
const getSeed = ()=>{
    try{
	return fs.readFileSync('./seed.txt','utf8');
    }catch(e){
	
    }
    return null;
}

//Gets current person count
const getCount = ()=>{
    try{
	return fs.readFileSync('./count.txt','utf8');
    }catch(e){
	
    }
    return null;
}

//Save MAM channel state
const saveState = (channelState)=>{
    try{
	fs.writeFileSync('./channelState.json', JSON.stringify(channelState, undefined, "\t"));
    }catch (e) {
        console.log(e);
    }
}

//Get MAM channel state
const getState = (seed,security,mode)=>{
    try {
        const currentState = fs.readFileSync('./channelState.json');
        if (currentState) {
            return JSON.parse(currentState.toString());
        }
    }catch(e){
        console.log("No previous state.");
	return createChannel(seed, security, mode);
    }
    return null;
}
uploadState();

