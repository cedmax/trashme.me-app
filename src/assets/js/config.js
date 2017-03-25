
function getAvailableShortcuts(){
  const availableShortcuts = ['\'', '<','>','?',':','|','}','{','_','+','-','=','§','!','@','£','$','%','^','&','*','(',')','`','~','}','"',',','.','/',';','[',']'];

  let i = 97;
  while (i<123) {
    availableShortcuts.push(String.fromCharCode(i).toUpperCase());
    i++;
  }

  i = 0;
  while (i<10) {
    availableShortcuts.push(i+'');
    i++;
  } 

  availableShortcuts.push('Cmd');
  availableShortcuts.push('Ctrl');
  availableShortcuts.push('Alt');
  availableShortcuts.push('Option');
  availableShortcuts.push('AltGr');
  availableShortcuts.push('Shift');
  availableShortcuts.push('Super');
  availableShortcuts.push('Plus');
  availableShortcuts.push('Space');
  availableShortcuts.push('Tab');
  availableShortcuts.push('Backspace');
  availableShortcuts.push('Delete');
  availableShortcuts.push('Insert');
  availableShortcuts.push('Enter');
  availableShortcuts.push('Up');
  availableShortcuts.push('Down');
  availableShortcuts.push('Left');
  availableShortcuts.push('Right');
  availableShortcuts.push('Home');
  availableShortcuts.push('End');
  availableShortcuts.push('PageUp');
  availableShortcuts.push('PageDown');
  availableShortcuts.push('Esc');
  availableShortcuts.push('VolumeUp');
  availableShortcuts.push('VolumeDown');
  availableShortcuts.push('VolumeMute');
  availableShortcuts.push('MediaNextTrack');
  availableShortcuts.push('MediaPreviousTrack');
  availableShortcuts.push('MediaStop');
  availableShortcuts.push('MediaPlayPause');
  availableShortcuts.push('PrintScreen');
  return availableShortcuts;
}

export const availableShortcuts = getAvailableShortcuts();