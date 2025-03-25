export const generateReportFilename = (
  reportCode: string,
  startDate?: string,
  endDate?: string
) => {
  if (!startDate && !endDate) {
    return `report-${reportCode}-all`;
  }
  if (!startDate) {
    return `report-${reportCode}-until-${endDate}`;
  }
  if (!endDate) {
    return `report-${reportCode}-from-${startDate}`;
  }
  return `report-${reportCode}-${startDate}-to-${endDate}`;
};
