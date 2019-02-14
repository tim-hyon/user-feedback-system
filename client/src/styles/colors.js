const hues = {
  red: 0,
  blue: 210,
  green: 150,
  gray: 0,
};

const getColor = (name, lightness = 80) => {
  const saturation = name === 'gray' ? 0 : 100;

  const hue = hues[name];

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default getColor;
