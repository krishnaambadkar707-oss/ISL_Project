import React from 'react';
import Hana2DGestureAvatar from './Hana2DGestureAvatar';

export default function AvatarDisplay({
  currentSign,
  isSpeaking,
  speechText,
  slowMotion = false,
  onToggleSlowMotion
}) {
  return (
    <Hana2DGestureAvatar
      currentSign={currentSign}
      isSpeaking={isSpeaking}
      speechText={speechText}
      slowMotion={slowMotion}
      onToggleSlowMotion={onToggleSlowMotion}
    />
  );
}
