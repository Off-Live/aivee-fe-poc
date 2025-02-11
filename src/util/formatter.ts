// utils/formatters.ts
export const formatDefaultEventSummary = (
  summary: string,
  userName: string,
  hostName: string,
) => {
  return `${summary} : ${userName?.split(' ')[0]} x ${hostName.split(' ')[0]}`;
};
