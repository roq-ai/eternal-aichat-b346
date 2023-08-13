interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Administrator', 'Team Member'],
  tenantName: 'Organization',
  applicationName: 'Eternal AIChat',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
