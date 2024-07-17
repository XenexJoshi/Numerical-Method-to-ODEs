function next_step(f, t_val, y_val, h) {
  let df = f({ t: t_val, y: y_val });

  let t_next = t_val + h;
  let y_next = y_val + (h * df);

  return [t_next, y_next];
}

function Euler(f, t0, y0, dest, step) {
  const h = parseFloat(step);

  let t_temp = parseFloat(t0);
  let y_temp = parseFloat(y0);
  let t_tab = [t_temp];
  let y_tab = [t_temp];

  for (let i = parseFloat(t0); i <= dest; i += h) {
    let curr = next_step(f, t_temp, y_temp, h);
    t_temp = curr[0];
    y_temp = curr[1];

    t_tab.push(t_temp);
    y_tab.push(y_temp);
  } return [t_tab, y_tab];
}

export default Euler;