export const createFontSizeStyle = size => () => `
    font-size: ${size}px;
`;

export const createFontWeightStyle = weight => () => `
    font-weight: ${weight};
`;

export const createLineHeight = lineheight => () =>
  `line-height: ${lineheight};`;

export const createLetterSpacing = letterSpacing => () =>
  `letter-spacing: ${letterSpacing};`;

export const createFontStyle = (...fontStyleFns) => () => `
    ${fontStyleFns.map(fontStyleFn => fontStyleFn()).join('')}
`;

export const createFontFamily = (fontFamily, isDefaultFont = true) => () =>
  `font-family: ${fontFamily} ${isDefaultFont ? ', sans-serif' : ''};`;
