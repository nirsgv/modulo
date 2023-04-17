import { v4 as uuidv4 } from "uuid";
export class Pattern {
  constructor({ name, uid }) {
    this.name = name || `Untitled ${uuidv4()}`;
    this.uid = uid || uuidv4();
    this.bars = 4;
    this.tracks = [new Track()];
  }

  getUid() {
    return this.uid;
  }
}

export class Track {
  constructor( name = "", uid = "" ) {
    this.name = name || uuidv4();
    this.uid = uid || uuidv4();
    this.defaultMidiChannel = 1;
    this.defaultMidiInput = null;
    this.defaultMidiOutput = null;
    this.noteEvents = {};
  }

  getUid() {
    return this.uid;
  }
}

export const SIXTEENTH = 4 ** 2;
export const SIXTYFOURTH = 4 ** 3;
export const TWOFIFTYSIXTH = 4 ** 4;
export const TENTWENTYFOURTH = 4 ** 5;

export const generateGrid = () => {
  return {};
};
