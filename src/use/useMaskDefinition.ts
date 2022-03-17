interface calculateNet {
  ipAddresses: Array<string>,
  mask: string,
}

export const calculateMask = (
  networkClass: number,
  subnetsCount: number,
  computersCount: number,
) => {

  console.log(networkClass, subnetsCount, computersCount);
  const powTwo = Math.round(Math.log(computersCount - 2) / Math.log(2));
  console.log(powTwo);

  let mask = Number.parseInt(`${(255).toString(2)}${(255).toString(2)}${(255).toString(2)}${(255).toString(2)}`, 10);
  // eslint-disable-next-line no-bitwise
  mask = mask << powTwo;

  console.log(mask);

  if (networkClass === 0) {

  }

};
