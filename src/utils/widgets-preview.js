import { deepClone } from "@/utils/util"

const widgetPropsForDetectChanges = {
  input: { defaultValue: '' },
  textarea: { defaultValue: '' },
  number: { defaultValue: 0 },
  radio: { defaultValue: null },
  checkbox: { defaultValue: [] },
  select: { defaultValue: '' },
  time: { defaultValue: null },
  'time-range': { defaultValue: null },
  date: { defaultValue: null },
  'date-range': { defaultValue: null },
  switch: { defaultValue: null },
  rate: { defaultValue: null },
  color: { defaultValue: null },
  slider: {},
  'static-text': { textContent: 'static text' },
  'html-text': { htmlContent: '<b>html text</b>' },
  button: { label: 'button', type: '' },
  divider: { label: '' },
  'picture-upload': { uploadURL: '' },
  'file-upload': { uploadURL: '' },
  'rich-editor': {},
  'cascader': { defaultValue: '' }
}
export const unfilledWidgetPropsDefaultData = {
  input: { defaultValue: 'test text' },
  checkbox: { defaultValue: [1] },
  button: { label: 'custom label', type: 'success' },
  time: { defaultValue: '16:04:48' },
}
export function fillUnfilledWidgetPropsForPreview(widgets, unfilledWidgetPropsData) {
  return deepClone(widgets).map((widget) => {
    const widgetPropsForDetect = widgetPropsForDetectChanges[widget.type]
    Object.keys(widgetPropsForDetect).forEach((widgetProp) => {
      if(
        unfilledWidgetPropsData[widget.type]
        &&
        JSON.stringify(widget.options[widgetProp]) === JSON.stringify(widgetPropsForDetect[widgetProp])
      ) {
        widget.options[widgetProp] = unfilledWidgetPropsData[widget.type][widgetProp]
      }
    })
    return widget
  });
}
