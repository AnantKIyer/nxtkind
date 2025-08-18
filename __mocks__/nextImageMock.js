const NextImage = ({ src, alt = '', ...props }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === 'string' ? src : ''} alt={alt} {...props} />;
};

module.exports = NextImage;
