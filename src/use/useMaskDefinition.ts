export interface CalculateNetType {
  ipAddresses: Array<string>,
  mask: string,
  status: boolean,
}

const calculateMask = (nearestCeilPowTwo: number): string => {
  const fullMask = `${(255).toString(2)}.${(255).toString(2)}.${(255).toString(2)}.${(255).toString(2)}`.split('');
  for (let i = 0; i < nearestCeilPowTwo; i += 1) {
    const firstOneIndex = fullMask.indexOf('1');
    fullMask[firstOneIndex] = '0';
  }

  const transformedMask = fullMask.reverse().join('').split('.');
  let calculatedMaskDec = '';

  transformedMask.forEach((item, index) => {
    if (index !== transformedMask.length - 1) {
      calculatedMaskDec += `${Number.parseInt(item, 2)}.`;
    } else {
      calculatedMaskDec += Number.parseInt(item, 2);
    }
  });

  return calculatedMaskDec;
};

const sep = (
  xs: string | Array<number>,
  s: number,
): (string | number | (string | number)[])[] => (xs.length
  ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : []);

const splitToSubnets = (hostsCountCeil: number, networkClass: number): string[] => {
  const countOctets = 3 - networkClass;
  const availableIpAddresses: string[] = [];

  const maxNetsArray = new Array(countOctets).fill(0);
  let maxNetsBinary = '';
  maxNetsArray.forEach(() => {
    maxNetsBinary += '11111111';
  });
  const maxNetsDec = Number.parseInt(maxNetsBinary, 2);

  let currentIp = 0;
  while (currentIp < maxNetsDec) {
    const currentIpBinaryArray: string[] = sep(currentIp.toString(2).padStart(8 * countOctets, '0'), 8) as Array<string>;

    let currentIpDec = '';
    currentIpBinaryArray.forEach((item, index) => {
      if (index !== currentIpBinaryArray.length - 1) {
        currentIpDec += `${Number.parseInt(item, 2)}.`;
      } else {
        currentIpDec += Number.parseInt(item, 2);
      }
    });
    availableIpAddresses.push(currentIpDec);
    currentIp += hostsCountCeil;
  }

  return availableIpAddresses;
};

export const calculateNet = (
  networkClass: number,
  subnetsCount: number,
  hostsCount: number,
): CalculateNetType => {
  const net: CalculateNetType = {
    ipAddresses: [],
    mask: '',
    status: true,
  };

  const nearestCeilPowTwo = Math.ceil(Math.log(hostsCount + 2) / Math.log(2));

  let currentNumberIp = '120';
  let possibleHostInPowTwo = 23;

  if (networkClass === 1) {
    currentNumberIp = '143.132';
    possibleHostInPowTwo = 15;
  }

  if (networkClass === 2) {
    currentNumberIp = '143.120.1';
    possibleHostInPowTwo = 7;
  }

  const hostsCountCeil = 2 ** nearestCeilPowTwo;
  const possibleSubnetsInPowTwo = possibleHostInPowTwo - nearestCeilPowTwo + 1;
  const possibleSubnets = 2 ** possibleSubnetsInPowTwo;

  if (subnetsCount <= possibleSubnets && nearestCeilPowTwo <= possibleHostInPowTwo) {
    net.mask = calculateMask(nearestCeilPowTwo);
    net.ipAddresses = splitToSubnets(hostsCountCeil, networkClass)
      .slice(0, subnetsCount).map(ipAddress => `${currentNumberIp}.${ipAddress}`);
    return net;
  }

  net.status = false;
  return net;
};
