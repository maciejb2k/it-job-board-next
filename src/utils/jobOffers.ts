export const seniorityLevelToText = (seniorityLevel: number) => {
  switch (seniorityLevel) {
    case 1:
      return 'Junior';
    case 2:
      return 'Middle';
    case 3:
      return 'Senior';
    case 4:
      return 'Principal';
    default:
      return 'Unknown';
  }
};
