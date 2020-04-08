const GetDate = () => {
  const h = new Date().getHours();
  const m = new Date().getMonth();
  const res = {
    season: '',
    part: '',
  };

  if (h < 12 && h > 4) {
    res.part = 'morning';
  } else if (h > 12 && h < 19) {
    res.part = 'afternoon';
  } else if (h > 19 && h < 23) {
    res.part = 'evening';
  } else {
    res.part = 'night';
  }

  if (m >= 1 && m < 3) {
    res.season = 'winter';
  } else if (m >= 3 && m < 5) {
    res.season = 'spring';
  } else if (m >= 5 && m < 9) {
    res.season = 'summer';
  } else {
    res.season = 'autumn';
  }

  return res;
};

export default GetDate;
