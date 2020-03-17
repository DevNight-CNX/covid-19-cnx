const provideVariant = (propName, variants = {}, defaultValue = '') => {
  return (props = {}) => {
    const variantProp = props[propName];
    if (!variantProp) {
      return defaultValue;
    }

    return variants[variantProp] || defaultValue;
  };
};

export default provideVariant;
