// Comprehensive Indian Sign Language (ISL) Photographic & Real Character Image Database
// 100% Photographic & Character demonstration images matching Hana avatar (No vector SVG illustrations)

import imgA from '../../images/A.jpeg';
import imgB from '../../images/B.jpeg';
import imgC from '../../images/C.jpeg';
import imgD from '../../images/D.jpeg';
import imgE from '../../images/E.jpeg';
import imgF from '../../images/F.jpeg';
import imgG from '../../images/G.jpeg';
import imgH from '../../images/H.jpeg';
import imgIJ from '../../images/I&J.jpeg';
import imgK from '../../images/K.jpeg';
import imgL from '../../images/L.jpeg';
import imgM from '../../images/M.jpeg';
import imgN from '../../images/N.jpeg';
import imgO from '../../images/O.jpeg';
import imgP from '../../images/P.jpeg';
import imgQ from '../../images/Q.jpeg';
import imgR from '../../images/R.jpeg';
import imgS from '../../images/S.png';
import imgT from '../../images/T.jpeg';
import imgV from '../../images/V.jpeg';
import imgW from '../../images/W.jpeg';
import imgX from '../../images/X.jpeg';
import imgZ from '../../images/Z.jpeg';

import img1 from '../../images/1.png';
import img2 from '../../images/2.png';
import img9 from '../../images/9.png';
import img10 from '../../images/10.png';

import imgNamaste from '../../images/Namaste.png';
import imgHelloHD from '../../images/Hello_HD.png';
import imgHello from '../../images/Hello.jpeg';
import imgGoodMorning from '../../images/Good morning.jpeg';
import imgHowAreYou from '../../images/How are you.jpeg';
import imgThankYouHD from '../../images/ThankYou_HD.png';
import imgThankYou from '../../images/Thank you.jpeg';
import imgPlease from '../../images/Please.jpeg';
import imgSorry from '../../images/Sorry.jpeg';
import imgYes from '../../images/Yes.jpeg';
import imgNo from '../../images/No.jpeg';
import imgILoveYouHD from '../../images/ILoveYou_HD.png';
import imgILoveYou from '../../images/I love you.jpeg';
import imgNiceToMeetYou from '../../images/Nice to meet you.jpeg';

import imgLearn from '../../images/Learn.png';
import imgMyNameIs from '../../images/My name is.jpeg';
import imgHappy from '../../images/Happy.png';
import imgHelpHD from '../../images/Help_HD.png';
import imgFriendHD from '../../images/Friend_HD.png';
import imgPleasedToKnow from '../../images/Pleased to know.jpeg';
import imgAvatar from '../../Avatar_image.jpeg';
import gestureGuideImg from '../../gesture.jpeg';
import azChartImg from '../../A-Z.jpeg';

import { getCachedCrop, getSheetCropSvg } from '../utils/cropGenerator';

// Real photographic panel crops for numbers 3-8 & missing letters
const photoNum3 = getSheetCropSvg(gestureGuideImg, 2, 0);
const photoNum4 = getSheetCropSvg(gestureGuideImg, 3, 0);
const photoNum5 = getSheetCropSvg(gestureGuideImg, 0, 1);
const photoNum6 = getSheetCropSvg(gestureGuideImg, 1, 1);
const photoNum7 = getSheetCropSvg(gestureGuideImg, 2, 1);
const photoNum8 = getSheetCropSvg(gestureGuideImg, 3, 1);

const photoLetterU = getSheetCropSvg(azChartImg, 2, 4);
const photoLetterY = getSheetCropSvg(azChartImg, 2, 5);

const getSignAsset = (key, defaultAsset) => {
  const cached = getCachedCrop(key);
  if (cached) return cached;
  return defaultAsset;
};

export const SIGN_IMAGES = {
  // --- 1. ALPHABET (A - Z) ---
  'A': imgA,
  'B': imgB,
  'C': imgC,
  'D': imgD,
  'E': imgE,
  'F': imgF,
  'G': imgG,
  'H': imgH,
  'I': getSignAsset('I', imgIJ),
  'J': getSignAsset('J', imgIJ),
  'K': imgK,
  'L': imgL,
  'M': imgM,
  'N': imgN,
  'O': imgO,
  'P': imgP,
  'Q': imgQ,
  'R': imgR,
  'S': imgS,
  'T': imgT,
  'U': getSignAsset('U', photoLetterU),
  'V': imgV,
  'W': imgW,
  'X': imgX,
  'Y': getSignAsset('Y', photoLetterY),
  'Z': imgZ,

  // --- 2. NUMBERS (1 - 10) ---
  '1': img1,
  '2': img2,
  '3': getSignAsset('3', photoNum3),
  '4': getSignAsset('4', photoNum4),
  '5': getSignAsset('5', photoNum5),
  '6': getSignAsset('6', photoNum6),
  '7': getSignAsset('7', photoNum7),
  '8': getSignAsset('8', photoNum8),
  '9': img9,
  '10': img10,

  // --- 3. GREETINGS & COURTESY ---
  'NAMASTE': imgNamaste,
  'HELLO': imgHelloHD || imgHello,
  'GOOD MORNING': imgGoodMorning,
  'HOW ARE YOU': imgHowAreYou,
  'THANK YOU': imgThankYouHD || imgThankYou,
  'PLEASE': imgPlease,
  'SORRY': imgSorry,
  'YES': imgYes,
  'NO': imgNo,
  'I LOVE YOU': imgILoveYouHD || imgILoveYou,
  'NICE TO MEET YOU': imgNiceToMeetYou,

  // --- 4. CONVERSATIONAL PHRASES ---
  'LEARN ISL': imgLearn,
  'MY NAME IS': imgMyNameIs,
  'HAPPY': imgHappy,
  'HELP': imgHelpHD,
  'FRIEND': imgFriendHD,
  'PLEASED TO KNOW': imgPleasedToKnow,

  // --- 5. ISL CURRICULUM ID MAPPINGS ---
  'isl-a': imgA,
  'isl-b': imgB,
  'isl-c': imgC,
  'isl-d': imgD,
  'isl-e': imgE,
  'isl-f': imgF,
  'isl-g': imgG,
  'isl-h': imgH,
  'isl-i': getSignAsset('I', imgIJ),
  'isl-j': getSignAsset('J', imgIJ),
  'isl-k': imgK,
  'isl-l': imgL,
  'isl-m': imgM,
  'isl-n': imgN,
  'isl-o': imgO,
  'isl-p': imgP,
  'isl-q': imgQ,
  'isl-r': imgR,
  'isl-s': imgS,
  'isl-t': imgT,
  'isl-u': getSignAsset('U', photoLetterU),
  'isl-v': imgV,
  'isl-w': imgW,
  'isl-x': imgX,
  'isl-y': getSignAsset('Y', photoLetterY),
  'isl-z': imgZ,

  'isl-1': img1,
  'isl-2': img2,
  'isl-3': getSignAsset('3', photoNum3),
  'isl-4': getSignAsset('4', photoNum4),
  'isl-5': getSignAsset('5', photoNum5),
  'isl-6': getSignAsset('6', photoNum6),
  'isl-7': getSignAsset('7', photoNum7),
  'isl-8': getSignAsset('8', photoNum8),
  'isl-9': img9,
  'isl-10': img10,

  'isl-namaste': imgNamaste,
  'isl-hello': imgHelloHD || imgHello,
  'isl-good-morning': imgGoodMorning,
  'isl-how-are-you': imgHowAreYou,
  'isl-thank-you': imgThankYouHD || imgThankYou,
  'isl-please': imgPlease,
  'isl-sorry': imgSorry,
  'isl-yes': imgYes,
  'isl-no': imgNo,
  'isl-iloveyou': imgILoveYouHD || imgILoveYou,
  'isl-nice-to-meet-you': imgNiceToMeetYou,

  'isl-learn-isl': imgLearn,
  'isl-my-name-is': imgMyNameIs,
  'isl-happy': imgHappy,
  'isl-help': imgHelpHD,
  'isl-friend': imgFriendHD,
  'isl-pleased-to-know': imgPleasedToKnow,

  // --- 6. LEGACY ASL COMPATIBILITY ALIASES ---
  'asl-a': imgA,
  'asl-b': imgB,
  'asl-c': imgC,
  'asl-d': imgD,
  'asl-e': imgE,
  'asl-f': imgF,
  'asl-g': imgG,
  'asl-h': imgH,
  'asl-i': getSignAsset('I', imgIJ),
  'asl-j': getSignAsset('J', imgIJ),
  'asl-k': imgK,
  'asl-l': imgL,
  'asl-m': imgM,
  'asl-n': imgN,
  'asl-o': imgO,
  'asl-p': imgP,
  'asl-q': imgQ,
  'asl-r': imgR,
  'asl-s': imgS,
  'asl-t': imgT,
  'asl-u': getSignAsset('U', photoLetterU),
  'asl-v': imgV,
  'asl-w': imgW,
  'asl-x': imgX,
  'asl-y': getSignAsset('Y', photoLetterY),
  'asl-z': imgZ,
  'asl-good-morning': imgGoodMorning,
  'asl-hello': imgHelloHD || imgHello,
  'asl-how-are-you': imgHowAreYou,
  'asl-iloveyou': imgILoveYouHD || imgILoveYou,
  'asl-my-name-is': imgMyNameIs,
  'asl-nice-to-meet-you': imgNiceToMeetYou,
  'asl-no': imgNo,
  'asl-please': imgPlease,
  'asl-pleased-to-know': imgPleasedToKnow,
  'asl-sorry': imgSorry,
  'asl-thank-you': imgThankYouHD || imgThankYou,
  'asl-yes': imgYes,
};

// Safe and resilient photographic image resolver
export const getSignImage = (signOrId) => {
  if (!signOrId) return imgAvatar;

  if (typeof signOrId === 'object') {
    if (signOrId.image) return signOrId.image;
    if (signOrId.sign) {
      const key = String(signOrId.sign).toUpperCase();
      if (SIGN_IMAGES[key]) return SIGN_IMAGES[key];
      const crop = getCachedCrop(key);
      if (crop) return crop;
    }
    if (signOrId.id) {
      const key = String(signOrId.id).toLowerCase();
      if (SIGN_IMAGES[key]) return SIGN_IMAGES[key];
    }
    return imgAvatar;
  }

  const str = String(signOrId).trim();
  const direct = SIGN_IMAGES[str] || SIGN_IMAGES[str.toUpperCase()] || SIGN_IMAGES[str.toLowerCase()];
  if (direct) return direct;

  const crop = getCachedCrop(str);
  if (crop) return crop;

  return imgAvatar;
};
