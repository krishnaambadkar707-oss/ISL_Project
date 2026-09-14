// Mapping of specific Sign Language Images from the images directory

import imgA from '../../images/A.jpeg';
import imgB from '../../images/B.jpeg';
import imgC from '../../images/C.jpeg';
import imgD from '../../images/D.jpeg';
import imgE from '../../images/E.jpeg';
import imgF from '../../images/F.jpeg';
import imgG from '../../images/G.jpeg';
import imgGoodMorning from '../../images/Good morning.jpeg';
import imgH from '../../images/H.jpeg';
import imgHello from '../../images/Hello.jpeg';
import imgHowAreYou from '../../images/How are you.jpeg';
import imgILoveYou from '../../images/I love you.jpeg';
import imgIJ from '../../images/I&J.jpeg';
import imgK from '../../images/K.jpeg';
import imgL from '../../images/L.jpeg';
import imgM from '../../images/M.jpeg';
import imgMyNameIs from '../../images/My name is.jpeg';
import imgN from '../../images/N.jpeg';
import imgNiceToMeetYou from '../../images/Nice to meet you.jpeg';
import imgNo from '../../images/No.jpeg';
import imgO from '../../images/O.jpeg';
import imgP from '../../images/P.jpeg';
import imgPlease from '../../images/Please.jpeg';
import imgPleasedToKnow from '../../images/Pleased to know.jpeg';
import imgQ from '../../images/Q.jpeg';
import imgR from '../../images/R.jpeg';
import imgSorry from '../../images/Sorry.jpeg';
import imgT from '../../images/T.jpeg';
import imgThankYou from '../../images/Thank you.jpeg';
import imgV from '../../images/V.jpeg';
import imgW from '../../images/W.jpeg';
import imgX from '../../images/X.jpeg';
import imgYes from '../../images/Yes.jpeg';
import imgZ from '../../images/Z.jpeg';

export const SIGN_IMAGES = {
  // Alphabet
  'A': imgA,
  'B': imgB,
  'C': imgC,
  'D': imgD,
  'E': imgE,
  'F': imgF,
  'G': imgG,
  'H': imgH,
  'I': imgIJ,
  'J': imgIJ,
  'K': imgK,
  'L': imgL,
  'M': imgM,
  'N': imgN,
  'O': imgO,
  'P': imgP,
  'Q': imgQ,
  'R': imgR,
  'T': imgT,
  'V': imgV,
  'W': imgW,
  'X': imgX,
  'Z': imgZ,

  // Greetings & Phrases
  'GOOD MORNING': imgGoodMorning,
  'HELLO': imgHello,
  'HOW ARE YOU': imgHowAreYou,
  'I LOVE YOU': imgILoveYou,
  'MY NAME IS': imgMyNameIs,
  'NICE TO MEET YOU': imgNiceToMeetYou,
  'NO': imgNo,
  'PLEASE': imgPlease,
  'PLEASED TO KNOW': imgPleasedToKnow,
  'SORRY': imgSorry,
  'THANK YOU': imgThankYou,
  'YES': imgYes,

  // ID Aliases
  'asl-a': imgA,
  'asl-b': imgB,
  'asl-c': imgC,
  'asl-d': imgD,
  'asl-e': imgE,
  'asl-f': imgF,
  'asl-g': imgG,
  'asl-h': imgH,
  'asl-i': imgIJ,
  'asl-j': imgIJ,
  'asl-k': imgK,
  'asl-l': imgL,
  'asl-m': imgM,
  'asl-n': imgN,
  'asl-o': imgO,
  'asl-p': imgP,
  'asl-q': imgQ,
  'asl-r': imgR,
  'asl-t': imgT,
  'asl-v': imgV,
  'asl-w': imgW,
  'asl-x': imgX,
  'asl-z': imgZ,
  'asl-good-morning': imgGoodMorning,
  'asl-hello': imgHello,
  'asl-how-are-you': imgHowAreYou,
  'asl-iloveyou': imgILoveYou,
  'asl-my-name-is': imgMyNameIs,
  'asl-nice-to-meet-you': imgNiceToMeetYou,
  'asl-no': imgNo,
  'asl-please': imgPlease,
  'asl-pleased-to-know': imgPleasedToKnow,
  'asl-sorry': imgSorry,
  'asl-thank-you': imgThankYou,
  'asl-yes': imgYes,
};

export const getSignImage = (signOrId) => {
  if (!signOrId) return null;
  if (typeof signOrId === 'object') {
    if (signOrId.image) return signOrId.image;
    return SIGN_IMAGES[signOrId.sign] || SIGN_IMAGES[signOrId.id] || null;
  }
  return SIGN_IMAGES[signOrId] || SIGN_IMAGES[signOrId.toUpperCase()] || null;
};
