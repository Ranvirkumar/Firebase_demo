import {  Platform } from 'react-native';

export { default as Menu } from './../../assets/Menu.jpg';
export { default as Left } from './../../assets/Left-arrow.jpg';
export { default as Close } from './../../assets/close.png';


export const platform = Platform.OS;
export const website = platform === 'web';
