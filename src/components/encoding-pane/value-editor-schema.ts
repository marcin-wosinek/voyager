import {Channel, COLOR, SHAPE, SIZE, TEXT} from "vega-lite/build/src/channel";
import {CIRCLE, POINT, RECT, SQUARE} from "vega-lite/build/src/mark";
import {ShelfId, ShelfMark, ShelfValueDef} from "../../models";
import {
  generateColorPickerSchema, generateSelectSchema,
  generateSliderSchema, generateTextBoxSchema
} from "./property-editor-schema";

const SHAPE_VALUES = ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-down', ];
const defaultSymbolSize = 30;
const defaultColor = '#4c78a8';
const defaultTextFontSize = 11;

const MARK_DEFAULT_INDEX = {
  [SIZE]: {
    [POINT]: defaultSymbolSize,
    [CIRCLE]: defaultSymbolSize,
    [SQUARE]: defaultSymbolSize,
    [RECT]: defaultSymbolSize,
    [TEXT]: defaultTextFontSize
  },
  [SHAPE]: CIRCLE,
  [COLOR]: defaultColor,
};

export function getDefaultsForChannel(channel: Channel, mark: ShelfMark) {
  return channel === SIZE ? MARK_DEFAULT_INDEX[channel][mark] : MARK_DEFAULT_INDEX[channel];
}

export function generateValueDefFormData(shelfId: ShelfId, valueDef: ShelfValueDef) {
  return {[shelfId.channel.toString()]: valueDef ? valueDef.value : undefined};
}

export function generateValueEditorSchema(channel: Channel): any {
  switch (channel) {
    case 'color':
      return generateColorPickerSchema(channel, 'Color Value');
    case 'shape':
      return generateSelectSchema(channel, SHAPE_VALUES, 'Shape Value');
    case 'text':
      return generateTextBoxSchema(channel, 'Some Text...', undefined, 'string');
    case 'size':
      return generateSliderSchema(channel, 1, 100, 'Size Value');
    default:
      return {};
  }
}
