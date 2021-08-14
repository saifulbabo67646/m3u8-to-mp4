var fs = require("fs");
var path = require("path");
var m3u8ToMp4 = require("./index.js");
var converter = new m3u8ToMp4();

// var demoUrl = "https://content.jwplatform.com/manifests/yp34SRmf.m3u8";

// (async function() {
//   try {
//     console.log("Starting test...");

//     await converter
//       .setInputFile(demoUrl)
//       .setOutputFile("./download/dummy.mp4")
//       .start();

//     fs.unlinkSync("./download/dummy.mp4");

//     console.log("Success!");
//   } catch (error) {
//     throw new Error("Oops, an error occurred!", error);
//   }
// })();
const axios = require('axios');
// let url = 'https://www.reddit.com/r/PublicFreakout/comments/omhblx/people_evacuating_the_nationals_game_in_what/?utm_source=share&utm_medium=web2x&context=3'
// let firstPart = url.split('?')[0]
// console.log(firstPart);

const getUrl = async() => {
  try{
  let url = 'https://www.reddit.com/r/NatureIsFuckingLit/comments/p46mci/armadillo_playing_dead_in_the_garden/?utm_source=share&utm_medium=web2x&context=3'
  let firstPart = url.split('?')[0]
  let finalUrl = `${firstPart}.json`
  const res = await axios.get(finalUrl, {headers:{
    'User-agent': 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'
  }})
  let m3u8 = res.data[0].data.children[0].data.secure_media.reddit_video.hls_url;
  await converter
    .setInputFile(m3u8)
    .setOutputFile("./download/dummy.mp4")
    .start();
 
  console.log("File converted");
const absPath = path.resolve('./download/dummy.mp4')
console.log(absPath)
  }catch(err){
    console.log(err)
  }
}
getUrl()



// (async function() {
//   await converter
//     .setInputFile("https://v.redd.it/nrfma1dinvb71/HLSPlaylist.m3u8")
//     .setOutputFile("./download/dummy.mp4")
//     .start();
 
//   console.log("File converted");
// })();
