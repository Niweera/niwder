const changeColor = () => {
  const rando = Math.floor((Math.random() * 1000000) % 3);

  switch (rando) {
    case 0: {
      return "#4688F4";
    }
    case 1: {
      return "#FFD04B";
    }
    default: {
      return "#1FA463";
    }
  }
};

export default changeColor;
