import {
  createFontStyle,
  createFontSizeStyle,
  createFontWeightStyle,
  createLineHeight,
  createFontFamily
} from './utils/typography';

const createFontFamilyRubik = () => createFontFamily('Rubik', true);

const typography = {
  button: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(14),
    createFontWeightStyle('400'),
    createLineHeight('21px')
  ),
  title: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(50),
    createFontWeightStyle('400'),
    createLineHeight('62px')
  ),
  body: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(16),
    createFontWeightStyle('400'),
    createLineHeight('24px')
  ),
  bodyLargeHighlight: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(18),
    createFontWeightStyle('700'),
    createLineHeight('21px')
  ),
  link: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(16),
    createFontWeightStyle('400'),
    createLineHeight('24px')
  ),
  field: createFontStyle(
    createFontFamilyRubik(),
    createFontSizeStyle(16),
    createFontWeightStyle('400'),
    createLineHeight('24px')
  )
};

export default typography;
