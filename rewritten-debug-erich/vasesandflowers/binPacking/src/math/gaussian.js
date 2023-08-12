
const pi2 = Math.PI * 2

const std = function (mu = 0, sigma = 1) {
  var u1 = fxrand()
  var u2 = fxrand()
  var rand_std_normal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(pi2 * u2)
  return mu + sigma * rand_std_normal
}

const stdSeed = function(rnd, mu = 0, sigma = 1) { 
  var u1 = rnd.randFloat()
  var u2 = rnd.randFloat()
  var rand_std_normal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(pi2 * u2)
  return mu + sigma * rand_std_normal
}

export {
  std,
  stdSeed
}
