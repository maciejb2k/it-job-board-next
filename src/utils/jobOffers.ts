export const seniorityLevelToText = (seniorityLevel: number) => {
  switch (seniorityLevel) {
    case 1:
      return 'Junior';
    case 2:
      return 'Mid';
    case 3:
      return 'Senior';
    case 4:
      return 'Principal';
    default:
      return 'Unknown';
  }
};

export const remoteToText = (remote: number) => {
  switch (remote) {
    case 0:
      return 'Remote';
    case 1:
    case 2:
    case 3:
    case 4:
      return 'Hybrid';
    case 5:
      return 'Onsite';
    default:
      return 'Unknown';
  }
};
