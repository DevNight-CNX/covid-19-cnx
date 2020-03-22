// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import Typography from './index';
// import { select } from '@storybook/addon-knobs';

// const tagOptions = {
//   'No Value': 'div',
//   h1: 'h1',
//   h2: 'h2',
//   h3: 'h3',
//   h4: 'h4',
//   h5: 'h5',
//   h6: 'h7',
//   div: 'div',
//   span: 'span',
//   p: 'p'
// };
// const variantOptions = {
//   'No Value': '',
//   headline: 'headline',
//   title: 'title',
//   subtitle: 'subtitle',
//   content: 'content',
//   button: 'button',
//   buttonlink: 'buttonlink',
//   body: 'body',
//   bodyHighlight: 'bodyHighlight',
//   bodyLarge: 'bodyLarge',
//   bodyLargeHighlight: 'bodyLargeHighlight',
//   bodySmall: 'bodySmall',
//   bodySmallHighlight: 'bodySmallHighlight',
//   caption: 'caption',
//   captionHighlight: 'captionHighlight',
//   link: 'link',
//   field: 'field'
// };
// const weightOptions = {
//   'No Value': '',
//   normal: 'normal',
//   bold: 'bold',
//   400: '400',
//   700: '700'
// };
// const alignItemsOptions = {
//   'No Value': 'center',
//   stretch: 'stretch',
//   center: 'center',
//   flexStart: 'flex-start',
//   flexEnd: 'flex-end',
//   baseline: 'baseline',
//   initial: 'initial',
//   inherit: 'inherit'
// };
// const justifiContentOptions = {
//   'No Value': 'normal',
//   center: 'center',
//   flexStart: 'flex-start',
//   flexEnd: 'flex-end',
//   spaceBetween: 'space-between',
//   spaceAround: 'space-around',
//   initial: 'initial',
//   inherit: 'inherit'
// };
// storiesOf('Typography', module)
//   .add('Normal', () => {
//     return (
//       <Typography
//         tag={select('Tag', tagOptions, 'div')}
//         variant={select('Variant', variantOptions, '')}
//         weight={select('Weight', weightOptions, '')}
//         alignItems={select('Align items', alignItemsOptions, '')}
//         justifiContent={select('Justifi content', justifiContentOptions, '')}
//       >
//         Ihre Zahlung
//       </Typography>
//     );
//   })
//   .add('Examples', () => (
//     <>
//       <Typography variant="headline">Ihre Zahlung</Typography>
//       <Typography variant="title">Ihre Zahlung</Typography>
//       <Typography variant="subtitle">Ihre Zahlung</Typography>
//       <Typography variant="body">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>
//       <Typography variant="body1">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>
//       <Typography variant="body2">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>
//       <Typography variant="caption">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>

//       <Typography tag="h1">Ihre Zahlung</Typography>
//       <Typography tag="h2">Ihre Zahlung</Typography>
//       <Typography tag="h3">Ihre Zahlung</Typography>
//       <Typography tag="h4">Ihre Zahlung</Typography>
//       <Typography tag="h5">Ihre Zahlung</Typography>
//       <Typography tag="h6">Ihre Zahlung</Typography>
//       <Typography tag="h2" variant="headline">
//         Ihre Zahlung
//       </Typography>
//       <Typography variant="title">Ihre Zahlung</Typography>
//       <Typography tag="div">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>
//       <Typography tag="span" variant="caption">
//         10% Cashback bei jeder Buchung über Motel One via Paylo
//       </Typography>
//       <Typography tag="h1" weight="400">
//         Ihre Zahlung
//       </Typography>
//     </>
//   ));
