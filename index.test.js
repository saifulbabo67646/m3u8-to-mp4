var fs = require("fs");
var path = require("path");
var m3u8ToMp4 = require("./index.js");
var converter = new m3u8ToMp4();

const axios = require('axios');

const getUrl = async (redditUrl) => {
  try {
    let url = redditUrl
    let firstPart = url.split('?')[0]
    let videoUrlArr = firstPart.split('/')
    let videoName =  videoUrlArr[videoUrlArr.length - 2]
    let finalUrl = `${firstPart}.json`
    const res = await axios.get(finalUrl, {
      headers: {
        'User-agent': 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'
      }
    })
    let m3u8 = res.data[0].data.children[0].data.secure_media.reddit_video.hls_url;
    console.log(m3u8)
   let newRes = await converter
      .setInputFile(m3u8)
      .setOutputFile(`./download/${videoName}.mp4`)
      .start({
        onStart: () => console.log('on start'),
        onEnd: () => console.log('on end'),
        onError: error => console.error(`on error: ${error.message}`),
        onProgress: () => console.log('on progress'),
        onStderr: (stderrLine) => console.log(`on stderr: ${stderrLine}`),
        onCodecData: () => console.log('on codecdata'),
      })
      // fs.unlinkSync(`./download/${videoName}.mp4`);
      // console.log(newRes)
    console.log("File converted");
    // const absPath = path.resolve(`./download/${videoName}.mp4`)
    // return absPath
  } catch (err) {
    console.log(err)
    // return err
  }
}
getUrl('https://www.reddit.com/r/TikTokCringe/comments/ppzn4s/12_year_olds_discussions_while_playing_warzone/?utm_source=share&utm_medium=web2x&context=3')

// module.exports = getUrl