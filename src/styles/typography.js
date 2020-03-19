import {
  createFontStyle,
  createFontSizeStyle,
  createFontWeightStyle,
  createLineHeight,
  createFontFamily
} from './utils/typography';

const createFontFamilyKanit = () => createFontFamily('Kanit', true);

const typography = {
  headline: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(40),
    createFontWeightStyle('500'),
    createLineHeight('52px')
  ),
  title: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(32),
    createFontWeightStyle('500'),
    createLineHeight('42px')
  ),
  subtitle: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(24),
    createFontWeightStyle('500'),
    createLineHeight('31px')
  ),
  content: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(14),
    createFontWeightStyle('300'),
    createLineHeight('18px')
  ),
  button: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(18),
    createFontWeightStyle('600'),
    createLineHeight('21px')
  ),
  buttonlink: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(14),
    createFontWeightStyle('600'),
    createLineHeight('17px')
  ),
  body: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(14),
    createFontWeightStyle('300'),
    createLineHeight('18px')
  ),
  bodyHighlight: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(14),
    createFontWeightStyle('600'),
    createLineHeight('18px')
  ),
  bodyLarge: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(16),
    createFontWeightStyle('300'),
    createLineHeight('21px')
  ),
  bodyLargeHighlight: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(16),
    createFontWeightStyle('600'),
    createLineHeight('22px')
  ),
  caption: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(10),
    createFontWeightStyle('300'),
    createLineHeight('13px')
  ),
  captionHighlight: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(10),
    createFontWeightStyle('600'),
    createLineHeight('13px')
  ),
  link: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(12),
    createFontWeightStyle('300'),
    createLineHeight('16px')
  ),
  field: createFontStyle(
    createFontFamilyKanit(),
    createFontSizeStyle(14),
    createFontWeightStyle('300'),
    createLineHeight('17px')
  )
};

export default typography;
